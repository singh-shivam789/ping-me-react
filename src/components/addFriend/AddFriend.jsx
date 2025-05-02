import { getUserDocbyIdentifier, sendFriendRequest } from "../../utils/userUtils";
import { useUserStore } from "../../lib/stores/user/userStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./addFriend.css"

export default function AddFriend({ setAddFriendRef }) {
    const addFriendRef = useRef(null);
    const currentUser = useUserStore((state) => state.user);
    const currentUserSearchHistory = useUserStore((state) => state.searchHistory);
    const lastSearched = useUserStore((state) => state.lastSearched);
    const setLastSearched = useUserStore((state) => state.setLastSearched);
    const addToSearchHistory = useUserStore((state) => state.addToSearchHistory);
    const removeFromSearchHistory = useUserStore((state) => state.removeFromSearchHistory);
    useEffect(() => {
        setAddFriendRef(addFriendRef);
    }, [])

    const addFriendHandler = async (e) => {
        try {
            const friendEmail = e.target.getAttribute("data-email");
            const isAlreadyFriend = e.target.getAttribute("data-is-already-friend");
            if (isAlreadyFriend === "true") {
                toast.warn("Already a friend!");
                return;
            } else {
                let response = await sendFriendRequest(friendEmail, currentUser._id);
                const updatedUser = response.data.user;
                useUserStore.setState({ user: updatedUser });
                toast.info("Friend request sent!");
                toast.info("You will be notified if they accept your request");
                return;
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }
    
    const handleSearch = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.target);
            const friendEmail = Object.fromEntries(formData).email;
            const friend = await getUserDocbyIdentifier("email", friendEmail);
            if (friendEmail === currentUser.email) return;
            if (!friend || !friend._id || !friend.username) {
                toast.error("User not found or invalid data.");
                return;
            }

            if (!lastSearched || lastSearched !== friend.email) addToSearchHistory(friend);
            setLastSearched(friend.email);
        }
        catch (err) {
            toast.error(err);
            console.log(err);
        }
    }

    const removeFromListHandler = (e) => {
        const friendEmail = e.target.getAttribute("data-email");
        removeFromSearchHistory(friendEmail);   
    }

    return (
        <div ref={addFriendRef} className="addFriend">
            <form className="addFriendForm" onSubmit={handleSearch}>
                <input name="email" className="addFriendSearchBar" type="email" placeholder="Enter email..." />
                <input className="friendSearchBtn" type="submit" value="Search" />
            </form>
            {(
                currentUserSearchHistory.map((user) => {
                    const isAlreadyFriend = currentUser.friends.some((email) => email === user.email);
                    const hasSentFriendRequestEarlier = currentUser.friendRequests.sent.some((email) => email === user.email);
                    return (<div className="friend" key={user._id}>
                        <div className="friendInfo">
                            <img src={user.pfp || "/avatar.png"} alt="" />
                            <span>{user.username}</span>
                        </div>
                        <button disabled={hasSentFriendRequestEarlier} id={user._id} data-email={user.email} onClick={addFriendHandler} data-is-already-friend={isAlreadyFriend}>Add Friend</button>
                        <button id={user._id} data-email={user.email} onClick={removeFromListHandler}>x</button>
                    </div>)
                })
            )}
        </div>
    )
}
