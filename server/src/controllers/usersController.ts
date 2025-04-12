import { Request, Response } from 'express';
import argon2 from 'argon2';
import { queryDatabase } from '../config/db.js';
import { activateSession, getSessionUserId } from '../middleware/sessionManger.js';

async function getUserByUsername(username: string) {
  const sql = 'SELECT * FROM "User" WHERE username = $1';
  const users = await queryDatabase(sql, [username]);
  return users[0];
}

async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (!user) {
      res.status(401).send('Invalid credentials');
      return;
    }

    const salt = user.email;
    const combinedPassword = password + salt;
    const isMatch = await argon2.verify(user.password_hash, combinedPassword);

    if (!isMatch) {
      res.status(401).send('Invalid credentials');
      return;
    }

    activateSession(req, user.id)
    res.status(200).send('Login successful, session started.');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server error');
  }
}

async function getUser(req: Request, res: Response) {
  try {
    const userId = getSessionUserId(req);
    res.status(200).send({ userId });
  } catch (error) {
    console.error('Error getting user ID:', error);
    res.status(500).send('Failed to get user ID');
  }
}
export { loginUser, getUser };