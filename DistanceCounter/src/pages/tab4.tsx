import React from 'react';
import {IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
  IonItem,
  IonButton,} from '@ionic/react';
  import { Geolocation } from '@capacitor/geolocation';

  import { GoogleMap } from '@capacitor/google-maps';

  import { useState, useEffect } from 'react';

  export const Chronometer = () => {
    const [time, setTime] = useState({
      seconds: 0,
      minutes: 0,
      hours: 0,
    });
  
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
      function stopTimeCounter(){
        isCancelled=true;
      }
      };
      advanceTime();
  
      return () => {
        //final time:
        console.log(time);
        isCancelled = true;
      };
    }, [time]);
  
    return (
      <div>
        <p>
          {`
            ${time.hours < 10 ? '0' + time.hours : time.hours} :
            ${time.minutes < 10 ? '0' + time.minutes : time.minutes} :
            ${time.seconds < 10 ? '0' + time.seconds : time.seconds}
          `}
        </p>
      </div>
    );
  };
