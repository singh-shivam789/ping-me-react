import { useEffect } from "react";
import { auth } from "./lib/firebase";
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Login from "./components/login/Login";
import { onAuthStateChanged } from "firebase/auth";
import Notification from "./components/notification/Notification";
import { useUserStore } from "./lib/userStore";
import Loading from "./components/common/Loading";

const App = () => {
  const { currentUser, isLoading, fetchCurrentUserInfo } = useUserStore();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      fetchCurrentUserInfo(userAuth?.uid)
    })
    return () => { unsubscribe() };
  }, [fetchCurrentUserInfo])

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