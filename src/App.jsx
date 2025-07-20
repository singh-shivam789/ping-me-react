import { getInitialUserState, getUserValidationState } from "./utils/userUtils";
import Notification from "./components/notification/Notification";
import UserOnboarding from "./components/login/UserOnboarding";
import useUserStore from "./lib/stores/user/userStore";
import useAppStore from "./lib/stores/app/appStore";
import Detail from "./components/detail/Detail"
import Login from "./components/login/Login";
import { useEffect } from "react";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";

const App = () => {
  const currentUser = useUserStore((state) => state.user);
  const isNewUser = useUserStore((state) => state.isNewUser);
  const setIsNewUser = useUserStore((state) => state.setIsNewUser);
  
  useEffect(() => {
    try {
      getUserValidationState().then(status => {
        if (!status) {
          useUserStore.persist.clearStorage();
          useUserStore.setState(getInitialUserState());
          useAppStore.persist.clearStorage();
          setIsNewUser(false);
        }
      }).catch((error) => {
        throw new Error(error.message);
      });
    } catch (error) {
      console.log("Error", error.stack);
    }
  }, [currentUser, isNewUser])

  return (
    <div className="container">
      {(currentUser && !isNewUser) ? (<>
        <List />
        <Chat />
        <Detail />
      </>) : (currentUser && isNewUser) ? <UserOnboarding /> : <Login />}
      <Notification />
    </div>
  )
}

export default App;