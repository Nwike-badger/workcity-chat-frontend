import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (token) => {
  if (!token) {
    console.error("No token provided for Socket.IO connection.");
    return null;
  }
  if (socket && socket.connected) return socket;

  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('Socket.IO connected:', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket.IO disconnected:', reason);
  });

  socket.on('connect_error', (err) => {
    console.error('Socket.IO connection error:', err.message);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket.IO explicitly disconnected.');
  }
};

export const getSocket = () => socket;
