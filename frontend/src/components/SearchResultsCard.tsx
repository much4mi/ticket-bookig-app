import { AiFillStar } from "react-icons/ai";
import { StadiumType } from "../../../backend/src/shared/Types";
import { Link } from "react-router-dom";

type Props = {
    stadium: StadiumType;
};

const SearchResultsCard = ({ stadium }: Props) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
            <div className="w-full h-[300px]">
                <img src={stadium.imageUrls[0]} className="w-full h-full object-cover object-center" alt="Stadium" />
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <div className="flex items-center mb-2">
                        <span className="flex">
                            {Array.from({ length: stadium.starRating }).map((_, index) => (
                                <AiFillStar key={index} className="fill-yellow-700" />
                            ))}
                        </span>
                        <span className="ml-1 text-sm">{stadium.type}</span>
                    </div>
                    <Link to={`/detail/${stadium._id}`} className="text-2xl font-bold cursor-pointer mb-2">
                        {stadium.name}
                    </Link>
                    <div className="mb-4">
                        <span className="font-semibold">Capacity: </span>{stadium.capacity}
                    </div>
                    <div className="line-clamp-4 mb-4">
                        {stadium.description}
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex gap-1 items-center">
                        {stadium.facilities.slice(0, 3).map((facility, index) => (
                            <span key={index} className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                                {facility}
                            </span>
                        ))}
                        {stadium.facilities.length > 3 && (
                            <span className="text-sm">+{stadium.facilities.length - 3} more</span>
                        )}
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="font-bold mb-1">${stadium.pricePerGame} per game</span>
                        <Link to={`/detail/${stadium._id}`} className="bg-blue-500 text-black p-2 font-bold text-xl hover:bg-blue-600">
                            View more
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsCard;



