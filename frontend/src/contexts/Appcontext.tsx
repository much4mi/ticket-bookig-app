import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';
import { useQuery } from 'react-query';
import * as apiClient from "../Api-client";

type ToastMessageType = {
    message: string;
    type: "success" | "error";
};

type AppContextType = {
    showToast: (toastMessage: ToastMessageType) => void;
    isLoggedIn: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessageType | undefined>(undefined);
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    });

    const showToast = (toastMessage: ToastMessageType) => {
        setToast(toastMessage);
    };
    
    const isLoggedIn = !isError;

    return (
        <AppContext.Provider value={{ showToast, isLoggedIn }}>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};
