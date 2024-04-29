import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../Api-client";
import ManageStadiumForm from "../forms/manageStadiumForm/ManageStadiumForm";
import { useAppContext } from "../contexts/Appcontext";

const EditStadium = () => {

    const { stadiumId } = useParams();
    const {showToast} = useAppContext();

    const { data: stadium } = useQuery("fetchMyStadium", () => apiClient.fetchMyStadiumsById(stadiumId || ''), {
        enabled: !!stadiumId // Only run the query if stadiumId is truthy
    });

     const {mutate,isLoading} = useMutation(apiClient.updateMyStadiumsById,{
    
        onSuccess:()=>{
            showToast({message:"stadium saved!",type: "success"});
        },
        onError:()=>{
            showToast({message:"Error saving Stadium!",type:"error"});
        }
    
            
     })
     
     const handleSave = (stadiumFormData:FormData)=>{
        mutate( stadiumFormData)
     }

    return (
        <ManageStadiumForm  stadium={stadium}  onSave={handleSave}  isLoading={isLoading}/>
    );
};

export default EditStadium;


