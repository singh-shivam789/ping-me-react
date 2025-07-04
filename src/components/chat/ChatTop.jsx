 
import useChatStore from "../../lib/stores/user/chatStore";
import useAppStore from "../../lib/stores/app/appStore";
import UserInfo from "../shared//UserInfo"

export default function ChatTop() {
  const chatUser = useChatStore((state) => state.chatUser);
  const setIsDetailViewVisible = useAppStore((state) => state.setIsDetailViewVisible);
  return (
    <div onClick={() => setIsDetailViewVisible()} className="chatTop">
        <UserInfo whichUserPage={"chatTop"} user={chatUser}/> 
    </div>
  )
}
