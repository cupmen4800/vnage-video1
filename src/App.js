import React, { useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import '@vonage/video-publisher/video-publisher.js';
import '@vonage/video-subscribers/video-subscribers.js';
import { HiVideoCamera, HiVideoCameraSlash } from "react-icons/hi2"
import { IoIosMicOff, IoIosMic } from "react-icons/io"

function App() {
  const [videoState, setVideoState] = useState(true)
  const [audioState, setAudioState] = useState(true)
  // Get references to Web Components
  const publisher = useRef(null);
  const subscribers = useRef(null);

  // These values normally come from the backend in a production application, but for this demo, they are hardcoded
  const apiKey = process.env.REACT_APP_VONAGE_API_KEY
  const sessionId = process.env.REACT_APP_VONAGE_SESSION_API
  const token = process.env.REACT_APP_VONAGE_TOKEN

  const toggleVideo = () => {
    setVideoState(!videoState)
    publisher.current.toggleVideo();
  };

  const toggleAudio = () => {
    setAudioState(!audioState)
    publisher.current.toggleAudio();
  };

  useEffect(() => {
    const OT = window.OT;

    // Initialize an OpenTok Session object
    const session = OT.initSession(apiKey, sessionId);

    // Set session and token for Web Components
    publisher.current.session = session;
    publisher.current.token = token;
    subscribers.current.session = session;
    subscribers.current.token = token;

  });

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <div className="App-container">
        <section className="App-section-publisher">
          <video-subscribers width="35svh" ref={subscribers}></video-subscribers>
        </section>
        <section class="App-section-subscribers">
          <video-publisher width="20vw" height="15svh" ref={publisher}></video-publisher>
        </section>
        <section className="App-section-tools">
          <button onClick={toggleVideo}>
            {videoState ? <HiVideoCamera /> : <HiVideoCameraSlash />}
          </button>
          <button onClick={toggleAudio}>
            {audioState ? <IoIosMic /> : <IoIosMicOff />}
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
