import Notification from "./components/notification/Notification";
import Loading from "./components/shared/Loading";
import Detail from "./components/detail/Detail"
import Login from "./components/login/Login";
import List from "./components/list/List"
import Chat from "./components/chat/Chat"
import { useEffect, useState } from "react";
import { getInitialUserState, getUserValidationState } from "./utils/userUtils";
import { useUserStore } from "./lib/stores/user/userStore";

const App = () => {
  const currentUser = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  useEffect(() => {
    try {
      getUserValidationState().then(status => {
        if(!status){
          useUserStore.persist.clearStorage();
          useUserStore.setState(getInitialUserState());
        }
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log("Error", error.stack);
    }
  }, [])

  if (isLoading) return (<Loading page={"app"} />)
  else return (
    <div className="container">
      {currentUser ? (<>
        <List />
        <Chat />
        <Detail />
      </>) : (<Login />)}
      <Notification />
    </div>
  )
}

export default App;