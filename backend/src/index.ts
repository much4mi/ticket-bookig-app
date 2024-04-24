import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import usersRoutes from './routes/Users';
import authRoutes from './routes/Auth';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import myStadiumRoutes from  './routes/My-stadiums';


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
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
};

mongoose.connect(MONGODB_CONNECTION_STRING, mongooseOptions).then(()=>console.log("conneted to database",process.env.MONGODB_CONNECTION_STRING));

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname ,"../../frontend/dist")))
app.use("/api/auth", authRoutes); // Use authRoutes for /api/auth route
app.use("/api/users", usersRoutes);
app.use("/api/my-stadiums", myStadiumRoutes);

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

 


app.listen(7000, () => {
    console.log(`Server is running on localhost:7000`);
});
