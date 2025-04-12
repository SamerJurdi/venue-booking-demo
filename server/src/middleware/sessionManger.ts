// @ts-nocheck
import { Request, Response, NextFunction } from 'express';

function generateSessionId(length = 32) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

function activateSession(req: Request, userId: string) {
    req.session.Id = generateSessionId();
    req.session.userId = userId;
}

function ensureSessionActive(req: Request, res: Response, next: NextFunction) {
  if (req.session?.Id) {
    return next();
  } else {
    return res.status(401).json({ message: 'Session expired or not active. Please log in again.' });
  }
}

export {activateSession, ensureSessionActive}