import { SOCKET_OPTIONS, SOCKET_URL } from "../../utils/appUtils";
import { createContext } from "react";
import useSocket from "../../hooks/useSocket";
import useUserStore from "../../lib/stores/user/userStore";

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    const user = useUserStore((state) => state.user);
    const shouldConnect = user !== null;
    const socket = useSocket(SOCKET_URL, SOCKET_OPTIONS, shouldConnect);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}