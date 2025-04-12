// @ts-nocheck
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

function generateSessionId(length = 32) {
  return crypto.randomBytes(length).toString('hex').slice(0, length * 2); 
}

function activateSession(req: Request, userId: string) {
  console.log({session: req.session})
  req.session.cusotmId = generateSessionId();
  req.session.userId = userId;
}

function ensureSessionActive(req: Request, res: Response, next: NextFunction) {
  if (req.session?.cusotmId) {
    return next();
  } else {
    return res.status(401).json({ message: 'Session expired or not active. Please log in again.' });
  }
}

export {activateSession, ensureSessionActive}