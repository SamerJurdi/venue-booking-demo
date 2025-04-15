import { Request, Response } from 'express';
import { queryDatabase } from '../config/db.js';
import { getSessionUser } from '../middleware/sessionManger.js';

async function queryAllReservations() {
  const sql = 'SELECT * FROM "ReservationAndOrganizer"';
  return await queryDatabase(sql);
}

async function queryReservations(startDate: string, endDate: string) {
  const sql = 'SELECT * FROM "ReservationAndOrganizer" WHERE start_datetime >= $1 AND start_datetime <= $2';
  return await queryDatabase(sql, [startDate, endDate]);
}

async function queryBookedReservations(startDate: string, endDate: string) {
  const sql = 'SELECT * FROM "Reservation" WHERE start_datetime < $2 AND end_datetime > $1';
  return await queryDatabase(sql, [startDate, endDate]);
}

async function deleteUserReservation(userId: string, reservationId: string) {
  const sql = 'DELETE FROM "Reservation" WHERE organizer_id = $1 AND id =  $2 RETURNING id'
  return await queryDatabase(sql, [userId, reservationId])
}

async function insertReservation(
  startDate: string,
  endDate: string,
  title: string,
  description: string,
  typeId: string,
  organizerId: string,
  venueId: string
) {
  const sql = 'INSERT INTO "Reservation" (start_datetime, end_datetime, title, description, type_id, organizer_id, venue_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
  return await queryDatabase(sql, [startDate, endDate, title, description, typeId, organizerId, venueId]);
}

async function getReservations(req: Request, res: Response) {
  const { startDate, endDate } = req.query as {
    startDate?: string;
    endDate?: string;
  };

  if (!startDate || !endDate) {
    try {
      const reservations = await queryAllReservations();
      res.status(200).json({ reservations });
    } catch (error) {
      console.error('Error fetching reservations:', error);
      res.status(500).json({
        message: 'Internal server error while retrieving reservations',
      });
    }
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    res.status(400).json({
      message: 'Invalid date format. Expected format: YYYY-MM-DD',
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
      message: 'Internal server error while retrieving reservations',
    });
  }
}
async function createReservation(req: Request, res: Response) {
  const { startDate, endDate, title, description, typeId, venueId } = req.body;

  if (!startDate || !endDate || !title || !typeId || !venueId) {
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
  let now = new Date();
  const offsetInMinutes = now.getTimezoneOffset();
  const offsetInMs = offsetInMinutes * 60 * 1000;
  now = new Date(now.getTime() - offsetInMs);

  if (start < now) {
    res.status(400).json({ message: 'Start date cannot be in the past' });
    return;
  }

  try {
    const isReserved = (await queryBookedReservations(startDate, endDate)).length > 0;

    if (isReserved) {
      res.status(409).json({ message: 'Reservation conflict' });
      return;
    } else {
      const reservation = await insertReservation(startDate, endDate, title, description, typeId, getSessionUser(req).id, venueId);
      res.status(201).json({ message: 'Reservation created successfully!',  reservationId: reservation[0].id});
    }
  } catch (error) {
    console.error('Failed to create reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteReservation(req: Request, res: Response) {
  const reservationId = req.params.reservationId;
  try {
    const deleted = await deleteUserReservation(getSessionUser(req).id, reservationId);
    if (deleted.length === 1) {
      res.status(200).json({ message: 'Your reservation has been deleted' });
    } else res.status(404).json({ message: 'Reservation not found' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export {getReservations, createReservation, deleteReservation}