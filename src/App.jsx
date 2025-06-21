import { getInitialUserState, getUserValidationState } from "./utils/userUtils";
import { fetchAllUsers, getInitialAppState } from "./utils/appUtils";
import Notification from "./components/notification/Notification";
import useUserStore from "./lib/stores/user/userStore";
import useAppStore from "./lib/stores/app/appStore";
import Detail from "./components/detail/Detail"
import Login from "./components/login/Login";
import { useEffect } from "react";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";

const App = () => {
  const currentUser = useUserStore((state) => state.user);
  const setUsers = useAppStore((state) => state.setUsers);
  useEffect(() => {
    try {
      getUserValidationState().then(status => {
        if (!status) {
          useUserStore.persist.clearStorage();
          useUserStore.setState(getInitialUserState());
          useAppStore.persist.clearStorage();
          useAppStore.setState(getInitialAppState());
        }
      }).catch((error) => {
        throw new Error(error.message);
      });

      fetchAllUsers().then(users => {
        setUsers(users);
      }).catch(error => {
        throw new Error(error.message);
      });
    } catch (error) {
      console.log("Error", error.stack);
    }
  }, [currentUser])

  return (
    <div className="container">
      {currentUser ? (<>
        <List />
        <Chat />
        <Detail />
      </>) : <Login />}
      <Notification />
    </div>
  )
}

export default App;