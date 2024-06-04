import { StadiumType } from "../config/Stadium-option-config";

type Props = {
    selectedStadiumTypes:string[];
    onChange: (event:React.ChangeEvent<HTMLInputElement>)=>void;
};


const StadiumTypesFilters= ({selectedStadiumTypes,onChange}:Props)=> {
    return(
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">STADIUM TYPES</h4>
            {StadiumType.map((stadiumType)=>(
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" value={stadiumType} checked={selectedStadiumTypes.includes(stadiumType)}
                    onChange={onChange}/>
                    <span>{stadiumType}</span>
                </label>

            ))}
        </div>
    )

}

export default StadiumTypesFilters;