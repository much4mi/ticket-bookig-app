import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import usersRoutes from './routes/Users';
import authRoutes from './routes/Auth';
import path from 'path';

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

app.listen(7000, () => {
    console.log(`Server is running on localhost:7000`);
});
