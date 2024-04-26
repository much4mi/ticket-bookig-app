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
