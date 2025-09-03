import express from 'express';
import dotenv from 'dotenv';
import routes from './routes.ts';
import cors from 'cors';
//import Logger from './middleware/Logger';
//import ErrorHandler from './middleware/ErrorHandler';


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
//app.use(Logger);
app.use('/', routes);
//app.use(ErrorHandler);


export default app;