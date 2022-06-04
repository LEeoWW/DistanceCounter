import { useTimer } from "./hooks/useTimer";
import { Chronometer } from "./tab4.js";
import { useState,useEffect } from "react";

export const App1 = () => {
  const { pause, reset, running, seconds, start, stop } = useTimer();


 
    const [time, setTime] = useState({
      seconds:seconds,
      minutes: 0,
      hours: 0,
    });
  {
    useEffect(() => {
      let isCancelled = false;
  
      const advanceTime = () => {
        setTimeout(() => {
          let nSeconds = time.seconds;
          let nMinutes = time.minutes;
          let nHours = time.hours;
  
          nSeconds++;
  
          if (nSeconds > 59) {
            nMinutes++;
            nSeconds = 0;
          }
          if (nMinutes > 59) {
            nHours++;
            nMinutes = 0;
          }
          if (nHours > 24) {
            nHours = 0;
          }
  
          !isCancelled && setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
        }, 1000);
    
      };
      advanceTime();
  
      return () => {
        //final time:
        console.log(time);
        isCancelled = true;
      };
    }, [time]);
  }
    return (
      <div>
        <p>
          {`
            ${time.hours < 10 ? '0' + time.hours : time.hours} :
            ${time.minutes < 10 ? '0' + time.minutes : time.minutes} :
            ${seconds < 10 ? '0' + seconds : seconds}
          `}
        </p>
        <div className="App">
      {/*<h1>{seconds}</h1>*/}
      <button onClick={running ? pause : start}>Start/Pause</button>
      <button onClick={reset}>Reset</button>
      <button onClick={stop}>Stop</button>
    </div>
      </div>
      
    );
  };

 
  
  

