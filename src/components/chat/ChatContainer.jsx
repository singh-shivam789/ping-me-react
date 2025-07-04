import useChatStore from "../../lib/stores/user/chatStore";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";

export default function ChatContainer() {
  const msgScrollRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const currentChat = useChatStore((state) => state.currentChat);
  const chats = useChatStore((state) => state.chats);
  const chatUser = useChatStore((state) => state.chatUser);
  useEffect(() => {
    if (msgScrollRef.current) {
      setTimeout(function () {
        msgScrollRef.current?.scrollIntoView({
          behavior: "smooth"
        });
      }, 25);
    }
  }, [chats, chatUser]);

  useEffect(() => {
    const currentOpenedChat = chats.find((chat) => chat._id === currentChat);
    setChatMessages(currentOpenedChat.messages);
  }, [chats, currentChat])

  return (
    <div className="chatContainer">
      {chatMessages.map((message) => {
        return (<Message key={message._id} message={message} />)
      })}
      <div ref={msgScrollRef} className="scroll"></div>
    </div>
  )
}
