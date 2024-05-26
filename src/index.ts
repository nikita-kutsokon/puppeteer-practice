import dotenv from 'dotenv';
import express, { Express } from 'express';

dotenv.config();

import PublicAPI from './api';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/api', PublicAPI);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});