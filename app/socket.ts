import { io } from "socket.io-client";

export const socket = io('https://aries-socket.onrender.com/', {
    autoConnect: true,
    reconnectionAttempts: 5,
    reconnection: true
});
