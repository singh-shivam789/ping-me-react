
import ChatBottom from "./ChatBottom"
import ChatContainer from "./ChatContainer"
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
