type Props = {
    selectedStars:string[];
    onChange: (event:React.ChangeEvent<HTMLInputElement>)=>void;
};


const StarRatingFilters= ({selectedStars,onChange}:Props)=> {
    return(
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">FIFA RATING</h4>
            {["5" ,"4" ,"3","2","1"].map((stars)=>(
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" value={stars} checked={selectedStars.includes(stars)}
                    onChange={onChange}/>
                    <span>{stars}stars</span>
                </label>

            ))}
        </div>
    )

}

export default StarRatingFilters;