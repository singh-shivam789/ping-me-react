import useUserStore from "../../lib/stores/user/userStore";
import "./common.css"

export default function UserInfoDetail({ user }) {
    const currentUser = useUserStore(state => state.user);
    return (
        <div className="userDetailContainer">
            {user &&
                <div className="userDetail">
                    <div className="userDetailContactPfp">
                        <img src={user.pfp ? `http://localhost:3000/uploads/${user.pfp}` : "/avatar.png"} alt="Profile" />
                        <h2>{currentUser.email === user.email ? user.username + " (You)" : user.username}</h2>
                        <p className="userEmail">{user.email}</p>
                    </div>

                    <div className="userDetailAbout">
                        <p>About</p>
                        <p className="userStatus">{user.status}</p>
                    </div>
                </div>}
        </div>
    )
}
