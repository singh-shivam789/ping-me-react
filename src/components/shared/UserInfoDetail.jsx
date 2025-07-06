import "./common.css"

export default function UserInfoDetail({ user }) {
    return (
        <div className="userDetailContainer">
            {user &&
                <div className="userDetail">
                    <div className="userDetailContactPfp">
                        <img src={user.pfp || "/avatar.png"} alt="Profile" />
                        <h2>{user.username}</h2>
                        <p className="userEmail">{user.email}</p>
                    </div>

                    <div className="userDetailAbout">
                        <p>About</p>
                        <p className="userStatus">{user.status || "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, officia, omnis vel vero expedita tenetur sequi delectus, magnam a nulla aspernatur dolorem dolorum accusantium tempore soluta animi unde id voluptate."}</p>
                    </div>
                </div>}
        </div>
    )
}
