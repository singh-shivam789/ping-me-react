import axios from "axios";

function getUserDocbyIdentifier(identifier, identifierValue) {
    try {
        axios.get(`http://localhost:3000/user?${identifier}=${identifierValue[identifier]}`,
            { withCredentials: true }).then(response => {
                if (response.status >= 500) {
                    throw new Error(response.data.message);
                }
                else return response.data;
            }).catch(error => {
                throw new Error(error.message);
            });
    } catch (error) {
        console.log("Error while fetching user");
        throw new Error(error.message);
    }

    return axios.get(`http://localhost:3000/user?${identifier}=${identifierValue[identifier]}`, { withCredentials: true },
        {
            validateStatus: (status) => status >= 200 && status < 500

        }).then(response => {
            return response;
        }).catch(error => {
            const errorMessage = error.response?.data?.message
                || error.message
                || 'Unknown signup error';
            console.error("Signup failed:", errorMessage);
            throw new Error(errorMessage);
        });
}

export function getUserDocbyEmail(userData) {
    return getUserDocbyIdentifier("email", userData);
}

export function getUserDocbyUsername(userData) {
    return getUserDocbyIdentifier("username", userData);
}

export async function createUserWithEmailAndPassword(userData) {
    return axios.post(`http://localhost:3000/user/signup`, userData,
        {
            withCredentials: true
        }, {
        validateStatus: (status) => status >= 200 && status < 500
    }).then(response => {
        return response;
    }).catch(error => {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Unknown signup error';
        console.error("Signup failed:", errorMessage);
        throw new Error(errorMessage);
    });
}


export async function signInWithEmailAndPassword(email, password) {
    return axios.post(`http://localhost:3000/user/signin`, { email, password },
        { withCredentials: true }, {
        validateStatus: (status) => status >= 200 && status < 500
    }).then(response => {
        return response;
    }).catch(error => {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Unknown signin error';
        console.error("Signin failed:", errorMessage);
        throw new Error(errorMessage);
    });
}

export async function getUserValidationState() {
    return axios.get(`http://localhost:3000/user/validate`,
        { withCredentials: true }, {
        validateStatus: (status) => status >= 200 && status < 500
    }).then(response => {
        return response;
    }).catch(error => {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Cannot verify user status';
        console.error("Verification failed:", errorMessage);
        throw new Error(errorMessage);
    });
}

export async function logoutUser() {
    return axios.post("http://localhost:3000/user/signout", {},
        { withCredentials: true }, {
        validateStatus: (status) => status >= 200 && status < 500
    }).then(response => {
        return response;
    }).catch(error => {
        const errorMessage = error.response?.data?.message
            || error.message
            || 'Error while signing out.';
        console.error("Error while siging out", errorMessage);
        throw new Error(errorMessage);
    });
}