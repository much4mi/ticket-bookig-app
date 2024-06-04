import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker"; 
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/Appcontext";
import { useLocation, useNavigate } from "react-router-dom";


type props ={
    stadiumId:string;
    pricePerGame:number;
}
type GuestInFoFormData={
    checkIn:Date;
    checkOut:Date;
    childCount:number;
    adultCount:number;

}

const GuestInfoForm = ({stadiumId,pricePerGame}:props)=>{
    const search  =  useSearchContext();
    const{isLoggedIn} = useAppContext();
   const navigate = useNavigate();
   const location = useLocation();

   const {watch, register, handleSubmit, setValue, formState:{errors}}= useForm<GuestInFoFormData>({
    defaultValues:{
     checkIn:search.checkIn,
     checkOut: search.checkOut,
     childCount :search.childCount,
     adultCount:search.adultCount
    }
   });

   const checkIn = watch("checkIn");
   const checkOut = watch("checkOut");

   const minDate = new Date();
   const maxDate = new Date();
   maxDate.setFullYear(maxDate.getFullYear() +5);

   const onSignInClick = (data:GuestInFoFormData)=>{
    search.SaveSearchValues("",data.checkIn,data.checkOut,data.adultCount,data.childCount);
    navigate("/signin",{ state: {from:location}})

   };

   const onSubmit = (data:GuestInFoFormData)=>{
    search.SaveSearchValues("",data.checkIn,data.checkOut,data.adultCount,data.childCount);
    navigate(`/stadium/${stadiumId}/booking`)

   }


   return(
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
        <h3 className="text-md font-bold">${pricePerGame}</h3>
        <form onSubmit={isLoggedIn? handleSubmit(onSubmit):handleSubmit(onSignInClick)}>
            <div className="grid grid-cols-1 gap-4 items-center">
                <div>
                <DatePicker
                    required
                    selected={checkIn}
                    onChange={(data) => setValue("checkIn",data as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText='Check-in Date'
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full "
                />
                </div>
                <div>
                <DatePicker
                    required
                    selected={checkOut}
                    onChange={(data) => setValue("checkOut",data as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText='Check-in Date'
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full "
                />
                </div>

                <div className="flex bg-red-400 py-2 gap-2">
                <label className="items-center flex">
                    Adult:
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={1}
                        max={100000}
                        {...register('adultCount',{
                            required:"This field is required",
                            min:{
                                value:1,
                                message:'Minimum 1 adult'
                            },
                            valueAsNumber:true
                        })}
                    />
                </label>
                <label className="items-center flex">
                    Children:
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={0}
                        max={10000}
                        {...register('childCount',{
                            required:"This field is required",
                            valueAsNumber:true
                        })}
                        
                    />
                </label>
                {errors.adultCount && (
                    <span className="text-red-500 font-semibold text-sm">
                        {errors.adultCount.message}
                    </span>
                )}
            </div>
             {isLoggedIn ? (<button className="bg-blue-600 text-black h-ful p-2 font-bold hover:bg-blue-500  text-xl">Book Now</button>)
             :(<button className="bg-blue-600 text-black h-ful p-2 font-bold hover:bg-blue-500  text-xl">sign in to Book</button>)}
            </div>
        </form>
    </div>
   )
}

export default GuestInfoForm; 
