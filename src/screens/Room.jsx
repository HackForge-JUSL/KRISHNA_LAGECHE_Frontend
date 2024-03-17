import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import { useNavigate} from "react-router-dom";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const navigate=useNavigate();

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

  // const handleGoBack = ()=>{
  //   if (socket) {
  //     socket.disconnect();
  //   }
  //   navigate('/');
  // }

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
    <div>
      <h1>ConnectNow</h1>
      <h2>{remoteSocketId ? "Connected" : "No one is ready"}</h2>
      {myStream && <button  onClick={sendStreams}>Share Video</button>}
      {remoteSocketId && <button  onClick={handleCallUser}>Make a call</button>}
      <>
        <div  style={{ display: 'flex' }}>
          {myStream && (
            <div style={{ flex: 1 }}>
              <h1>My Stream</h1>
              <ReactPlayer
                playing
                muted
                url={myStream}
                className="ReactPlayer"
              />
            </div>
          )}
          {remoteStream && (
            <div style={{ flex: 1 }}>
              <h1>Remote Stream</h1>
              <ReactPlayer
                playing
                muted
                url={remoteStream}
                className="ReactPlayer"
              />
            </div>
          )}
        </div>
      </>
      <button onClick={handleGoBack}>
        GO BACK
      </button>
    </div>
  );
};

export default RoomPage;