import { useMutation } from "react-query";
import ManageStadiumForm from "../forms/manageStadiumForm/ManageStadiumForm";
import { useAppContext } from "../contexts/Appcontext";
import * as apiClient from "../Api-client"; 

const AddStadium = () => {
    const { showToast } = useAppContext();
    const { mutate, isLoading } = useMutation(apiClient.addStadium, {
        onSuccess: () => {
            showToast({ message: "Stadium saved!", type: 'SUCCESS' }); // Use 'SUCCESS' instead of 'success'
        },
        onError: (err) => {
            console.log(err);
            showToast({ message: "Error saving stadium", type: 'ERROR' }); // Use 'ERROR' instead of 'error'
        }
    });

    const handleSave = (stadiumFormData: FormData) => {
        mutate(stadiumFormData);
    };

    return <ManageStadiumForm onSave={handleSave} isLoading= {isLoading} />;
};

export default AddStadium;


