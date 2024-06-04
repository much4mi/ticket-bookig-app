import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../Api-client";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilters from "../components/StarRatingFilters";
import StadiumTypesFilters from "../components/StadiumTypesFilters";
import FacilitiesFilters from "../components/FacilitiesFilters"; // Import the FacilitiesFilters component
import PriceFilters from "../components/PriceFilter";



const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedStadiumTypes, setSelectedStadiumTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice]= useState<string[]>([]);
    const [sortOptions, setSortOption]= useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn?.toString(),
        checkOut: search.checkOut?.toISOString(),
        adultCount: search.adultCount?.toString(),
        childCount: search.childCount?.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedStadiumTypes,
        facilities: selectedFacilities,
        price: selectedPrice,
        sortOptions,
    };

    const { data: stadiumData } = useQuery(["searchStadiums", searchParams], () =>
        apiClient.searchStadium(searchParams)
    );

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
        setSelectedStars((prevStars) =>
            event.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating)
        );
    };

    const handleStadiumTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const stadiumType = event.target.value;
        setSelectedStadiumTypes((prevStadiumTypes) => // Change variable name from prevStadiumType to prevStadiumTypes
            event.target.checked ? [...prevStadiumTypes, stadiumType] : prevStadiumTypes.filter((type) => type !== stadiumType)
        );
    };

    const handleFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value;
        setSelectedFacilities((prevFacilities) =>
            event.target.checked ? [...prevFacilities, facility] : prevFacilities.filter((facility) => facility !== facility)
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-r-slate-300 pb-5">
                        Filter by:
                    </h3>
                    <StarRatingFilters selectedStars={selectedStars} onChange={handleStarsChange} />
                    <StadiumTypesFilters selectedStadiumTypes={selectedStadiumTypes} onChange={handleStadiumTypeChange} />
                    <FacilitiesFilters selectedFacilities={selectedFacilities} onChange={handleFacilitiesChange} /> {/* Render the FacilitiesFilters component */}
                    <PriceFilters selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
                    

                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {stadiumData?.pagination.total} stadiums found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    <select value={sortOptions } onChange={(event)=>setSortOption(event.target.value)} className="p-2 border rounded-md">
                        <option value="">sort by</option>
                        <option value="starRating">star Rating</option>
                        <option value="pricePerGameAsc">price Per Game(low to high)</option>
                        <option value="pricePerGameDesc">price Per Game(high to low)</option>

                    </select>
                </div>
                {stadiumData?.data.map((stadium, index) => (
                    <SearchResultsCard key={index} stadium={stadium} />
                ))}
                <div>
                    <Pagination
                        page={stadiumData?.pagination.page || 1}
                        pages={stadiumData?.pagination.pages || 1}
                        onPagesChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;





 