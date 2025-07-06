import { useState } from "react"
import { createPortal } from "react-dom";

export default function FriendOptions() {

  const [zoomedViewUrl, setZoomedViewUrl] = useState(null);
  const [mediaExpanded, setMediaExpanded] = useState(false);
  const [clearChatToggle, setClearChatToggle] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const [zoomedViewToggle, setZoomedViewToggle] = useState(false);

  const clearChatOptionDisplay = clearChatToggle ? "none" : "block";
  const mediaMaxHeight = mediaExpanded ? "500px" : "0";
  const settingsMaxHeight = settingsExpanded ? "500px" : "0";

  const imageZoomedViewHandler = () => {
    setZoomedViewToggle((prev) => !prev);
    setZoomedViewUrl("/test.png");
  }

  const clearUserChatHandler = () => {

  }

  return (
    <div className="options">
      <div className="option">
        <div className="optionHeader">
          <h3>Settings</h3>
          <div onClick={() => {
            setSettingsExpanded((prev) => !prev);
          }} className="expandBtn">
            <img src={settingsExpanded ? `/arrowUp.png` : `arrowDown.png`} />
          </div>
        </div>
        <div style={{ maxHeight: settingsMaxHeight }} className="optionForm">
          <div className="optionFormSection">
            <div className="optionFormSectionHeaderForm">
              <button type="button" style={{ display: clearChatOptionDisplay }} className="optionFormBtn" onClick={() => { setClearChatToggle((prev) => !prev) }}>Clear Chat</button>
              {clearChatToggle && <div className="confirmOptionChoice">
                <p>Are you sure?</p>
                <div>
                  <button className="optionFormBtn formSubmitBtn" onClick={clearUserChatHandler}>Yes</button>
                  <div onClick={() => { setClearChatToggle((prev) => !prev) }} className="expandBtn">
                    <img src="/arrowLeft.png" />
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }} className="option">
        <div className="optionHeader">
          <h3>Media</h3>
          <div onClick={() => {
            setMediaExpanded((prev) => !prev);
          }} className="expandBtn">
            <img src={mediaExpanded ? `/arrowUp.png` : `arrowDown.png`} alt="arrowUp.png" />
          </div>
        </div>
        <div style={{ maxHeight: mediaMaxHeight }} className="mediaContainer">
          {/* TODO: After image uploads, get all the messages with media, and build a gallary using those images */}
          {/* sample render for ui */}
          <img onClick={imageZoomedViewHandler} src="/test.png" />
          <img onClick={imageZoomedViewHandler} src="/test.png" />
          <img onClick={imageZoomedViewHandler} src="/test.png" />

        </div>
        {zoomedViewToggle &&
          createPortal(
            <div className="zoomedView" onClick={() => { setZoomedViewToggle((prev) => !prev) }}>
              <img src={zoomedViewUrl} />
              {createPortal(<div className="zoomedViewUserInfoContainer">
                <div className="zoomedViewUserInfo">
                  <img src="/avatar.png" />
                  <div className="zoomedViewUserInfoDetails">
                    <h3 style={{ marginBottom: "5px" }}>You</h3>
                    <p>Yesterday at 5:30 pm</p>
                  </div>
                </div>
              </div>, document.body)}
            </div>,
            document.body
          )}
      </div>
    </div >
  )
}
