import cloudinary from 'cloudinary';
import express, { Request, Response } from "express";
import multer from "multer";
import Stadium from '../models/Stadium';
import { StadiumType } from '../shared/Types';
import { body } from 'express-validator';
import verifyToken from '../middleware/Auth';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit for file size
});


//api/my-stadiums

router.post("/",verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("capacity").notEmpty().isNumeric().withMessage("capacity is required and must be a number"),
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
        const imageUrls = await uploadImageUrls(imageFiles);
        newStadium.imageUrls = imageUrls;
        newStadium.lastUpdated = new Date();
        newStadium.userId=req.userId;

        

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

router.get("/" ,verifyToken, async(req:Request,res:Response)=>{
    
    
    try {
        const stadiums = await Stadium.find();
    res.json(stadiums);
    } catch (error) {
        res.status(500).json({message:"error fetching stadiums"})
        
    }
});

router.get("/:id" ,verifyToken, async(req:Request,res:Response)=>{
    const id = req.params.id.toString();
    try {
        const stadium = await Stadium.findById({_id:id,userId:req.userId});

        res.json(stadium);
        
    } catch (error) {
        res.status(500).json({message:"error fetching stadiums"})
    }
});

router.put("/:stadiumId", verifyToken,upload.array("imageFiles"),async(req:Request,res:Response)=>{

    try {
        const updatedStadium:StadiumType=req.body
        updatedStadium.lastUpdated= new  Date();

        const stadium = await Stadium.findByIdAndUpdate({
            _id : req.params.stadiumId,
            userId:req.userId
        },updatedStadium,{new:true} ) ;
        
        if (!stadium){
            return res.status(404)
                .json({message:'Cannot find the stadium'});
                };
                const files = req.files as Array<Express.Multer.File>;
                const updateImageUrls = await uploadImageUrls(files);

                stadium.imageUrls=[...updateImageUrls,...(updatedStadium.imageUrls || [])];
                await stadium.save();
                res.status(201).json(stadium);
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
})

    


async function uploadImageUrls(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        const dataUrl = "data:" + image.mimetype + ";base64," + b64;
        const result = await cloudinary.v2.uploader.upload(dataUrl);
        return result.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;


