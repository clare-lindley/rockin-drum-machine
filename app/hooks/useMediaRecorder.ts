import { useEffect, useRef, useState } from "react";

export type MediaRecorderHookProps = {
    onStop: (audioBlob:Blob, blobUrl: string) => void;
};

const mimeType = "audio/webm"

type RecordingStatus = 'recording' | 'inactive' | 'stopped'

const useMediaRecorder = (props: MediaRecorderHookProps) => {

    const mediaRecorder = useRef<MediaRecorder | null>(null)

    const [permission, setPermission] = useState<boolean>(false)
    const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>("inactive")
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [audioChunks, setAudioChunks] = useState<Blob[] | []>([])

    useEffect(() => {
        
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
        getMicrophonePermission();
      }, []);

    const startRecording = async () => {
        setRecordingStatus("recording")
        if(stream){
            const media = new MediaRecorder(stream)
            if(mediaRecorder){
                mediaRecorder.current = media
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
        setRecordingStatus("stopped")
        if(mediaRecorder && mediaRecorder.current){
                mediaRecorder.current.stop()
                mediaRecorder.current.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: mimeType })
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioChunks([])
                    // call the consumer's event handler so it can do what it wants with the audio
                    props.onStop(audioBlob, audioUrl)
            }
        }
    }

  return {stopRecording, startRecording, permission, recordingStatus};
};

export default useMediaRecorder;
