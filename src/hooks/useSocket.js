import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket(serverUrl, options, shouldConnect) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if(!shouldConnect) return;
    try {
      const newSocket = io(serverUrl, {
        ...options,
        autoConnect: shouldConnect
      });

      newSocket.connect();
      setSocket(newSocket);
      return () => {
        newSocket.disconnect()
      };
    } catch (error) {
      console.log("Error", error)
    }
  }, [serverUrl, shouldConnect]);

  return socket;
}
