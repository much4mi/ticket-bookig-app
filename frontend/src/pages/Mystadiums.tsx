import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../Api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiMoney, BiStar } from "react-icons/bi";
import { TbBuildingStadium } from "react-icons/tb";

const Mystadiums = () => {
    const { data: stadiumData } = useQuery("fetchMystadiums", apiClient.fetchMyStadiums, {
        onError: () => {
            // Handle error if needed
        }
    });

    console.log("Stadium Data:", stadiumData); 

    if (!stadiumData) {
        return <span>no stadium data found</span>
    }

    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My stadium</h1>
                <Link to="/add-stadium" className="flex bg-blue-600 text-black text-xl font-bold p-2 hover:bg-blue-500">Add stadium</Link>
            </span>
            <div className="grid grid-cols-1 gap-5">
                {stadiumData.map((stadium) => (
                    <div className="flex  justify-between border border-slate-300 rounded-lg p-8 gap-10">
                        <h2 className="text-2xl font-bold">{stadium.name}</h2>
                        <div className="whitespace-pre-line">{stadium.description}</div>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="border border-slate-300 rounded-sm p-3 items-center">
                                <BsMap className="mr-1"/>
                                {stadium.city},{stadium.country}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 items-center">
                                <BsBuilding className="mr-1"/>
                                {stadium.type}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 items-center">
                                <BiMoney className="mr-1"/>
                                ${stadium.pricePerGame} per game
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 items-center">
                                <TbBuildingStadium className="mr-1"/>
                                {stadium.adultCount} adults, {stadium.childCount} children
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 items-center">
                                <BiStar className="mr-1"/>
                                {stadium.starRating}
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link to={`/edit-Stadium/${stadium._id}`} className="flex bg-blue-600 text-black text-xl font-bold p-2 hover:bg-blue-500">View Detail</Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mystadiums;


