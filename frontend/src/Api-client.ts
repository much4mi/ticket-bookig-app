import { StadiumSearchResponse, StadiumType } from "../../backend/src/shared/Types";
import { RegisterFormData } from "./pages/Register";
import { SigninFormData } from "./pages/Signin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||  "";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

};

export const validateToken= async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
       
        credentials:"include"
    })
    if (!response.ok) {
        throw new Error('Token Invalid');
    }
    
    return response.json();

};

export const signOut= async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials:"include",
        method:"POST",
    })
    if (!response.ok) {
        throw new Error('error during sign out');
    }
    

};



export const signin = async (formData: SigninFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials:"include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const body = await response.json();

    if (!response.ok) {
        throw new Error(body.message);
    }

    return body;
}

export const signout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    });
    if (!response.ok) {
        throw new Error('Failed to signout');
    }
};

export const addStadium = async (stadiumFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-stadiums`, {
        method: "POST",
        credentials: "include",
        body: stadiumFormData
    });
    
    if (!response.ok) {
        throw new Error('Failed to add stadium');
    }
    
    return response.json();
};

export const fetchMyStadiums = async (): Promise<StadiumType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-stadiums`,{
        credentials: "include",
    })
   
    if (!response.ok) {
        throw new Error('error fetching mystadiums');
    }
    return response.json();
};

export const fetchMyStadiumsById = async (stadiumId: string): Promise<StadiumType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-stadiums/${stadiumId}`,{
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error('error fetching mystadiums');
    }
    return response.json();
};

export const updateMyStadiumsById = async (stadiumFormdata: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-stadiums/${stadiumFormdata.get("stadiumId")}`, {
        body: stadiumFormdata, 
        credentials:"include",
        method: "PUT"
    });
    if (!response.ok) {
        throw new Error('Failed to updateStadium');
    }
    return response.json();
};

export type SearchParams = {
    destination?: string;
    checkIn?: Date;
    checkOut?: Date;
    adultCount?: number;
    childCount?: number;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOptions?: string;
};

export const searchStadium = async (params: SearchParams): Promise<StadiumSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", params.destination || '');
    queryParams.append("checkin", params.checkIn ? params.checkIn.toString() : '');
    queryParams.append("checkout", params.checkOut ? params.checkOut.toString() : '');
    queryParams.append("page", params.page ||  '');
    queryParams.append("maxPrice", params.maxPrice ||  '');
    queryParams.append("sortOptions", params.sortOptions ||  '');

    // Iterate over facilities, types, and stars arrays and append them to the query params
    params.facilities?.forEach((facility) => queryParams.append("facilities", facility));
    params.types?.forEach((type) => queryParams.append("type", type));
    params.stars?.forEach((star) => queryParams.append("stars", star));

    const response = await fetch(`${API_BASE_URL}/api/stadium/search?${queryParams}`);

    if (!response.ok) {
        throw new Error('Failed to search for stadiums');
    }
    return response.json();
};

export const fetchStadiumById = async (stadiumId: string):Promise<StadiumType> => {
    const response = await fetch(`${API_BASE_URL}/api/stadium/${stadiumId}`, 
        
);
    if (!response.ok) {
        throw new Error('error fetching stadium');
    }
    return response.json();
};
