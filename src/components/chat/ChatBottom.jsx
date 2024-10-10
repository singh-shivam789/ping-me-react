 

export default function ChatBottom() {
  return (
    <div className="chatBottom">
      <div className="icons"></div>
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
