 
import { useUserStore } from "../../lib/stores/user/userStore"
import UserInfo from "../shared//UserInfo"
export default function ChatTop() {
  return (
    //useStore user is dummy value, will be added when chatStore will be developed
    <div className="chatTop">
        <UserInfo whichUserPage={"chatTop"} user={useUserStore.getState().user}/> 
    </div>
  )
}
