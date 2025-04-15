// @ts-nocheck
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

function generateSessionId(length = 32) {
  return crypto.randomBytes(length).toString('hex').slice(0, length * 2); 
}

function activateSession(req: Request, user: {id: string, title: string, firstName: string, lastName: string}) {
  req.session.customId = generateSessionId();
  req.session.user = user;

  req.session.save(function (err) {
    if (err) return next(err)
  })
}

function deactivateSession(req: Request) {
  req.session.customId = null;
  req.session.user = null;

  req.session.save(function (err) {
    if (err) return next(err)
  })
}

function ensureSessionActive(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.customId) {
    next();
  } else {
    res.status(401).json({ message: 'Session expired or not active. Please log in again.' });
  }
}

function getSessionUser(req: Request) {
  return req.session.user;
}

export {activateSession, deactivateSession, ensureSessionActive, getSessionUser}