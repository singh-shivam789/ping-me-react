import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../utils/userUtils";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import useUserStore from "../../lib/stores/user/userStore";
import { toast } from "react-toastify";
import { useState } from "react";
import "./login.css"

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const setUser = useUserStore(state => state.setUser);
    const [profilePic, setProfilePic] = useState({
        file: null,
        url: ""
    })

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        if (form.checkValidity()) {
            try {
                const formData = new FormData(form);
                const { email, password } = Object.fromEntries(formData);
                signInWithEmailAndPassword(email, password).then(response => {
                    form.reset();
                    setUser(response.data.user);
                    toast.success("Successfully signed in!");
                }).catch(error => {
                    console.log(error.stack);
                    toast.error(error.message);
                })
            } catch (err) {
                console.log(err.stack);
                toast.error("Something went wrong!");
            } finally {
                setIsLoading(false);
            }
        } else {
            form.reportValidity();
        }
    }

    const handleSignUp = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const form = e.target;
        if (form.checkValidity()) {
            try {
                const formData = new FormData(form);
                let userData = Object.fromEntries(formData);
                userData = {
                    ...userData, chats: [], friendRequests: {
                        sent: [],
                        received: []
                    }, friends: [], blocked: [], settings: [], status: "", pfp: ""
                };

                createUserWithEmailAndPassword(userData).then(response => {
                    if (response.status === 400) {
                        toast.warn(response.data.message);
                    } else if (response.status === 409) {
                        toast.warn("Email already in use!");
                    } else {
                        toast.success("Account successfully created! You can login now!");
                    }
                    form.reset();
                }).catch(error => {
                    console.log(error);
                    throw new Error(error.message);
                });
            } catch (err) {
                console.log(err.stack);
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            form.reportValidity();
        }
    };

    const handleForgotPassword = async (e) => {
        setForgotPassword((prev) => !prev);
        //TODO: For later
    }

    const setProfilePicture = async (e) => {
        e.preventDefault();
        try {
            if (e.target.files[0]) {
                let file = e.target.files[0];
                let url = URL.createObjectURL(file);
                setProfilePic({
                    file: file,
                    url: url
                });
            } else {
                setProfilePic({
                    file: null,
                    url: ""
                })
            }
        } catch (err) {
            console.log(err.stack);
            toast.error("Error while uploading file!");
        }
    }
    return (
        (forgotPassword ? <ForgotPassword /> : (<div className="login">
            <form className="signin" onSubmit={handleSignIn}>
                <h1>Welcome back</h1>
                <input required type="email" name="email" placeholder="Email" />
                <input required type="password" name="password" placeholder="Password" />
                <input className="btn" type="submit" value="Sign In" />
            </form>
            <form className="signup" onSubmit={handleSignUp}>
                <h1>Create Account</h1>
                <div className="imgUpload">
                    <img src={profilePic.url || "/avatar.png"} alt="profilePic.png" />
                    <label style={{ "cursor": "pointer" }} htmlFor="fileInput">Upload an image</label>
                </div>
                <input onChange={setProfilePicture} style={{ display: "none" }} id="fileInput" type="file" />
                <input required
                    type="text"
                    name="username"
                    placeholder="Username"
                    minLength="3"
                    maxLength="15"
                    pattern="^[a-zA-Z0-9_]+$"
                    title="Username should be 3-15 characters long and contain only letters, numbers, and underscores."
                />
                <input required type="email" name="email" placeholder="Email" />
                <input required
                    type="password"
                    name="password"
                    placeholder="Password"
                    minLength="3"
                    maxLength="15"
                    pattern="^[a-zA-Z0-9_@]+$"
                    title="Password should be 3-15 characters long and contain only letters, numbers, and underscores." />
                <input className="btn" type="submit" value="Sign Up" />
            </form>
        </div>))
    )
}
