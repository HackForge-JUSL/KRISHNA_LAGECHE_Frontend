import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState(""); // Room state initialized as empty string
  const [copied, setCopied] = useState(false);

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Socket Joined");
      socket && socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket && socket.on("room:join", handleJoinRoom);
    return () => {
      socket && socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(room);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 mt-4 text-blue-500">Welcome to the Lobby</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="room" className="block mb-2">Room Number</label>
          <div className="flex items-center">
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="border border-gray-300 bg-gray-50 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="Room Number"
            />
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={copyToClipboard}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <button
          onClick={handleSubmitForm}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default LobbyScreen;
