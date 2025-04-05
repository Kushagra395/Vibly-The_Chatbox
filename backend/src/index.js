import express from 'express'
import authRouter from './routes/auth_rout.js' //modules type mai js likhna padta hai local file ke liye
import messageRouter from './routes/message_rout.js' 
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors' //we  are trying to send data from frontend to backend on diffrent port so using cors to link
import path from 'path'

import { connectDB } from './lib/db.js';
import { server,app,io } from './lib/socket.js';

//  dyanamic database setup by env
dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();


//socket.io now listen server par kaarnage and ap pehle hi define kar diya hai socket.js mai 

 
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

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    });
}

server.listen(PORT, () => { //dyanic port call
    console.log('Server is running on port',PORT);
     connectDB();     // connect db call jo lb ke db.js mai hai
})