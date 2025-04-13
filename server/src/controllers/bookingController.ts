import { Request, Response } from 'express';
import { queryDatabase } from '../config/db.js';
import { getSessionUserId } from '../middleware/sessionManger.js';

async function queryAllReservations() {
  const sql = 'SELECT * FROM "Reservation"';
  return await queryDatabase(sql);
}

async function queryReservations(startDate: string, endDate: string) {
  const sql = 'SELECT * FROM "Reservation" WHERE start_datetime >= $1 AND start_datetime <= $2';
  return await queryDatabase(sql, [startDate, endDate]);
}

async function queryBookedReservations(startDate: string, endDate: string) {
  const sql = 'SELECT * FROM "Reservation" WHERE start_datetime < $2 AND end_datetime > $1';
  return await queryDatabase(sql, [startDate, endDate]);
}

async function insertReservation(startDate: string, endDate: string, typeId: string, organizerId: string, venueId: string) {
  const sql = 'INSERT INTO "Reservation" (start_datetime, end_datetime, type_id, organizer_id, venue_id) VALUES ($1, $2, $3, $4, $5)';
  return await queryDatabase(sql, [startDate, endDate, typeId, organizerId, venueId]);
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
    res.status(200).json({ reservations });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({
      error: 'Internal server error while retrieving reservations',
    });
  }
}
async function createReservation(req: Request, res: Response) {
  const { startDate, endDate, typeId, venueId } = req.body;

  if (!startDate || !endDate || !typeId || !venueId) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    res.status(400).json({ message: 'Invalid date format' });
    return;
  }

  if (start >= end) {
    res.status(400).json({ message: 'Start date must be before end date' });
    return;
  }

  try {
    const isReserved = (await queryBookedReservations(startDate, endDate)).length > 0;

    if (isReserved) {
      res.status(409).json({ mesage: 'Reservation conflict' })
      return;
    } else {
      await insertReservation(startDate, endDate, typeId, getSessionUserId(req), venueId);
      res.status(201).json({ message: 'Reservation created successfully!' });
    }
  } catch (error) {
    console.error('Failed to create reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export {getReservations, createReservation}