import "./addFriend.css"
export default function AddFriend() {
    return (
        <div className="addFriend">
            <form className="addFriendForm" action="">
                <input className="addFriendSearchBar" type="text" placeholder="Enter username..." />
                <input className="friendSearchBtn" type="submit" value="Search" />
            </form>
            <div className="friend">
                <div className="friendInfo">
                    <img src="/avatar.png" alt="" />
                    <span>Aman Davies</span>
                </div>
                <button>Add Friend</button>
            </div>
        </div>
    )
}
