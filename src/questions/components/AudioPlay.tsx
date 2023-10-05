import { useEffect, useRef, useState } from "react";
import { useAsync } from "react-use";

const AudioPlay = ({ url, classNameImage, className }: { url: string, classNameImage?: string, className?: string }) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, setPlaying] = useState(false);
  const time_listen = useRef(0);

  useAsync(async () => {
    var audio = await new Audio(url);
    setAudio(audio);
  }, [url]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing && audio) {
        // console.log("AUDIO PLAY");
        time_listen.current += 1;
        if (time_listen.current > Math.floor(audio.duration)) {
          time_listen.current = 0;
          setPlaying(false);
        }
      }
    }, 1000);

    return () => {
      // console.log("DELETE INTERVAL");
      clearInterval(interval);
      if (audio && playing) {
        audio.pause();
      }
    };
  }, [audio, playing]);

  const togglePlay = () => {
    if (audio) {
      if (!playing) {
        audio?.play();
        setPlaying(true);
      } else {
        audio?.pause();
        setPlaying(false);
      }
    }
  };

  return (
    <div className={`${className}  cursor-pointer`}>
      <span onClick={() => togglePlay()} className="">
        {/* {playing ? <IoMdPause /> : <FaPlay />} */}
        {playing ? (
          <img className={`w-7 h-7 ${classNameImage}`} src="/listening.png" />
        ) : (
          <img className={`w-7 h-7 ${classNameImage}`} src="/pause.png" />
        )}
      </span>
    </div>
  );
};

export default AudioPlay;
