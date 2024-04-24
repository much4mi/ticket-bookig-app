import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestSection from './GuestSection';
import ImagesSection from './ImagesSection';

// Define the type for form data
export type StadiumFormdata = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerGame: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    adultCount: number;
    childCount: number;
};

type Props = {
    onSave: (stadiumFormData: FormData) => void;
    isLoading: boolean;
};

const ManageStadiumForm = ({ onSave, isLoading }: Props) => {
    const formMethods = useForm<StadiumFormdata>();
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((formDataJson: StadiumFormdata) => {
        const formData = new FormData();

        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerGame", formDataJson.pricePerGame.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append("imageFiles", imageFile);
        });

        onSave(formData);
    });

    return (
        <FormProvider {...formMethods}>
            <form className='flex flex-col gap-10' onSubmit={onSubmit} encType="multipart/form-data">
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestSection />
                <ImagesSection />
                <span className='flex justify-end'>
                    <button
                        disabled={isLoading}
                        type='submit' className='bg-blue-500 text-black p-2 font-bold  hover:bg-blue-500 disabled:bg-grey-500'>
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageStadiumForm;



