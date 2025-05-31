import { useContext } from 'react';
import { SocketContext } from '../components/socket/SocketContext';

export const useSocketContext = () => {
  const socket = useContext(SocketContext);
  return socket;
};