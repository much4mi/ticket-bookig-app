import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../Api-client";
import { useAppContext } from "../contexts/Appcontext";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess:async () => {
            await queryClient.invalidateQueries("validateToken ")
            showToast({ message: "Sign out successful", type: "success" });
        },
        onError: () => {
            showToast({ message: "Failed to sign out", type: "error" });
        }
    });

    const handleClick = () => {
        mutation.mutate();
    };

    return (
        
            <button onClick={handleClick} className="text-blue-600 px-3 font-bold bg-black hover:bg-grey-100">
                sign out</button>
    );
};

export default SignOutButton;
