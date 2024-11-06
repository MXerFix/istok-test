import AudioWave from "@/shared/svg/AudioWave"
import { HeadphonesIcon } from "lucide-react"
import { useRef, useState } from "react"

type Props = {
  src: string
  disablePause?: boolean
}

const AudioPlayer = ({
  src,
  disablePause = false, // Ограничение на возможность паузы
}: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        if (!disablePause) {
          audioRef.current.pause()
          setIsPlaying(false)
        }
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleEnd = () => {
    setIsPlaying(false)
  }

  return (
    <div className='flex items-center justify-center p-1 bg-background w-max rounded-full relative'>
      <audio
        ref={audioRef}
        src={src}
        onEnded={handleEnd}
        preload='metadata'
      />
      <p className='font-semibold text-2xl pl-4 pr-2 '>
        {isPlaying ? "Listening..." : "Listen to Audio"}
      </p>
      <button
        className={`flex items-center justify-center size-12 rounded-full bg-primary-green hover:bg-primary-green-dark font-medium transition`}
        onClick={togglePlay}>
        {isPlaying ? <AudioWave /> : <HeadphonesIcon strokeWidth={2.5} />}
      </button>
      {disablePause && (
        <span className="absolute -bottom-1 left-4 translate-y-full font-semibold text-sm">
          *Pausing is not allowed
        </span>
      )}
    </div>
  )
}

export default AudioPlayer
