import express, { Request, Response } from 'express';
import session from 'express-session';
import { authRoute } from './routes/index.js';

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

app.use('/api/auth', authRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
