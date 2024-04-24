import { useFormContext } from "react-hook-form";
import { StadiumFormdata } from "./ManageStadiumForm";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<StadiumFormdata>();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">add stadium</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                name
                <input
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("name", { required: "This field is required" })}
                />
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}
            </label>
            <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    city
                    <input
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("city", { required: "This field is required" })}
                    />
                    {errors.city && (
                        <span className="text-red-500">{errors.city.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    country
                    <input
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("country", { required: "This field is required" })}
                    />
                    {errors.country && (
                        <span className="text-red-500">{errors.country.message}</span>
                    )}
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea
                    rows={10}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("description", { required: "This field is required" })}
                />
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                pricePerGame
                <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("pricePerGame", { required: "This field is required" })}
                />
                {errors.pricePerGame && (
                    <span className="text-red-500">{errors.pricePerGame.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                starRating
                <select
                    {...register('starRating', {
                        required: "This field is required",
                    })}
                    className="border rounded-sm w-full p-2 text-grey-700 font-normal"
                >
                    <option value="" className="text-sm font-bold">
                        select a rating
                    </option>
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
                {errors.starRating && (
                    <span className="text-red-500">{errors.starRating.message}</span>
                )}
            </label>
        </div>
    );
};

export default DetailsSection;
