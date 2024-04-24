import { useFormContext } from "react-hook-form";
import { StadiumFormdata } from "./ManageStadiumForm";

const ImagesSection = () => {
    const { register, formState: { errors }} = useFormContext<StadiumFormdata>();

   

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                <input 
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-grey-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLenth = imageFiles?.length;
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



