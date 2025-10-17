"use client";

import Image from "next/image";
import players from "../data/players.json"
import { Card } from "@/components/ui/card";
import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

type Player = {
  naam: string;
  rugnummer: number;
  audio: string
  // add other fields if they exist in your JSON
};

export default function Home() {



const playersAsc: Player[] = [...players].sort(
    (a, b) => a.rugnummer - b.rugnummer
  );

    const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const togglePlay = (index: number, audioFile: string) => {
   
    let audio = audioRefs.current[index];
    if (!audio) {
      audio = new Audio(`/audios/${audioFile}.mp3`);
      audioRefs.current[index] = audio;
    }

    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
    } else {
      // Pause any other playing audio
      if (playingIndex !== null) {
        audioRefs.current[playingIndex]?.pause();
      }
      audio.play();
      setPlayingIndex(index);
    }
  };

  return(
 <>


<Card
    key={100}
    className="p-4 m-2 shadow-md bg-white text-black my-5"
  >
    {/* Left side (name + play icon) */}
             <div className="flex flex-col items-start gap-4">
            <span className="font-semibold text-2xl">FUCKERS PALACE</span>
            {playingIndex === 100 ? (
              <Pause
                className="w-10 h-10 cursor-pointer hover:text-red-500 transition"
                onClick={() => togglePlay(100, "palace")}
              />
            ) : (
              <Play
                className="w-10 h-10 cursor-pointer hover:text-green-400 transition"
                onClick={() => togglePlay(100, "palace")}
              />
            )}
          </div>

    {/* <h2 className="font-bold text-8xl text-right">{player.rugnummer}</h2> */}
  </Card>

      {playersAsc.map((player, index) => (
  <Card
    key={index}
    className="p-4 m-2 shadow-md bg-black text-white grid grid-cols-2 items-center my-5"
  >
    {/* Left side (name + play icon) */}
             <div className="flex flex-col items-start gap-4">
            <span className="font-semibold text-2xl">{player.naam}</span>
            {playingIndex === index ? (
              <Pause
                className="w-12 h-12 cursor-pointer hover:text-red-500 transition"
                onClick={() => togglePlay(index, player.audio)}
              />
            ) : (
              <Play
                className="w-12 h-12 cursor-pointer hover:text-green-400 transition"
                onClick={() => togglePlay(index, player.audio)}
              />
            )}
          </div>

    <h2 className="font-bold text-8xl text-right">{player.rugnummer}</h2>
  </Card>
))}

    </>

  )

 
}
