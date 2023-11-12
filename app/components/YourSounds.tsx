import { Sound } from "../types"

interface YourSoundsProps {
    allSounds: Sound[],
  }


export default function YourSounds(props: YourSoundsProps){

    const {allSounds} = props

    return (
        <div className="your-sounds">
            <p>Your sounds:</p>
            <ul>
            {allSounds.map((sound) => (
            <li key={sound.sound.blobUrl}>
                    {sound.name}
                    <audio controls>
                    <source src={sound.sound.blobUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                    </audio>
                    </li>
            ))}
            </ul>
            </div>
    )
}



