import axios from "axios";

export async function getUserDocbyIdentifier(identifier, identifierValue) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user?${identifier}=${identifierValue}`,
            {
                withCredentials: true,
                validateStatus: function (status) {
                    return status < 500
                }
            }
        );
        return response.data.user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getUserById(userId) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${userId}`,
            {
                withCredentials: true,
                validateStatus: function (status) {
                    return status < 500
                }
            }
        );
        return response.data.user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createUserWithEmailAndPassword(userData) {
    try {
        return await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, userData,
            {
                withCredentials: true,
                validateStatus: function (status) {
                    return status < 500
                }
            }
        )
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Unknown signup error';
        throw new Error(errorMessage);
    }
}

export async function onboardUser(userData) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/onboard`, userData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error while onboarding user';
        throw new Error(errorMessage);
    }
}

export async function signInWithEmailAndPassword(email, password) {
    try {
        return await axios.post(`${import.meta.env.VITE_API_URL}/user/signin`, { email, password },
            {
                withCredentials: true
            }
        )
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Unknown signin error';
        throw new Error(errorMessage);
    }
}

export async function getUserValidationState() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/validate`,
            {
                withCredentials: true,
                validateStatus: function (status) {
                    return status < 500
                }
            });
        return response.data.isUserValidated;
    }
    catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Cannot verify user status';
        throw new Error(errorMessage);
    }
}

export async function logoutUser() {
    try {
        return await axios.post(`${import.meta.env.VITE_API_URL}/user/signout`, {},
            {
                withCredentials: true,
                validateStatus: function (status) {
                    return status < 500
                }
            });

    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error while signing out.';
        throw new Error(errorMessage);
    }
}

export async function sendFriendRequest(friendEmail, userId) {
    try {
        return await axios.post(`${import.meta.env.VITE_API_URL}/user/friendRequest`, {
            id: userId,
            friendEmail: friendEmail
        }, {
            withCredentials: true
        })
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error while sending friend request';
        throw new Error(errorMessage);
    }
}

export async function decideFriendRequestStatus(friendEmail, userId, friendRequestDecision) {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/user/friendRequest`, {
            id: userId,
            friendEmail: friendEmail,
            friendRequestDecision: friendRequestDecision
        }, {
            withCredentials: true,
            validateStatus: function (status) {
                return status < 500
            }
        });

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error while updating friend request';
        throw new Error(errorMessage);
    }
}

export async function getAllUsersWithMatchingEmails(emails) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/by-email`, { emails: [...emails] }, {
            withCredentials: true,
            validateStatus: function (status) {
                return status < 500
            }
        });
        return response.data.users;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error while getting all the users with matching Ids';
        throw new Error(errorMessage);
    }
}

export async function deleteUserAccount(userId) {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/user/${userId}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error while deleting user account';
        throw new Error(errorMessage);
    }
}

export async function removeFriend(userEmail, friendEmail) {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/user/removeFriend`, {
            email: userEmail,
            friendEmail: friendEmail
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error while removing friend';
        throw new Error(errorMessage);
    }
}

export async function sendMessage(friendId, message, chatId) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/sendMessage`, {
            friendId: friendId,
            chatId: chatId,
            message: message,
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error while sending message';
        throw new Error(errorMessage);
    }
}

export function getInitialUserState() {
    return {
        user: null,
        chats: [],
        lastSearched: null,
        searchHistory: [],
        notificationsVisible: false,
        friendRequestUsers: [],
        notificationBellActive: false,
        userFriends: [],
    }
}