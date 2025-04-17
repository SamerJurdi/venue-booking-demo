import express, { Request, Response } from 'express';
import session from 'express-session';
import { authRoute, reservationRoute } from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
  // @ts-expect-error
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // TODO: Set to true when using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}));

// @ts-expect-error
app.get("/", (req: Request, res: Response) => res.send("Express on Vercel"));
app.use('/auth', authRoute)
app.use('/reservations', reservationRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;