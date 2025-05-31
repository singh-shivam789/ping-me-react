import useOnClickOutside from "../../hooks/useOnClickOutside";
import UtilityIcons from "../shared/UtilityIcons"
import { memo, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import useAppStore from "../../lib/stores/app/appStore";

const ChatBottom = () => {
  const emojiPickerRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const showEmojiPicker = useAppStore((state) => state.showEmojiPicker);
  const setShowEmojiPicker = useAppStore((state) => state.setShowEmojiPicker);
  const [inputText, setInputText] = useState("");
  const emojiClickHandler = (event) => {
    setInputText((prevState) => prevState + event.emoji);
  }

  const inputTextHandler = (event) => {
    setInputText(event.target.value)
  }

  useOnClickOutside(emojiPickerRef, toggleButtonRef, setShowEmojiPicker, showEmojiPicker);
  return (
    <div className="chatBottom">
      <UtilityIcons whichUserPage="chatBottom" />
      <div className="typeBar">
        <input type="text" onChange={inputTextHandler} value={inputText} placeholder="Type a message..." />
      </div>
      <div className="emojiSend">
        <img ref={toggleButtonRef} onClick={() => { setShowEmojiPicker() }} className="emoji" src="/emoji.png" alt="emoji.png" />
        <div ref={emojiPickerRef} className="emojiPickerContainer">
          <EmojiPicker open={showEmojiPicker} onEmojiClick={emojiClickHandler} className="emojiPicker" />
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  )
}
export default memo(ChatBottom)