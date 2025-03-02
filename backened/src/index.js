import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js" 
import { connectDB } from './lib/db.js';
import cors from "cors"

const app = express();
dotenv.config();
const PORT= process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.get('/',(req,res)=>{
    res.send('Hello abhai g');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
    connectDB();
})
