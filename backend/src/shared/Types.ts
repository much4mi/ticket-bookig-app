export type StadiumType ={
    _id: number;
    userId:string;
    name: string;
    city: string;
    country: string;
    capacity:number;
    description: string; 
    type: string;
    adultCount: number,
    childCount: number;
    facilities: string[];
    pricePerGame: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
    
    
};

export  type StadiumSearchResponse ={
    data: StadiumType[] ;
    pagination:{
        total:number;
        page:number;
        pages:number;
    }
}
