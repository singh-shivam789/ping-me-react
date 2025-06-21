 
import useChatStore from "../../lib/stores/user/chatStore";
import UserInfo from "../shared//UserInfo"

export default function ChatTop() {
  const chatUser = useChatStore((state) => state.chatUser);

  return (
    <div className="chatTop">
        <UserInfo whichUserPage={"chatTop"} user={chatUser}/> 
    </div>
  )
}
