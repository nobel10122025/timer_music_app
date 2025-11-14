import React, { useRef, useState, useEffect } from "react";
import music1 from '../assets/sounds/sound1.mp3';
import music2 from '../assets/sounds/sound2.mp3';
import './style.css'

const AUDIO_URLS = [music1, music2];

const INTERVAL = 3 * 60 * 1000; // 3 minutes in milliseconds

const AlternatingMusicTimer = () => {
    const audioRefs = [useRef(null), useRef(null)];
    const [isRunning, setIsRunning] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(0);
    console.log("current audio", currentAudio)

    useEffect(() => {
        let timerId;
        if (isRunning) {
            audioRefs[currentAudio].current.play();
            timerId = setInterval(() => {
                audioRefs[currentAudio].current.pause();
                audioRefs[currentAudio].current.currentTime = 0;
                const nextAudio = (currentAudio + 1) % 2;
                setCurrentAudio(nextAudio);
            }, INTERVAL);
        } else {
            audioRefs[0] && audioRefs[0].current && audioRefs[0].current.pause();
            audioRefs[1] && audioRefs[1].current && audioRefs[1].current.pause();
            audioRefs[0].current.currentTime = 0;
            audioRefs[1].current.currentTime = 0;
        }
        return () => {
            clearInterval(timerId);
            audioRefs[0] && audioRefs[0].current && audioRefs[0].current.pause();
            audioRefs[1] && audioRefs[1].current && audioRefs[1].current.pause();
        };
    }, [isRunning, currentAudio]);

    useEffect(() => {
        if (isRunning) {
            audioRefs[currentAudio].current.play();
        }
    }, [currentAudio, isRunning]);

    return (
        <div className="home">
            <div className="btn-holder">
                <button className="btn" onClick={() => setIsRunning(true)}>Start</button>
                <button className="btn" onClick={() => setIsRunning(false)}>Stop</button>
            </div>
            <audio src={AUDIO_URLS[0]} ref={audioRefs[0]} type="audio/mpeg" />
            <audio src={AUDIO_URLS[1]} ref={audioRefs[1]} type="audio/mpeg" />
            <p>Currently playing: {isRunning ? currentAudio === 0 ? "Music 1" : "Music 2": "-"}</p>
        </div>
    );
};

export default AlternatingMusicTimer;
