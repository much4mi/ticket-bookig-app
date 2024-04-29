import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestSection from './GuestSection';
import ImagesSection from './ImagesSection';
import { StadiumType } from '../../../../backend/src/shared/Types';
import { useEffect } from 'react';

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
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};

type Props = {
    stadium?:StadiumType
    onSave: (stadiumFormData: FormData) => void;
    isLoading: boolean;
};

const ManageStadiumForm = ({ onSave, isLoading,stadium }: Props) => {
    const formMethods = useForm<StadiumFormdata>();
    const { handleSubmit,reset } = formMethods;

    useEffect(()=>{
        reset(stadium);
    }, [stadium,reset])

    const onSubmit = handleSubmit((formDataJson: StadiumFormdata) => {
        const formData = new FormData();
        if(stadium){
            formData.append("stadiumId",String(stadium?._id));
        }

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

        if(formDataJson.imageUrls){
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`images[${index}]`, url);
            })
        }





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



