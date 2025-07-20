import useUserStore from "../../lib/stores/user/userStore";
import useChatStore from "../../lib/stores/user/chatStore";
import { onboardUser } from "../../utils/userUtils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./userOnboarding.css";

export default function UserOnboarding() {
    const setIsNewUser = useUserStore((state) => state.setIsNewUser);
    const currentUser = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const setChatUser = useChatStore(state => state.setChatUser);
    const setSelfChatUser = useChatStore((state) => state.setSelfChatUser);

    const [profilePic, setProfilePic] = useState({
        file: null,
        url: ""
    });

    const userOnboardingHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { username, status } = Object.fromEntries(formData);
        onboardUser({
            username,
            status,
            email: currentUser.email,
            pfp: profilePic.file
        }).then((response) => {
            const updatedUser = {
                ...currentUser,
                pfp: response.filename,
                status: status || "Hey there, I'm using PingMe",
                username: username
            };
            setSelfChatUser(updatedUser);
            setChatUser(updatedUser);
            setIsNewUser(false);
            toast.info("All done!")
            setUser(updatedUser)
        }).catch(error => {
            console.log("Error during onboarding", error);
        })
    }

    const setProfilePicture = async (e) => {
        e.preventDefault();
        try {
            if (e.target.files[0]) {
                let file = e.target.files[0];
                let url = URL.createObjectURL(file);
                if (file.size > 5 * 1024 * 1024) {
                    alert("Please pick an image under 5MB.");
                    setProfilePic({
                        file: null,
                        url: ""
                    })
                }
                if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
                    alert("Only PNG, JPEG and JPG images allowed.");
                }
                else {
                    setProfilePic({
                        file: file,
                        url: url
                    });
                }
            } else {
                setProfilePic({
                    file: null,
                    url: ""
                })
            }
        } catch (error) {
            console.log(error.stack);
            toast.error("Error while uploading file!");
        }
    }

    return (
        <div className="userOnboardingContainer">
            <div className="userOnboarding">
                <div className="userOnboardingHeader">
                    <h1>Just One More Step...</h1>
                </div>
                <div className="userOnboardingForms">
                    <form encType="multipart/form-data" onSubmit={userOnboardingHandler} className="signUpNextSetup">
                        <div className="imgUpload">
                            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                                <img src={profilePic.url || "/avatar.png"} alt="Profile" />
                                <span className="cameraOverlay">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                        <circle cx="12" cy="13" r="4" />
                                    </svg>
                                </span>
                            </label>
                            <input onChange={setProfilePicture} style={{ display: "none" }} id="fileInput" type="file" accept="image/png, image/jpeg, image/jpg" />
                        </div>
                        <input
                            className="optionFormInput"
                            type="text"
                            name="username"
                            placeholder="Please type a Username"
                            required
                            minLength={3}
                            maxLength={20}
                            pattern="^[A-Za-z0-9_]+$"
                            title="Username should be 3–20 characters long and contain only letters, numbers, and underscores."
                        />

                        <input
                            className="optionFormInput"
                            type="text"
                            name="status"
                            placeholder="Status"
                            maxLength={50}
                            title="Status can contain letters, numbers, spaces, and basic punctuation."
                        />

                        <input className="btn" type="submit" value="Let's Go" />
                    </form>
                </div>
            </div>
        </div>
    )
}
