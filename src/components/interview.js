import React, { useEffect, useRef, useState } from "react";
import { getQuestions, sendVideoUrl } from "./api.js";
import Header from "./header";

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [recording, setRecording] = useState(false);
  const [finished, setFinished] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const recognitionRef = useRef(null);
  const silenceTimeoutRef = useRef(null);

  useEffect(() => {
    getQuestions().then(setQuestions);
  }, []);

  useEffect(() => {
    if (recording) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new window.MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) recordedChunks.current.push(e.data);
        };
        mediaRecorderRef.current.onstop = handleStop;
        mediaRecorderRef.current.start();
      });
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line
  }, [recording]);

  useEffect(() => {
    if (recording && questions.length && current < questions.length) {
      speakQuestion(questions[current]);
    }
    // eslint-disable-next-line
  }, [current, recording, questions]);

  useEffect(() => {
    if (recording && !speaking && questions.length && current < questions.length) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }
    // eslint-disable-next-line
  }, [speaking, recording, current, questions]);

  const speakQuestion = (text) => {
    if (!window.speechSynthesis) return;
    setSpeaking(true);
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  const handleStop = () => {
    const blob = new Blob(recordedChunks.current, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    sendVideoUrl(url); // Send to API
    setFinished(true);
  };

  const handleStart = () => {
    setRecording(true);
    setCurrent(0);
  };

  const handleNext = async () => {
    stopSpeechRecognition();
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setRecording(false);
      if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    }
  };

  // --- Speech Recognition for auto-next ---
  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    if (recognitionRef.current) return; // Already running

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = () => {
      // Reset silence timer on speech
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = setTimeout(() => {
        handleNext();
      }, 2000
      ); // 2 seconds of silence = move to next
    };

    recognition.onerror = () => { };
    recognition.onend = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;

    // Start silence timer in case user never speaks
    silenceTimeoutRef.current = setTimeout(() => {
      handleNext();
    }, 30000); // 30 seconds max per question
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.onend = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    setListening(false);
  };

  useEffect(() => {
    return () => {
      stopSpeechRecognition();
    };
  }, []);

  if (!questions.length) return <div>Loading questions...</div>;
  if (finished)
    return (
      <div>
        <h2>Interview Finished!</h2>
      </div>
    );

  return (
    <div className="dash-container">
      {/* Hide Header when recording */}
      {!recording && (
        <Header options={[
          { label: "Home", href: "/dashboard" },
          { label: "News", href: " /news" },
          { label: "Mentor", href: "/mentor" },
          { label: "Community", href: "/community" },
          { label: "Reference", href: "/reference" }
        ]} />
      )}
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', position: 'absolute', left: 0, top: 0 }} />
      {/* Hide start button when recording */}
      {!recording ? (
        <div style={{ zIndex: 1000, position: "absolute", top: '30%', alignSelf: 'center', justifyContent: 'center', backgroundColor: "rgba(255,255,255,0.8)", padding: 10, borderRadius: 5 }}>
          <div style={{ textAlign: 'center' }}>
            <h4>AI Interview</h4>
            <p style={{ color: "#888", margin: '0' }}>Make sure your camera and microphone are enabled.</p>
            <p style={{ color: "#888", margin: '0' }}>You will have up to 30 seconds to answer each question.</p>
            <p style={{ color: "#888", margin: '0' }}>The system will automatically move to the next question after 2 seconds of silence.</p>
            <p style={{ color: "#888" }}>Good luck!</p>
            <button onClick={handleStart} style={{ borderRadius: 5, position: 'relative', alignSelf: 'center', backgroundColor: '#ff6f61', padding: '3% 10%', border: 'none', color: 'white' }} id="start-button">Start</button>
          </div>
        </div>
      ) : null}
      {/* Show question box only when recording */}
      {recording && (
        <div style={{ zIndex: 1001, position: "absolute", top: '70%', alignSelf: 'center', justifyContent: 'center', backgroundColor: "rgba(255,255,255,0.8)", padding: 10, borderRadius: 5, width: '30%' }}>
          <h3>Question {current + 1}:</h3>
          <p style={{ color: "#888" }}>
            {speaking ? "Listening..." : questions[current]}
          </p>
          {recording && !speaking && (
            <p style={{ color: listening ? "#388e3c" : "#888" }}>
              {listening ? "Listening for your answer..." : ""}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Interview;