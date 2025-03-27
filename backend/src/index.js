import express from 'express'
import authRouter from './routes/auth_rout.js' //modules type mai js likhna padta hai local file ke liye
import messageRouter from './routes/message_rout.js' 
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors' //we  are trying to send data from frontend to backend on diffrent port so using cors to link

import { connectDB } from './lib/db.js';

//  dyanamic database setup by env
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use("/api/auth", authRouter); // importing all routes from auth_rout
app.use("/api/message", messageRouter); //for message 

app.listen(PORT, () => { //dyanic port call
    console.log('Server is running on port',PORT);
     connectDB();     // connect db call jo lb ke db.js mai hai
})