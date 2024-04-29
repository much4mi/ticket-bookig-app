import { useFormContext } from "react-hook-form";
import { StadiumFormdata } from "./ManageStadiumForm";
import { MouseEvent } from "react";

const ImagesSection = () => {
    const { register, formState: { errors },watch, setValue} = useFormContext<StadiumFormdata>();

    const existingImageUrls = watch("imageUrls");

    const handleDelete = (event:React.MouseEvent<HTMLButtonElement,MouseEvent>, imageUrl:string)=>{
        event.preventDefault();
        setValue("imageUrls", existingImageUrls.filter((url)=> url !== imageUrl))

    }

   

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((URL)=>(
                            <div className="relative group">
                         <img src={URL} className="min-h-full object-cover" alt="Description of the image"/>
                         <button 
                          onClick={(event) => handleDelete(event, URL)}

                         className="abusolute inset-0 flex justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-black">Delete</button>

                            </div>
                        ))}
                    </div>
                )}
                <input 
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-grey-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLenth = imageFiles?.length + (existingImageUrls ?.length || 0);
                          if(totalLenth === 0){
                            return 'At least one image should be added';
                          }
                            
                            
                            if (totalLenth >6) {
                                return "Total number of images cannot be more than 6";
                            }
                            return true;
                        }
                    })}
                />
                {errors.imageFiles && (
                    <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
                )}
            </div>
        </div>
    );
};

export default ImagesSection;



