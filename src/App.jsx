import Notification from "./components/notification/Notification";
import Loading from "./components/common/Loading";
import Detail from "./components/detail/Detail"
import Login from "./components/login/Login";
import List from "./components/list/List"
import Chat from "./components/chat/Chat"
import { useEffect, useState } from "react";
import { getUserValidationState } from "./utils/userUtils";
import { useUserStore } from "./lib/stores/user/userStore";

const App = () => {
  const currentUser = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  useEffect(() => {
    try {
      const isCurrentUserValidated = getUserValidationState();
      if (!isCurrentUserValidated) {
        useUserStore.setState({ user: null, isLoading: false });
      }
      else{
        console.log(currentUser)
      }
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