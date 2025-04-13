import { Request, Response } from 'express';
import { queryDatabase } from '../config/db.js';

async function queryAllReservations() {
  const sql = 'SELECT * FROM "Reservation"';
  return await queryDatabase(sql);
}

async function queryReservations(startDate: string, endDate: string) {
  const sql = 'SELECT * FROM "Reservation" WHERE start_datetime >= $1 AND start_datetime < $2';
  return await queryDatabase(sql, [startDate, endDate]);
}

async function getReservations(req: Request, res: Response) {
  const { startDate, endDate } = req.query as {
    startDate?: string;
    endDate?: string;
  };

  if (!startDate || !endDate) {
    await queryAllReservations();
    try {
      const reservations = await queryAllReservations();
      console.log({ reservations });
  
      res.status(200).json({ reservations });
    } catch (error) {
      console.error('Error fetching reservations:', error);
      res.status(500).json({
        error: 'Internal server error while retrieving reservations',
      });
    }
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    res.status(400).json({
      error: 'Invalid date format. Expected format: YYYY-MM-DD',
    });
    return;
  }

  try {
    const reservations = await queryReservations(
      start.toISOString().split('T')[0] + ' 00:00:00',
      end.toISOString().split('T')[0] + ' 00:00:00'
    );
    console.log({ reservations });

    res.status(200).json({ reservations });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({
      error: 'Internal server error while retrieving reservations',
    });
  }
}
export {getReservations}