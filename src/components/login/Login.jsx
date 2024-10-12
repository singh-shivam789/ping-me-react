import { toast } from "react-toastify";
import "./login.css"
export default function Login() {
    return (
        <div className="login">
            <form className="signin" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target)
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
                toast.success("Success!")
            }}>
                <h1>Welcome back</h1>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <input className="btn" type="submit" value="Sign In" />
            </form>
            <form className="signup"
                action="">
                <h1>Create Account</h1>
                <div className="imgUpload">
                    <img src="/avatar.png" alt="" />
                    <label htmlFor="fileInput">Upload an image</label>
                </div>
                <input style={{ display: "none" }} id="fileInput" type="file" />
                <input type="text" name="username" placeholder="Username" />
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <input className="btn" type="submit" value="Sign Up" />
            </form>
        </div>
    )
}
