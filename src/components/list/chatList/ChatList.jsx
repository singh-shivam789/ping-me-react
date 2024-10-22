import { doc, onSnapshot } from "firebase/firestore"
import { useUserStore } from "../../../lib/userStore"
import AddFriend from "../../addFriend/AddFriend"
import { useEffect, useState } from "react"
import { db } from "../../../lib/firebase"
import ChatItem from "./ChatItem"
import "./chatList.css"

export default function ChatList() {
  const [addRemove, setAddRemove] = useState(false);
  const [currentUserChats, setCurrentUserChats] = useState([]);
  const { currentUser } = useUserStore();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (currentUserChatDoc) => {
      //in all the chats, we also added the latest information of the friend using receiverId
      const allChats = currentUserChatDoc.data().chats;
      const promises = allChats.map(async (chat) => {
        const friendRef = doc(db, "users", chat.receiverId);
        const friendSnap = await getDoc(friendRef);
        const friendData = friendSnap.data();
        return { ...chat, friendData };
      });
      const updatedChats = await Promise.all(promises);
      setCurrentUserChats(updatedChats.sort((a, b) => a.updatedAt - b.updatedAt));
    });
    return () => { unsub() };
  }, [currentUser.id]);
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img className="searchImg" src="/search.png" alt="search.png" />
          <input type="text" placeholder="Search" />
        </div>
        <img onClick={() => setAddRemove(prevState => !prevState)} className="addImg" src={addRemove ? "/minus.png" : "/plus.png"} alt="plus.png" />
      </div>
      <div className="chatItemContainer">
        {currentUserChats.map((chat) => <ChatItem key={chat.id} data={chat} />)}
      </div>
      {addRemove && <AddFriend />}
    </div>
  )
}