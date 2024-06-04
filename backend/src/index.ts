import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import usersRoutes from './routes/Users';
import authRoutes from './routes/Auth';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import myStadiumRoutes from  './routes/My-stadiums';
import  stadiumRoutes from './routes/Stadiums';
import cookieParser from "cookie-parser";



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING as string;

// Create mongoose options object separately
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, 
};

mongoose.connect(MONGODB_CONNECTION_STRING, mongooseOptions)

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin:process.env.FRONTEND_URL,
    credentials:true,
}));

app.use(express.static(path.join(__dirname ,"../../frontend/dist")))
app.use("/api/auth", authRoutes); // Use authRoutes for /api/auth route
app.use("/api/users", usersRoutes);
app.use("/api/my-stadiums", myStadiumRoutes);
app.use("/api/stadium",stadiumRoutes)

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

 


app.listen(7000, () => {
    console.log(`Server is running on localhost:7000`);
});
