import { useSocketContext } from '../../hooks/useSocketContext.js';
import useChatStore from '../../lib/stores/user/chatStore.js';
import useUserStore from "../../lib/stores/user/userStore";
import { getUserDocbyIdentifier, sendFriendRequest } from "../../utils/userUtils";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./addFriend.css";

export default function AddFriend({ setAddFriendRef }) {
    const addFriendRef = useRef(null);
    const setUser = useUserStore(state => state.setUser);
    const currentUser = useUserStore((state) => state.user);
    const removeFromSearchHistory = useUserStore((state) => state.removeFromSearchHistory);
    const currentUserSearchHistory = useUserStore((state) => state.searchHistory);
    const addToSearchHistory = useUserStore((state) => state.addToSearchHistory);
    const addFriendRequest = useUserStore((state) => state.addFriendRequest);
    const setLastSearched = useUserStore((state) => state.setLastSearched);
    const addToUserFriends = useUserStore(state => state.addToUserFriends);
    const lastSearched = useUserStore((state) => state.lastSearched);
    const addToChats = useChatStore((state) => state.addToChats);

    const socket = useSocketContext();
    const [isSocketActive, setIsSocketActive] = useState(false);

    const socketFriendRequestStatusHandler = (data) => {
        try {
            const friendRequestDecision = data.friendRequestStatus;
            const sentFrom = data.sentFrom;
            const updatedUser = data.to;
            const initiatedChat = data.initiatedChat;
            setUser(updatedUser);
            if (friendRequestDecision === "accept") {
                addToUserFriends({
                    _id: sentFrom._id,
                    username: sentFrom.username,
                    email: sentFrom.email,
                    pfp: sentFrom.pfp,
                    status: sentFrom.status
                });
                initiatedChat.user = {
                    _id: sentFrom._id,
                    username: sentFrom.username,
                    email: sentFrom.email,
                    pfp: sentFrom.pfp,
                    status: sentFrom.status
                }
                addToChats(initiatedChat);
                toast.info(`${sentFrom.username} accepted your friend request`);
                toast.info(`You can now initiate a chat with them!`);
            }
            removeFromSearchHistory(sentFrom.email);
            setLastSearched("");
        }
        catch (error) {
            console.log("Error", error.message);
        }
    }

    useEffect(() => {
        if (socket != null) {
            setIsSocketActive(true);
        }
    }, [socket]);

    useEffect(() => {
        if (isSocketActive) {
            if (currentUser !== null) {
                socket.on("friend-request-status-changed", socketFriendRequestStatusHandler)
            }
        }
        else return;
        return () => {
            socket.off("friend-request-status-changed", socketFriendRequestStatusHandler);
        }
    }, [socket, isSocketActive]);


    useEffect(() => {
        setAddFriendRef(addFriendRef);
        setLastSearched("");
    }, [])

    const addFriendHandler = async (e) => {
        try {
            const friendEmail = e.target.getAttribute("data-email");
            const isAlreadyFriend = e.target.getAttribute("data-is-already-friend");
            if (isAlreadyFriend === "true") {
                toast.warn("Already a friend!");
                return;
            } else {
                addFriendRequest(friendEmail);
                await sendFriendRequest(friendEmail, currentUser._id);
                toast.info("Friend request sent!");
                toast.info("You will be notified if they accept your request");
                return;
            }
        } catch (error) {
            toast.error("Error while sending friend request");
            console.log(error);
            return;
        }
    }

    const getUser = async (friendEmail) => {
        return getUserDocbyIdentifier("email", friendEmail);
    }

    const handleSearch = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.target);
            const friendEmail = Object.fromEntries(formData).email;
            const friend = await getUser(friendEmail);
            if (friendEmail === currentUser.email) return;
            if (!friend) {
                toast.error("User not found or invalid email.");
                return;
            }
            if (!lastSearched || lastSearched !== friendEmail) addToSearchHistory(friend);
            setLastSearched(friendEmail);
        }
        catch (error) {
            toast.error(error);
            console.log(error);
        }
    }

    const removeFromListHandler = (e) => {
        const friendEmail = e.target.getAttribute("data-email");
        removeFromSearchHistory(friendEmail);
        setLastSearched("");
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
                            <img src={user.pfp ? `http://localhost:3000/uploads/${user.pfp}` : "/avatar.png"} alt="" />
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
