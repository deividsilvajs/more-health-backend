import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes/routes';

const app = express();

const DB_CONNECTION = process.env.DB_CONNECTION || '';

app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/', routes);

mongoose.connect(DB_CONNECTION)
    .then(() => console.log('Database loaded'))
    .catch(err => console.log(err));
//

app.listen(8080, () => console.log('Server is running'));