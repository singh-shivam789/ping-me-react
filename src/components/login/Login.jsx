import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection, where, getDocs } from "firebase/firestore";
import fileUpload from "../../lib/fileUpload";
import { auth, db } from "../../lib/firebase";
import { query } from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";
import "./login.css"
import Loading from "../common/Loading";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const errorHandler = (errMsg) => {
        errMsg = errMsg.split('/')[1].split('-');
        errMsg[0] = errMsg[0][0].toUpperCase() + errMsg[0].substring(1);
        errMsg = errMsg.join(' ') + "."
        return errMsg
    };

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
                await signInWithEmailAndPassword(auth, email, password)
                form.reset();
                toast.success("Successfully signed in!");
            } catch (err) {
                console.log(err.code);
                toast.error(errorHandler(err.code));
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
                const { email, password, username } = Object.fromEntries(formData);
                const db_ref = collection(db, "users");
                const isExistingUserQuery = query(db_ref, where("email", "==", email));
                const isExistingUser = await getDocs(isExistingUserQuery);
                if (!isExistingUser.empty) {
                    return toast.warn("Email already in use!");
                }
                const avatarUrl = profilePic.file ? await fileUpload(profilePic.file) : "";
                const res = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", res.user.uid), {
                    username: username,
                    email: email,
                    avatar: avatarUrl,
                    id: res.user.uid,
                    blocked: []
                });
                await setDoc(doc(db, "userchats", res.user.uid), {
                    chats: []
                });
                form.reset();
                avatarUrl && toast.success("Successfully uploaded your profile picture!");
                toast.success("Account successfully created! You can login now!");
            }
            catch (err) {
                console.error("In catch", JSON.stringify(err));
                toast.error(err.code ? errorHandler(err.code) : err.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            form.reportValidity();
        }
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
            console.log(err);
            toast.error("Error while uploading file!");
        }
    }
    return (
        <div className="login">
            <form className="signin" onSubmit={handleSignIn}>
                <h1>Welcome back</h1>
                <input required type="email" name="email" placeholder="Email" />
                <input required type="password" name="password" placeholder="Password" />
                {isLoading ? <Loading page={"login"} /> : <input className="btn" type="submit" value="Sign In" />}
            </form>
            <form className="signup" onSubmit={handleSignUp}>
                <h1>Create Account</h1>
                <div className="imgUpload">
                    <img src={profilePic.url || "/avatar.png"} alt="profilePic.png" />
                    <label style={{ "cursor": "pointer" }} htmlFor="fileInput">Upload an image</label>
                </div>
                <input onChange={setProfilePicture} style={{ display: "none" }} id="fileInput" type="file" />
                <input required type="text" name="username" placeholder="Username" />
                <input required type="email" name="email" placeholder="Email" />
                <input required type="password" name="password" placeholder="Password" />
                {isLoading ? <Loading page={"login"} /> : <input className="btn" type="submit" value="Sign Up" />}
            </form>
        </div>
    )
}
