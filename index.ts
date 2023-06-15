import express from 'express';
import { connect } from 'mongoose';
import 'dotenv/config';
import appConfig from './appConfig';

const app = express();

const DB_CONNECTION = process.env.DB_CONNECTION || '';

appConfig(app);

connect(DB_CONNECTION)
    .then(() => console.log('Database loaded'))
    .catch(err => console.log(err));
//

app.listen(8080, () => console.log('Server is running'));