import { useRef, useState } from "react";

export type MediaRecorderHookProps = {
    onStop: (blobUrl: string) => void;
};

const mimeType = "audio/webm"

type RecordingStatus = 'recording' | 'inactive' | 'paused'


    /**
     * Next steps to make this work in my app
     * 
     * 1. change the status so it has 'recording' and 'stopped'
     * 2. make on stop call BLOB as well as blob url
     * 3. in the background (on page load/mount?) INSIDE USE EFFECT? capture mic permission
     * we don't want to make the user click a button
     * 
     * 
     */

const useMediaRecorder = (props: MediaRecorderHookProps) => {
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
                // call the consumer's event handler so it can do what it wants with the audio
                props.onStop(audioUrl)
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

  return {stopRecording, startRecording, getMicrophonePermission, recordingStatus};
};

export default useMediaRecorder;
