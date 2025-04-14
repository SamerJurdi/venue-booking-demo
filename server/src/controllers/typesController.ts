import { Request, Response } from 'express';
import { queryDatabase } from '../config/db.js';

async function queryReservationTypes() {
  const sql = 'SELECT * FROM "Type" WHERE parent_type_id = $1';
  return await queryDatabase(sql, ['reservationTypes']);
}

async function getReservationTypes(req: Request, res: Response) {
  try {
    const reservationTypes = await queryReservationTypes();
    res.status(200).json({reservationTypes})
  } catch (error) {
    console.error('Error fetching reservation types:', error);
    res.status(500).json({
      message: 'Internal server error while retrieving reservation types',
    });
  }
}

export {getReservationTypes}