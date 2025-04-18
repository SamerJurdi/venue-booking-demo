import express, { Request, Response } from 'express';
import session from 'express-session';
import connectMemoryStore from 'memorystore';
import { authRoute, reservationRoute } from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

const MemoryStore = connectMemoryStore(session);

app.use(express.json());
app.use(session({
  // @ts-expect-error
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  },
  store: new MemoryStore({
    checkPeriod: 1000 * 60 * 60
  }),
}));

// @ts-expect-error
app.get("/", (req: Request, res: Response) => res.send("Nothing to show here!"));
// @ts-expect-error
app.get("/api/", (req: Request, res: Response) => res.send("Nothing to show here!"));
app.use('/api/auth', authRoute)
app.use('/api/reservations', reservationRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;