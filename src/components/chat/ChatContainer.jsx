import { useSocketContext } from "../../hooks/useSocketContext";
import useUserStore from "../../lib/stores/user/userStore";
import { useEffect, useRef, useState } from "react"
import Message from "./Message";
import moment from "moment";

export default function ChatContainer() {
  const msgScrollRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const socket = useSocketContext();
  const [isSocketActive, setIsSocketActive] = useState(false);
  const currentUser = useUserStore((state) => state.user);

  const handleMessageSent = (data) => {
    console.log(data);
  }

  useEffect(() => {
    if (msgScrollRef.current) {
      setTimeout(function () {
        msgScrollRef.current?.scrollIntoView({
          behavior: "smooth"
        });
      }, 25);
    }
  }, []);

  useEffect(() => {
    if (socket != null) {
      setIsSocketActive(true);
    }
  }, [socket]);
  useEffect(() => {
  }, [])

  useEffect(() => {
    if (isSocketActive) {
      if (currentUser !== null) {
        socket.on("message-sent", handleMessageSent)
      }
    }
    else return;
    return () => {
      socket.off("message-sent", handleMessageSent);
    }
  }, [socket, isSocketActive]);

  useEffect(() => {
    setChatMessages([
      {
        styleClass: "theirs",
        user: currentUser,
        text: "Hey from user1",
        messageTime: moment().startOf('hour').fromNow(),
        media: ""
      },
      {
        styleClass: "ours",
        user: {
          ...currentUser,
          _id: 2
        },
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto blanditiis maxime eius sequi, reprehenderit soluta illum officia pariatur nisi, sunt exercitationem dignissimos error. Maiores exercitationem temporibus, mollitia nam voluptatem dolorem!",
        messageTime: moment().startOf('day').fromNow(),
        media: ""
      },
    ])
  }, []);

  return (
    <div className="chatContainer">
      {chatMessages.map((message) => {
        return (<Message key={message.user._id} message={message}/>)
      })}
      <div ref={msgScrollRef} className="scroll"></div>
    </div>
  )
}
