import UtilityIcons from "../list/userInfo/UtilityIcons"
export default function ChatBottom() {
  return (
    <div className="chatBottom">
      <UtilityIcons user="chatBottom"/>
      <div className="typeBar">
        <input type="text" placeholder="Type a message..."/>
      </div>
      <div className="emojiSend">
        <img className="emoji" src="/emoji.png" alt="emoji.png" />
        <button className="sendButton">Send</button>
      </div>
    </div>
  )
}
