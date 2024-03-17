import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const navigate = useNavigate();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket && socket.on("user:joined", handleUserJoined);
    socket && socket.on("incomming:call", handleIncommingCall);
    socket && socket.on("call:accepted", handleCallAccepted);
    socket && socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket && socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket && socket.off("user:joined", handleUserJoined);
      socket && socket.off("incomming:call", handleIncommingCall);
      socket && socket.off("call:accepted", handleCallAccepted);
      socket && socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket && socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  const handleGoBack = async () => {
    // Disconnect socket connection before navigating back
    if (socket) {
      socket.disconnect();
    }
  
    // Stop tracks and release resources
    if (myStream) {
      const tracks = myStream.getTracks();
      tracks.forEach(track => track.stop());
    }
  
    // Revoke camera and audio permissions
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
  
        mediaStream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
          track.readyState = "ended";
        });
  
        mediaStream.getTracks().forEach(track => track.stop());
      }
    } catch (error) {
      console.error('Error revoking permissions:', error);
    }
  
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 ">
      <h2 className={remoteSocketId ? "mb-8 text-green-500 text-4xl text-center" : "mb-8 text-red-500 text-4xl text-center"}>
        {remoteSocketId ? "Connected" : "No one is ready"}
      </h2>
      <div className="flex justify-center">
      {myStream && (
        <button className="bg-blue-500 mr-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={sendStreams}>
          Share Video
        </button>
      )}
      {remoteSocketId && (
        <button className=" ml-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCallUser}>
          Make a Call
        </button>
      )}
      </div>
      <div className="flex mt-4">
        {myStream && (
          <div className="flex-1 border border-gray-300 rounded">
            <h1 className="text-center text-xl font-bold mb-2">My Stream</h1>
            <ReactPlayer
              playing
              url={myStream}
              className="ReactPlayer"
            />
          </div>
        )}
        {remoteStream && (
          <div className="flex-1 border border-gray-300 rounded">
            <h1 className="text-center text-xl font-bold mb-2">Remote Stream</h1>
            <ReactPlayer
              playing
              url={remoteStream}
              className="ReactPlayer"
            />
          </div>
        )}
      </div>
      <div className="flex justify-center">
  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleGoBack}>
    GO BACK
  </button>
</div>

    </div>
  );
};

export default RoomPage;
