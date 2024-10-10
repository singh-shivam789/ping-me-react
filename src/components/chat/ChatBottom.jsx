import { useState } from "react";
import UtilityIcons from "../list/userInfo/UtilityIcons"
import EmojiPicker from "emoji-picker-react";
export default function ChatBottom() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputText, setInputText] = useState("")
  const emojiClickHandler = (event) => {
    setInputText((prevState) => prevState + event.emoji);
  }

  const inputTextHandler = (event) => {
    setInputText(event.target.value)
  }

  return (
    <div className="chatBottom">
      <UtilityIcons user="chatBottom" />
      <div className="typeBar">
        <input type="text" onChange={inputTextHandler} value={inputText} placeholder="Type a message..." />
      </div>
      <div className="emojiSend">
        <img onClick={() => { setShowEmojiPicker(prevState => !prevState) }} className="emoji" src="/emoji.png" alt="emoji.png" />
        <div className="emojiPickerContainer">
          <EmojiPicker open={showEmojiPicker} onEmojiClick={emojiClickHandler} className="emojiPicker" />
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  )
}
