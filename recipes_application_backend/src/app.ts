import express from 'express';
import routes from './routes.ts';
import cors from 'cors';
//import Logger from './middleware/Logger';

const app = express();

app.use(express.json());
app.use(cors());
//app.use(Logger);
app.use('/', routes);

export default app;