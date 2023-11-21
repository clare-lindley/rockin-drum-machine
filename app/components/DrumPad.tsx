import { DrumProps } from "../types"

export default function DrumPad(props: DrumProps) {

    const { drum, onDrumClick } = props
  
    return (
      <div 
      className="drum-pad"
      onClick={(event: React.UIEvent<HTMLDivElement>) => onDrumClick()}
      >
        {drum.key}
        <audio className="clip" id={drum.key} src={drum.audioFileUrl}></audio>
      </div>
    )
  }