import { getInitialUserState, logoutUser } from "../../utils/userUtils";
import useUserStore from "../../lib/stores/user/userStore";
import { getInitialAppState } from "../../utils/appUtils";
import useAppStore from "../../lib/stores/app/appStore";
import UserInfo from "../shared//UserInfo";
import Options from "./options/Options";
import { toast } from "react-toastify";
import "./detail.css";

export default function Detail() {
  const handleLogOut = async (e) => {
    try {
      await logoutUser();
      useUserStore.persist.clearStorage();
      useUserStore.setState(getInitialUserState());
      useAppStore.persist.clearStorage();
      useAppStore.setState(getInitialAppState());
      toast.dark("Bye!");
    }
    catch (err) {
      console.log("Error", err.message);
      toast.error("Something went wrong!");
    }
  }
  return (
    <div className="detail">
      {    
        //useStore user is dummy value, will be added when chatStore will be developed
      }
      <UserInfo whichUserPage={"userDetail"} user={useUserStore.getState().user} />
      <Options />
      <div className="logoutAndBlock">
        <div className="blockUser">
          <button className="blockUserBtn">Block User</button>
        </div>
        <div className="logout">
          <button onClick={handleLogOut} className="logoutBtn">Logout</button>
        </div>
      </div>
    </div>
  )
}
