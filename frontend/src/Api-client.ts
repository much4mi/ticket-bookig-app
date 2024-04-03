
import { RegisterFormData } from "./pages/Register";
import { SigninFormData } from "./pages/Signin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||  "";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

}

export const signin = async (formData: SigninFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const body = await response.json();

    if (!response.ok) {
        throw new Error(body.message);
    }

    return body;
}
export const signout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    });
    if (!response.ok) {
        throw new Error('Failed to signout');
    }
};