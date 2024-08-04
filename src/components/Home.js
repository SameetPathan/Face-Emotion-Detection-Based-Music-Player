import React, { useState, useRef, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';

const Dashboard = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [showLiveFeed, setShowLiveFeed] = useState(false);
  const videoRef = useRef(null);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
      console.log('Camera permission granted and stream set.');
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
    }
  };

  useEffect(() => {
    if (showLiveFeed && videoRef.current) {
      videoRef.current.play();
      console.log('Live feed started.');
    }
  }, [showLiveFeed,hasPermission]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to the Emotion Detection Dashboard</h1>
      <div className="info-box">
        <FaCamera size={50} />
        <p>
          We will use your camera to capture a live feed and detect your emotions. 
          Please grant camera permissions to proceed.
        </p>
      </div>
      {!hasPermission ? (
        <div className="permission-buttons">
          <button className="btn btn-success" onClick={requestCameraPermission}>
            Yes, I Allow
          </button>
          <button className="btn btn-danger" onClick={() => setHasPermission(false)}>
            No, I Don't Allow
          </button>
        </div>
      ) : (
        <div className="start-button">
          <button className="btn btn-primary" onClick={() => setShowLiveFeed(true)}>
            Start Live Feed
          </button>
        </div>
      )}
      {hasPermission && showLiveFeed && (
        <div className="live-feed">
          <video ref={videoRef} className="video-feed" autoPlay playsInline></video>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
