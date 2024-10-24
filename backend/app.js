import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
dotenv.config();
const uri= process.env.MONGO_URL;


const port = process.env.PORT || 3030 ;
app.use(cors({
    origin: 'https://instacall.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));


app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

main().then(()=>{
    console.log("connected to db!");
}).catch((err)=>{
    throw err;
})

async function main(){
    await mongoose.connect(uri);
}


server.listen(port, ()=>{
    console.log(`server is listening to port ${port}`);
})