import axios from "axios";

export async function fetchAllUsers(){
    try {
        let response = await axios.get("http://localhost:3000/users/all", {
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

export function getInitialAppState() {
    return {
        allUsers: []
    }
}

export const SOCKET_OPTIONS = {
    withCredentials: true,
    transports: ["websocket", "polling"]
}

export const SOCKET_URL = "http://localhost:3000"