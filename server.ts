import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000/',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Moikka moi!');
});

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
