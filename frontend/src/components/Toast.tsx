import { useEffect } from "react";

type ToastProps ={
       message: string;
       type: "success" | "error";
       onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const styles = type === "success"
        ? "flexed top-4 right-4 z-50 rounded-md bg-green-600 text-white max-w-md"
        : "flexed top-4 right-4 z-50 rounded-md bg-red-600 text-white max-w-md";

    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>
    );
};
export default Toast;
