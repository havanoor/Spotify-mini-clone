import React,{useState,createContext} from 'react';




export const SongContext=createContext()







export const SongProvider =(props)=>{
    const [artistName, setartistName] = useState("Artist Name");
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(0);
  const [image, setImage] = useState("Image");
  const [playing, setPlaying] = useState(false);
  const [deviceId, setdeviceId] = useState("");
  const [trackName, settrackName] = useState("Track Name");





  return(

    <SongContext.Provider  value= {{artist:[artistName,setartistName],
                            dura:[duration, setDuration] ,
                            pos:[position, setPosition] ,
                            vol:[volume, setVolume],
                            imag:[image, setImage],
                            play:[playing, setPlaying],
                            device:[deviceId, setdeviceId],
                            track:[trackName, settrackName] }}                        
                            
                            >
        {props.children}
    </SongContext.Provider>
  )

}