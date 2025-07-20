import axios from "axios";

export async function fetchAllUsers(){
    try {
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/users/all`, {
            withCredentials: true
        });
        return response.data.users;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error while fetching users';
        throw new Error(errorMessage);
    }
}


export const SOCKET_OPTIONS = {
    withCredentials: true,
    transports: ["websocket", "polling"]
}

export const SOCKET_URL = import.meta.env.VITE_API_URL