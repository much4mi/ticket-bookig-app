import express, { Request, Response } from "express";
import Stadium from '../models/Stadium';
import { StadiumSearchResponse } from "../shared/Types";
import { param, validationResult } from "express-validator";


const router = express.Router();



// /api/stadium/search
router.get("/search", async (req: Request, res: Response) => {
    try {
        const query = constructSearchQuery(req.query);
        let sortOptions ={};
        switch(req.query.sortOptions){
            case "starRating":
                sortOptions={starRating: -1}
                break;
            case "pricePerGameAsc":
                sortOptions={pricePerGame: 1};
                break; 
            case "pricePerGameDesc":
                sortOptions={pricePerGame: -1}; 
                break;
        }
        const pageSize = 5; 
        const pageNumber = parseInt(req.query.page?.toString() || '1', 10); 
        const skip = (pageNumber - 1) * pageSize;

        const stadiums = await Stadium.find(query).sort(sortOptions).skip(skip).limit(pageSize);
        const total = await Stadium.countDocuments(query);

        const totalPages = Math.ceil(total / pageSize);

        const response: StadiumSearchResponse = {
            data: stadiums,
            pagination: {
                total,
                page: pageNumber,
                pages: totalPages
            }
        };

        res.json(response);
    } catch (error) {
        console.error("Error in search stadium:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.get("/:id",[
    param("id").notEmpty().withMessage("stadium id is required")
], async(req: Request, res: Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const id = req.params.id.toString();
    try {
        let stadium = await Stadium.findById(id);
        res.json(stadium); 
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "error fetching stadium" });
    }
});







function constructSearchQuery(query: any) {
    const constructedQuery: any = {};

    if (query.destination) {
        constructedQuery.$or = [
            { city: new RegExp(query.destination, "i") }, 
            { country: new RegExp(query.destination, "i") } 
        ];
    }

    if (query.adultCount) {
        constructedQuery.adultCount = { $gte: parseInt(query.adultCount) }; 
    }

    if (query.childCount) {
        constructedQuery.childCount = { $gte: parseInt(query.childCount) }; 
    }

    if (query.facilities) {
        constructedQuery.facilities = { $all: Array.isArray(query.facilities) ? query.facilities : [query.facilities] };
    }

    if (query.type) {
        constructedQuery.type = { $all: Array.isArray(query.type) ? query.type : [query.type] }; 
    }

    if (query.stars) {
        constructedQuery.starRating = { $in: Array.isArray(query.stars) ? query.stars.map((star: string) => parseInt(star)) : [parseInt(query.stars)] }; // Match stadiums with star ratings present in the provided array of star ratings
    }

    if (query.maxPrice) {
        constructedQuery.pricePerGame = { $lte: parseInt(query.maxPrice) }; 
    }

    return constructedQuery;
}

export default router;
