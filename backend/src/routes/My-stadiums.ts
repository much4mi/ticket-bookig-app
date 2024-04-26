import cloudinary from 'cloudinary';
import express, { Request, Response } from "express";
import multer from "multer";
import Stadium from '../models/Stadium';
import { StadiumType } from '../shared/Types';
import { body } from 'express-validator';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit for file size
});

//api/my-stadiums

router.post("/", [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Stadium type is required"),
    body("pricePerGame").notEmpty().isNumeric().withMessage("pricePerGame is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    body("imageFiles").notEmpty().withMessage("Image files are required"),
], upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[] || [];
        const newStadium: StadiumType = req.body;

        // Upload the images to cloudinary and get their URLs
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString('base64');
            const dataUrl = "data:" + image.mimetype + ";base64," + b64;
            const result = await cloudinary.v2.uploader.upload(dataUrl);
            return result.url;
        });

        const imageUrls = await Promise.all(uploadPromises);
        newStadium.imageUrls = imageUrls;
        newStadium.lastUpdated = new Date();

        // Save new stadium in the database
        const stadium = new Stadium(newStadium);
        await stadium.save();

        // Return a 201 status
        res.status(201).send(stadium);

    } catch (error) {
        console.log("Error creating stadium:", error);
        res.status(500).json({ message: "Something went wrong!" })
    }
});

router.get("/" , async(req:Request,res:Response)=>{
    
    
    try {
        const stadiums = await Stadium.find();
    res.json(stadiums);
    } catch (error) {
        res.status(500).json({message:"error fetching stadiums"})
        
    }
})

export default router;

