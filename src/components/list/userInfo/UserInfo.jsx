import UtilityIcons from './UtilityIcons'
import './userInfo.css'
export default function UserInfo({ user }) {
  return (
    <div className={user === "chatTop" ? "userInfoChat" : "userInfoList"}>
      <div className={user === "chatTop" ? "userChat" : "userList"}>
        <img src="/avatar.png"></img>
        <div>
          <>
            {user === "chatTop" ? (
              <>
                <h4>Akinchand</h4>
                <p className="userStatus">Lorem ipsum, dolor sit amet consectetur</p>
              </>
            ) : (
              <h2>Akinchand</h2>
            )}
          </>
        </div>
      </div>
      <UtilityIcons user={user} />
    </div>
  )
}
