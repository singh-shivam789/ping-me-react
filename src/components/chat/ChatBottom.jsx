import { useSocketContext } from "../../hooks/useSocketContext";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import useUserStore from "../../lib/stores/user/userStore";
import useChatStore from "../../lib/stores/user/chatStore";
import { memo, useEffect, useRef, useState } from "react";
import useAppStore from "../../lib/stores/app/appStore";
import { sendMessage } from "../../utils/userUtils";
import UtilityIcons from "../shared/UtilityIcons"
import EmojiPicker from "emoji-picker-react";
import { v4 } from "uuid"

const ChatBottom = () => {
  const emojiPickerRef = useRef(null);
  const socket = useSocketContext();
  const toggleButtonRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const currentUser = useUserStore((state) => state.user);
  const currentChat = useChatStore((state) => state.currentChat);
  const chatUser = useChatStore((state) => state.chatUser);
  const showEmojiPicker = useAppStore((state) => state.showEmojiPicker);
  const setShowEmojiPicker = useAppStore((state) => state.setShowEmojiPicker);
  const addMessageToCurrentChat = useChatStore((state) => state.addMessageToCurrentChat);
  const setChatLastMessage = useChatStore((state) => state.setChatLastMessage);

  const [isSocketActive, setIsSocketActive] = useState(false);
  const messageRecievedSocketHandler = (data) => {
    try {
      addMessageToCurrentChat(data.updatedChat._id, data.updatedChat.lastMessage);
      setChatLastMessage(data.updatedChat._id, data.updatedChat.lastMessage);
    } catch (error) {
      console.log("Error", error);
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
        socket.on("message-received", messageRecievedSocketHandler)
      }
    }
    else return;
    return () => {
      socket.off("message-recieved", messageRecievedSocketHandler);
    }
  }, [socket, isSocketActive]);


  const getMessage = (messageText) => {
    return messageText == "" ? null : {
      _id: v4(),
      userId: currentUser._id,
      text: messageText,
      messageTime: Date.now(),
      media: ""
    }
  }

  const messageSendHandler = async (event) => {
    try {
      const message = getMessage(inputText);
      if (message) {
        if (event.key === 'Enter' || !event.key) {
          addMessageToCurrentChat(currentChat, message);
          setChatLastMessage(currentChat, message);
          setInputText("");
          sendMessage(chatUser._id === currentUser._id ? null : chatUser._id, message, currentChat).then((res) => {
          }).catch((err) => {
            throw new Error(err);
          })
        }
      }
    } catch (err) {
      console.log("Error", err.message)
    }
  }

  const emojiClickHandler = (event) => {
    setInputText((prevState) => prevState + event.emoji);
  }

  const inputTextHandler = (event) => {
    setInputText(event.target.value)
  }

  useOnClickOutside(emojiPickerRef, toggleButtonRef, setShowEmojiPicker, showEmojiPicker);
  return (
    <div className="chatBottom">
      <div className="typeBar">
        <input onKeyDown={messageSendHandler} type="text" onChange={inputTextHandler} required={true} value={inputText} placeholder="Type a message..." />
      </div>
      <div className="emojiSend">
        <UtilityIcons whichUserPage="chatBottom" />
        <img ref={toggleButtonRef} onClick={() => { setShowEmojiPicker() }} className="emoji" src="/emoji.png" alt="emoji.png" />
        <div ref={emojiPickerRef} className="emojiPickerContainer">
          <EmojiPicker open={showEmojiPicker} onEmojiClick={emojiClickHandler} className="emojiPicker" />
        </div>
        <button onClick={messageSendHandler} className="sendButton">Send</button>
      </div>
    </div>
  )
}

export default memo(ChatBottom)