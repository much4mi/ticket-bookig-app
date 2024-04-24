import { useFormContext } from "react-hook-form";
import { StadiumFormdata } from "./ManageStadiumForm";

const GuestSection = () => {
    const { register, formState: { errors } } = useFormContext<StadiumFormdata>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="grid grid-cols-5 p-6 gap-3 bg-gray-300">
                <label htmlFor="adults" className="text-gray-700 text-sm font-semibold">
                    Adults
                    <input
                        id="adults"
                        className="border rounded w-full px-2 py-3 font-normal"
                        type="number"
                        min={1}
                        {...register("adultCount", { required: 'This field is required' })}
                    />
                    {errors.adultCount && (
                        <span className="text-red-500 text-sm font-bold">{errors.adultCount?.message}</span>
                    )}
                </label>

                <label htmlFor="children" className="text-gray-700 text-sm font-semibold">
                    Children
                    <input
                        id="children"
                        className="border rounded w-full px-2 py-3 font-normal"
                        type="number"
                        min={0}
                        {...register("childCount", { required: 'Please enter the number of children' })}
                    />
                    {errors.childCount && (
                        <span className="text-red-500 text-sm font-bold">{errors.childCount?.message}</span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default GuestSection;


