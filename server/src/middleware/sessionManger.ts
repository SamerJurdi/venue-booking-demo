// @ts-nocheck
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

function generateSessionId(length = 32) {
  return crypto.randomBytes(length).toString('hex').slice(0, length * 2); 
}

function activateSession(req: Request, userId: string) {
  req.session.customId = generateSessionId();
  req.session.userId = userId;
}

function ensureSessionActive(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.customId) {
    next();
  } else {
    res.status(401).json({ message: 'Session expired or not active. Please log in again.' });
  }
}

function getSessionUserId(req: Request) {
  return req.session.userId;
}

export {activateSession, ensureSessionActive, getSessionUserId}