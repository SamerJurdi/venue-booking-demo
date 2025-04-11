import { Request, Response } from 'express';
import { queryDatabase } from '../config/db.js';


async function getUsers() {
  const sql = 'SELECT * FROM "UsersAndRoles"';
  const users = await queryDatabase(sql);
  return users;
}

export default (req: Request, res: Response) => {
  getUsers().then(response => res.json({ response })).catch(err => console.error(err));
};