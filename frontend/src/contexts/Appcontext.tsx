import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';


type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR"; 
};

type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    const showToast = (toastMessage: ToastMessage) => {
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
