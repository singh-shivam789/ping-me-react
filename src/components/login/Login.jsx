import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../utils/userUtils";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import useChatStore from "../../lib/stores/user/chatStore";
import useUserStore from "../../lib/stores/user/userStore";
import { getAllUserChats } from "../../utils/chatUtils";
import { toast } from "react-toastify";
import { useState } from "react";
import "./login.css"

export default function Login() {
    const [forgotPassword, setForgotPassword] = useState(false);
    const setUser = useUserStore(state => state.setUser);
    const setCurrentChat = useChatStore((state) => state.setCurrentChat);
    const setUserFriends = useUserStore(state => state.setUserFriends);
    const setChats = useChatStore(state => state.setChats);
    const setChatUser = useChatStore(state => state.setChatUser);
    const setIsNewUser = useUserStore((state) => state.setIsNewUser);

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        if (form.checkValidity()) {
            try {
                const formData = new FormData(form);
                const { email, password } = Object.fromEntries(formData);
                signInWithEmailAndPassword(email, password).then(
                    response => {
                        form.reset();
                        const currentUser = response.data.user;
                        const currentUserFriends = response.data.friends;
                        if(!currentUser.username || currentUser.username === "") setIsNewUser(true);
                        getAllUserChats(response.data.user._id).then((response) => {
                            response.chats.forEach((chat) => {
                                if (chat.isSelfChat) {
                                    chat.user = currentUser;
                                }
                                else {
                                    const friendId = chat.participants.find((id) => id !== currentUser._id);
                                    chat.user = currentUserFriends.find((user) => user._id === friendId);
                                }
                            })
                            let selfChat = response.chats.find((chat) => chat.isSelfChat === true);
                            selfChat.read = true;
                            let otherChats = response.chats.filter((chat) => chat.isSelfChat !== true);
                            const orderedChats = [selfChat, ...otherChats];
                            setChats(orderedChats);
                            setChatUser(orderedChats[0].user);
                            setCurrentChat(selfChat._id);
                            setUserFriends(currentUserFriends);
                            setUser(currentUser);
                        }).catch(error => {
                            throw new Error(error.message);
                        })
                        toast.success("Successfully signed in!");
                    }).catch(error => {
                        console.log(error.stack);
                        toast.error(error.message);
                    })
            } catch (error) {
                console.log(error.stack);
                toast.error("Something went wrong!");
            }
        } else {
            form.reportValidity();
        }
    }

    const handleSignUp = async (e) => {
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
                        const chats = [];
                        const selfChat = response.data.selfChat;
                        selfChat.user = response.data.user;
                        chats.push(selfChat);
                        setChats(chats);
                        setCurrentChat(selfChat._id);
                        setIsNewUser(true);
                        setUser(response.data.user);
                    }
                    form.reset();
                }).catch(error => {
                    console.log(error);
                    throw new Error(error.message);
                });
            } catch (error) {
                console.log(error.stack);
                toast.error(error.message);
            }
        } else {
            form.reportValidity();
        }
    };

    return (
        <div className="login">
            <div className="loginHeader">
                <h1>PingMe</h1>
                <h3>Always Stay connected</h3>
            </div>
            <div className="loginForms">
                <form className="signin" onSubmit={handleSignIn}>
                    {forgotPassword ? <ForgotPassword setForgotPassword={setForgotPassword} /> : <>
                        <h1>Welcome back</h1>
                        <input required type="email" name="email" placeholder="Email" />
                        <input required type="password" name="password" placeholder="Password" />
                        <input className="btn" type="submit" value="Sign In" />
                        <input onClick={() => { setForgotPassword((prev) => !prev) }} className="btn" type="button" value="Forgot Password" />
                    </>}
                </form>
                <form className="signup" onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
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
            </div>
        </div>
    )
}
