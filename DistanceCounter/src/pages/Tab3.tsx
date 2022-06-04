// Calculate Distance Between Two Locations in React Native App
// https://aboutreact.com/react-native-calculate-distance-between-two-locations/

// import React in our code
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
  import { useState } from "react";

  import { GoogleMap } from '@capacitor/google-maps';
// import all the components we are going to use
/*
 * 1. getDistance, Calculates the distance between two geo coordinates.
 * 2. getPreciseDistance, Calculates the distance between two geo coordinates.
 *    This method is more accurate then getDistance, especially for long distances
 *    but it is also slower. It is using the Vincenty inverse formula for ellipsoids.
 */
import { getCoordinateKeys, getDistance, getLatitude, getLongitude, getPreciseDistance } from 'geolib';

let longitude  = 0;
let latitude   = 0;

let longitude2 = 0;
let latitude2 = 0;
let dis1 =0;
const App = () => {
  const calculateDistance = () => {
    var dis = getDistance(
      { latitude: longitude, longitude: latitude },
      { latitude: longitude2, longitude: latitude2 }
    );
    console.log(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
    dis1 = dis;
    console.log(dis);
    LazyMan();
  };
  function Coordinates() {
    const [coordinates, setCoordinates] = useState("");
    
  }
  return (
    <IonPage>
  
          <IonTitle>
            Example to Calculate Distance
             Between Two Locations
          </IonTitle>
          <IonItem>
            <h1>
            Has recorrido {dis1} metros
            </h1>
          </IonItem>
          <IonButton onClick={CurrentPosition}>
          Start</IonButton>
          <IonButton onClick={CurrentPosition2}>
          FInish
          </IonButton>
          <IonButton onClick={calculateDistance}>
          Calculate the result
          </IonButton>
          <IonButton onClick={ClearData}>
            Clear the datas
          </IonButton>

          
    </IonPage>
  );
};

const CurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  console.log('Current position:', coordinates.coords.latitude,coordinates.coords.longitude);
  longitude = coordinates.coords.longitude;
  latitude = coordinates.coords.latitude;
};

const CurrentPosition2 = async () => {
  const coordinates2 = await Geolocation.getCurrentPosition();
  console.log('Current position:', coordinates2.coords.latitude,coordinates2.coords.longitude);
  longitude2 = coordinates2.coords.longitude;
  latitude2 = coordinates2.coords.latitude;
  //console.log(coordinates2);
  
};
const ClearData = async () =>{
  longitude=0;
  latitude=0;
  longitude2=0;
  latitude2=0;
  console.log("Data cleared");
}
const LazyMan = () =>{
  
  {dis1===0 ? console.log("you didn't moved"):console.log("you moved a lot")};
}


//http://localhost:8100/tab3
export{longitude,latitude,CurrentPosition};
export default App;
