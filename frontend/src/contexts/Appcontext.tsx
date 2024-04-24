import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

type ToastMessageType = {
    message: string;
    type: "success" | "error"; // Updated to lowercase
};

type AppContextType = {
    showToast: (toastMessage: ToastMessageType) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessageType | undefined>(undefined);

    const showToast = (toastMessage: ToastMessageType) => {
        setToast(toastMessage);
    };

    return (
        <AppContext.Provider value={{ showToast }}>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContextType;
};

