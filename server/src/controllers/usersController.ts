import { Request, Response } from 'express';
import argon2 from 'argon2';
import { queryDatabase } from '../config/db.js';
import { activateSession, deactivateSession, getSessionUser } from '../middleware/sessionManger.js';

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
      res.status(401).json({message: 'Invalid credentials'});
      return;
    }

    const salt = user.email;
    const combinedPassword = password + salt;
    const isMatch = await argon2.verify(user.password_hash, combinedPassword);

    if (!isMatch) {
      res.status(401).json({message: 'Invalid credentials'});
      return;
    }

    activateSession(req, user.id)
    res.status(200).json({message: 'Login successful, session started.'});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({message: 'Server error'});
  }
}

async function logoutUser(req: Request, res: Response) {
  deactivateSession(req)
  res.status(204).json({message: 'Logout successful, session closed.'});
}

async function getUser(req: Request, res: Response) {
  try {
    const user = getSessionUser(req);
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error getting user ID:', error);
    res.status(500).json({message: 'Failed to get user ID'});
  }
}
export { loginUser, logoutUser, getUser };