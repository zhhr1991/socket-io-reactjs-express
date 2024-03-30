import { useState, useEffect } from 'react'
import './App.css'
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {

  const [chanel,setchanel] = useState("");

  const [message,setMessage] = useState("");

  const [messageReceived,setMessageReceived] = useState("");
  
  // join chanel
  const joinChanel = () => {
    if (chanel !== "") {
      socket.emit("join_chanel", chanel);
    }
  };

  // send message
  const sendMessage = () => {
    socket.emit("send_message", {message, chanel});
  }

  //receive message
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);


  return (
    <div className='App'>
      <input style={{margin: "10px", padding:"5px"}}
       placeholder='chanel number'
       onChange={(e) => {
        setchanel(e.target.value);
       }}
      />
      <button onClick={joinChanel}>Join Chanel</button>
      <input style={{margin: "10px", padding:"5px"}}
       placeholder='Message...'
       onChange={(e) => {
        setMessage(e.target.value);
       }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      <p>{messageReceived}</p>
    </div>
  )
}

export default App
