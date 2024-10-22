import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "./components/common/Loading";
import Detail from "./components/detail/Detail"
import { useUserStore } from "./lib/userStore";
import Login from "./components/login/Login";
import List from "./components/list/List"
import Chat from "./components/chat/Chat"
import { auth } from "./lib/firebase";
import { useEffect } from "react";

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