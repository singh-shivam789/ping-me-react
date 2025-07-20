import axios from "axios";

export async function getAllUserChats(userId) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/chats/${userId}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
         const errorMessage = error.response?.data?.message
            || error.message
            || 'Error while fetching user chats';
        throw new Error(errorMessage);
    }
}