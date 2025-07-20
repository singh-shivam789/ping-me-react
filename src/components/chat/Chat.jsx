import ChatContainer from "./ChatContainer"
import ChatBottom from "./ChatBottom"
import ChatTop from "./ChatTop"
import "./chat.css"

export default function Chat() {
  return (
    <div className="chat">
      <ChatTop />
      <ChatContainer />
      <ChatBottom />
    </div>
  )
}
