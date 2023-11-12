/**
 * Media Recorder copied from here:https://blog.logrocket.com/how-to-create-video-audio-recorder-react/#mediarecorder-api
 */

import { useState, useRef } from "react";

const mimeType = "audio/webm"

type RecordingStatus = 'recording' | 'inactive' | 'paused'

const AudioRecorder = () => {
    const [permission, setPermission] = useState<boolean>(false)
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>("inactive")
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [audioChunks, setAudioChunks] = useState<Blob[] | []>([])
    const [audio, setAudio] = useState<string | null>(null)

    const startRecording = async () => {
        setRecordingStatus("recording")
        //create new Media recorder instance using the stream
        if(stream){
            const media = new MediaRecorder(stream, { mimeType })
            //set the MediaRecorder instance to the mediaRecorder ref
            if(mediaRecorder){
                mediaRecorder.current = media
                //invokes the start method to start the recording process
                mediaRecorder.current.start()
                let localAudioChunks: Blob[] = []
                mediaRecorder.current.ondataavailable = (event) => {
                   if (typeof event.data === "undefined") return
                   if (event.data.size === 0) return
                   localAudioChunks.push(event.data)
                };
                setAudioChunks(localAudioChunks)
            }

        }

    }

    const stopRecording = () => {
        setRecordingStatus("inactive")
        if(mediaRecorder && mediaRecorder.current){
            //stops the recording instance
            mediaRecorder.current.stop()
            mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType })
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl)
            setAudioChunks([])
            }
        }
    }

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData: MediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err: any) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };
    return (
        <div className="audio-recorder">
            <h2>Audio Recorder</h2>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                    <button onClick={getMicrophonePermission} type="button">
                        Get Microphone
                    </button>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                    <button onClick={startRecording} type="button">
                        Start Recording
                    </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                    <button onClick={stopRecording} type="button">
                        Stop Recording
                    </button>
                    ) : null}
                </div>
                {audio ? (
                <div className="audio-player">
                    <audio src={audio} controls></audio>
                    <a download href={audio}>
                        Download Recording
                    </a>
                </div>
                ) : null}
            </main>
        </div>
    );
};
export default AudioRecorder;