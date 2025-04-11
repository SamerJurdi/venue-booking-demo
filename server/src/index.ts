import express, { Request, Response } from 'express';
import { usersRoute } from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', usersRoute)

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
