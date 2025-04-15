import { Request, Response } from 'express';
import { queryDatabase } from '../config/db.js';

async function queryVenues() {
  const sql = 'SELECT id, name FROM "Venue"';
  return await queryDatabase(sql);
}

async function queryVenuReservations(venueId: string) {
  const sql = 'SELECT * FROM "ReservationAndOrganizer" WHERE venue_id = $1';
  return await queryDatabase(sql, [venueId]);
}

async function getVenues(req: Request, res: Response) {
  try {
    let venues = await queryVenues();
    venues = venues.map((venue: {id: string, name: string}) => <{key: string, value: string}>{key: venue.id, value: venue.name})
    res.status(200).json({venues})
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({
      message: 'Internal server error while retrieving venues',
    });
  }
}

async function getVenueReservations(req: Request, res: Response) {
  const venueId = req.params.venueId;
  try {
    const reservations = await queryVenuReservations(venueId);
    res.status(200).json({ reservations });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({
      message: 'Internal server error while retrieving reservations',
    });
  }
}

export {getVenues, getVenueReservations}