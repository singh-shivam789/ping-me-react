import useAppStore from "../../lib/stores/app/appStore";
import ChatContainer from "./ChatContainer"
import ChatBottom from "./ChatBottom"
import ChatTop from "./ChatTop"
import "./chat.css"

export default function Chat() {
  const isDetailViewVisible = useAppStore((state) => state.isDetailViewVisible);
  return (
    <div className="chat">
      <ChatTop />
      <ChatContainer />
      <ChatBottom />
    </div>
  )
}
