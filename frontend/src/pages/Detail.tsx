import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../Api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoform/GuestInfoForm";

const Detail = () => {
    const { stadiumId } = useParams();
    const { data: stadium } = useQuery("fetchStadiumById", () => apiClient.fetchStadiumById(stadiumId as string), {
        enabled: !!stadiumId,
    });

    if (!stadium) {
        return <></>;
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center mb-2">
                    <span className="flex">
                        {Array.from({ length: stadium.starRating }).map((_, index) => (
                            <AiFillStar key={index} className="fill-yellow-400" />
                        ))}
                    </span>
                </div>
                <h1 className="text-3xl font-bold">{stadium.name}</h1>
                <div className="mb-4">
                    <span className="font-semibold">Capacity: </span>{stadium.capacity}
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {stadium.imageUrls.map((image, index) => (
                    <div key={index} className="h-[300px]">
                        <img src={image} alt={stadium.name} className="rounded-md w-full h-full object-cover object-center" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                {stadium.facilities.map((facility, index) => (
                    <div key={index} className="border border-slate-300 rounded-sm p-3">{facility}</div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
                <div className="whitespace-pre-line">{stadium.description}</div>
                <div className="h-fit">
                    <GuestInfoForm stadiumId={stadium._id} pricePerGame={stadium.pricePerGame} />
                </div>
            </div>
        </div>
    );
};

export default Detail;

