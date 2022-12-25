import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import '@vonage/video-publisher/video-publisher.js';
import '@vonage/video-subscribers/video-subscribers.js';
import { HiVideoCamera, HiVideoCameraSlash } from "react-icons/hi2"
import { IoIosMicOff, IoIosMic } from "react-icons/io"

// APIキーたちを.env.localから読み込み
const VONAGE_API_KEY = process.env.REACT_APP_VONAGE_API_KEY
const VONAGE_SESSION_ID = process.env.REACT_APP_VONAGE_SESSION_API
const VONAGE_TOKEN = process.env.REACT_APP_VONAGE_TOKEN

const App = () => {
  // 切り替えボタンの表示管理
  const [videoState, setVideoState] = useState(true)
  const [audioState, setAudioState] = useState(true)
  // Web Componentsを参照
  const publisher = useRef(null);
  const subscribers = useRef(null);

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

    // Opentokセッションの初期化
    const session = OT.initSession(VONAGE_API_KEY, VONAGE_SESSION_ID);

    // Web Componentsのセッションとトークンの設定
    publisher.current.session = session;
    publisher.current.token = VONAGE_TOKEN;
    subscribers.current.session = session;
    subscribers.current.token = VONAGE_TOKEN;
  });

  return (
    <div className="App">
      <section className="App-section-subscribers">
        <video-subscribers width="37.5vw" height="37.5svh" ref={subscribers} />
      </section>
      <section class="App-section-publisher">
        <video-publisher width="20vw" height="15svh" ref={publisher} />
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
  );
}

export default App;