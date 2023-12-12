import { useEffect, useState } from "react";
import { DrumProps } from "../types"

export default function DrumPad(props: DrumProps) {
    const { drum, onDrumClick } = props

    const [audioFileUrl, setAudioFileUrl] = useState<string | null>(null);
    useEffect(() => {
      if (typeof window !== 'undefined') { // this is local code for local people, we'll have no trouble here
 
        const url = window.URL.createObjectURL(drum.audioBlob);
        setAudioFileUrl(url);
  
        // Clean up the object URL when the component unmounts
        // i.e. signal to the browser that it can release any resources associated with that URL, such as memory or disk space.
        return () => {
          window.URL.revokeObjectURL(url);
        };
      }
    }, [drum.audioBlob]);
    
  
    return (
      <>
        {audioFileUrl && (
          <div
            className="drum-pad"
            onClick={(event: React.UIEvent<HTMLDivElement>) => onDrumClick()}
          >
            {drum.key}
            <audio className="clip" id={drum.key} src={audioFileUrl}></audio>
          </div>
        )}
      </>
    );
  }