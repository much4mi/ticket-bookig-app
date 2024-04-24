import mongoose from "mongoose";

export type StadiumType ={
    _id: number;
    name: string;
    city: string;
    country: string;
    description: string; 
    type: string;
    adultCount: number,
    childCount: number;
    facilities: string[];
    pricePerGame: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
    
    
}

const stadiumSchema = new mongoose.Schema<StadiumType>({

    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    pricePerGame: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: [{ type: String, required: true}],
    lastUpdated: {type:Date,required:true},
    
});

const Stadium = mongoose.model<StadiumType>("Stadium", stadiumSchema);

export default Stadium;





