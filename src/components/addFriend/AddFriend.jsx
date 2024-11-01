import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { toast } from "react-toastify";
import "./addFriend.css"
import { useUserStore } from "../../lib/userStore";

export default function AddFriend() {
    const [friend, setFriend] = useState(null);
    const currentUser = useUserStore.getState().currentUser;
    useEffect(() => {
        setFriend(null);
    }, [])
    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const friendUsername = formData.get("username");
        const friendRef = collection(db, "users");
        const friendQuery = query(friendRef, where("username", "==", friendUsername));
        const querySnapshot = await getDocs(friendQuery);
        if (!querySnapshot.empty) {
            setFriend(querySnapshot.docs[0].data());
            toast.success("Found!");
        }
        else {
            toast.warn("Could not find any user with this username, Try Again!");
            setFriend(null);
        }
    }
    const addFriendHandler = async () => {
        const chatCollectionRef = collection(db, "chats");
        const userChatRef = collection(db, "userchats");
        try {
            const newChatDocRef = doc(chatCollectionRef)
            await setDoc(newChatDocRef, {
                createdAt: serverTimestamp(),
                messages: [],
                id: newChatDocRef.id
            });

            await updateDoc(doc(userChatRef, friend.id), {
                chats: arrayUnion({
                    chatId: newChatDocRef.id,
                    receiverId: currentUser.id,
                    lastMessage: "",
                    updatedAt: Date.now(),
                })
            });

            await updateDoc(doc(userChatRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatDocRef.id,
                    receiverId: friend.id,
                    lastMessage: "",
                    updatedAt: Date.now(),
                })
            });

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="addFriend">
            <form className="addFriendForm" onSubmit={handleSearch}>
                <input name="username" className="addFriendSearchBar" type="text" placeholder="Enter username..." />
                <input className="friendSearchBtn" type="submit" value="Search" />
            </form>
            {friend && <div className="friend">
                <div className="friendInfo">
                    <img src={friend.avatar || "/avatar.png"} alt="" />
                    <span>{friend.username}</span>
                </div>
                <button onClick={addFriendHandler}>Add Friend</button>
            </div>}
        </div>
    )
}
