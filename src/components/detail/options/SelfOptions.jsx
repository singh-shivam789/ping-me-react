import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function SelfOptions() {
  const [mediaExpanded, setMediaExpanded] = useState(false);
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [accountExpanded, setAccountExpanded] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const [zoomedViewToggle, setZoomedViewToggle] = useState(false);
  const [zoomedViewUrl, setZoomedViewUrl] = useState(null);

  const [clearChatToggle, setClearChatToggle] = useState(false);
  const [changePasswordToggle, setChangePasswordToggle] = useState(false);
  const [deleteAccountToggle, setDeleteAccountToggle] = useState(false);

  const mediaMaxHeight = mediaExpanded ? "500px" : "0";
  const settingsMaxHeight = settingsExpanded ? "500px" : "0";
  const profileSettingsMaxHeight = profileExpanded ? "500px" : "0";
  const accountSettingsMaxHeight = accountExpanded ? "500px" : "0";
  const accountOptionsDisplay = (changePasswordToggle || clearChatToggle || deleteAccountToggle) ? "none" : "block";

  const profileSettingsFormSubmitHandler = (e) => {
    e.preventDefault();
  }

  const accountSettingsFormSubmitHandler = (e) => {
    e.preventDefault();
  }

  const deleteUserAccountHandler = async () => {
    try {
      useUserStore.persist.clearStorage();
      useUserStore.setState(getInitialUserState());
      await deleteUserAccount(currentUser._id);
      toast.dark("Sorry to see you go 🥺");
    } catch (error) {
      console.log("Error", error.message);
      toast.error("Something went wrong!");
    }
  }

  const changePasswordHandler = () => {

  }

  const clearUserChatHandler = () => {

  }

  const imageZoomedViewHandler = () => {
    setZoomedViewToggle((prev) => !prev);
    setZoomedViewUrl("/test.png");
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
            <div className="optionFormSectionHeader">
              <h4>Profile</h4>
              <div onClick={() => {
                setProfileExpanded((prev) => !prev);
              }} className="expandBtn">
                <img src={profileExpanded ? `/arrowUp.png` : `arrowDown.png`} alt="arrowUp.png" />
              </div>
            </div>
            <form style={{ maxHeight: profileSettingsMaxHeight, alignItems: "flex-start" }} className="optionFormSectionHeaderForm" onSubmit={profileSettingsFormSubmitHandler}>
              <label className="formLabel">Username</label>
              <input className="optionFormInput" type="text"
                name="username"
                required
                minLength={3}
                maxLength={20}
                pattern="^[a-zA-Z0-9_]+$"
                title="Username should be 3-20 characters long and contain only letters, numbers, and underscores." />
              <label className="formLabel">Email</label>
              <input className="optionFormInput" type="text"
                name="email"
                required
                maxLength={50}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address."
              />
              <label className="formLabel">Status</label>
              <input className="optionFormInput" type="text"
                name="status"
                maxLength={50}
                pattern="^[a-zA-Z0-9 _.,!?'-]*$"
                title="Status can contain up to 50 letters, numbers, spaces, and punctuation." />
              <button className="optionFormBtn formSubmitBtn" type="submit">Save Changes</button>
            </form>
          </div>
          <div className="optionFormSection">
            <div className="optionFormSectionHeader">
              <h4>Account</h4>
              <div onClick={() => {
                setAccountExpanded((prev) => !prev);
              }} className="expandBtn">
                <img src={accountExpanded ? `/arrowUp.png` : `/arrowDown.png`} alt="arrowUp.png" />
              </div>
            </div>
            <form style={{ maxHeight: accountSettingsMaxHeight }} className="optionFormSectionHeaderForm" onSubmit={accountSettingsFormSubmitHandler}>
              <button style={{ display: accountOptionsDisplay }} className="optionFormBtn" onClick={() => { setChangePasswordToggle((prev) => !prev) }}>Change Password</button>
              <button style={{ display: accountOptionsDisplay }} className="optionFormBtn" onClick={() => { setClearChatToggle((prev) => !prev) }}>Clear Chat</button>
              <button style={{ display: accountOptionsDisplay }} className="optionFormBtn blockUserBtn" onClick={() => { setDeleteAccountToggle((prev) => !prev) }}>Delete Account</button>
              {deleteAccountToggle && <div className="confirmOptionChoice">
                <p>Are you sure?</p>
                <div>
                  <button className="optionFormBtn formSubmitBtn" onClick={deleteUserAccountHandler}>Yes</button>
                  <div onClick={() => { setDeleteAccountToggle((prev) => !prev) }} className="expandBtn">
                    <img src="/arrowLeft.png" />
                  </div>
                </div>
              </div>}
              {clearChatToggle && <div className="confirmOptionChoice">
                <p>Are you sure?</p>
                <div>
                  <button className="optionFormBtn formSubmitBtn" onClick={clearUserChatHandler}>Yes</button>
                  <div onClick={() => { setClearChatToggle((prev) => !prev) }} className="expandBtn">
                    <img src="/arrowLeft.png" />
                  </div>
                </div>
              </div>}
              {changePasswordToggle && <div>
                <label className="formLabel">Old Password</label>
                <input className="optionFormInput"
                  required={true}
                  type="password"
                  minLength="3"
                  maxLength="15"
                  pattern="^[a-zA-Z0-9_@]+$"
                  title="Password should be 3-15 characters long and contain only letters, numbers, and underscores." />
                <label className="formLabel">New Password</label>
                <input className="optionFormInput"
                  required={true}
                  type="password"
                  minLength="3"
                  maxLength="15"
                  pattern="^[a-zA-Z0-9_@]+$"
                  title="Password should be 3-15 characters long and contain only letters, numbers, and underscores." />
                <div style={{ marginTop: "10px", width: "90%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <button style={{ margin: "0px" }} className="optionFormBtn formSubmitBtn" type="submit">Confirm</button>
                  <div onClick={() => { setChangePasswordToggle((prev) => !prev) }} className="expandBtn">
                    <img src="/arrowLeft.png" />
                  </div>
                </div>
              </div>}
            </form>
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
