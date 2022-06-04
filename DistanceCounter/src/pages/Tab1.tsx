import { GoogleMap } from '@capacitor/google-maps';
import { useState, useRef, } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { getCoordinateKeys, getDistance, getLatitude, getLongitude, getPreciseDistance } from 'geolib';
import {
  IonContent,
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
  IonButton,
} from '@ionic/react';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
//let longitude  = 0;
//let latitude   = 0;

//let longitude2 = 0;
//let latitude2 = 0;
//let dis1 =0;



const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)

  const [longitude2, setLongitude2] = useState(0)
  const [latitude2, setLatitude2] = useState(0)

  const [distance, finalDistance] = useState(0)
  let newMap: GoogleMap;


  // let longitude = 0;
  //let latitude = 0; 
  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: "AIzaSyCdSNzXyXoWTQzYEucQYPA-Ce700tIiFoU",
      config: {
        center: {
          lat: 39.471951,
          lng: -0.376800,
        },
        zoom: 13
      }

    })
    //const IDW= newMap.enableTrafficLayer([vwaf]);

    {/*const CurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates.coords.latitude,coordinates.coords.longitude);
      //longitude = coordinates.coords.longitude;
      //latitude = coordinates.coords.latitude;
      setLongitude(coordinates.coords.longitude);
      setLatitude(coordinates.coords.latitude);
      await newMap.enableClustering();
    };*/}

    //CurrentPosition();
  };
  const calculateDistance = () => {
    var dis = getDistance(
      { latitude: longitude, longitude: latitude },
      { latitude: longitude2, longitude: latitude2 }
    );
    //console.log(dis);
    finalDistance(dis);
    console.log(`Distance\n\n${distance} Meter\nOR\n${distance / 1000} KM`);
    //console.log(distance);




  };
  const CurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates.coords.latitude, coordinates.coords.longitude);
    //longitude = coordinates.coords.longitude;
    // latitude = coordinates.coords.latitude;
    setLongitude(coordinates.coords.longitude);
    setLatitude(coordinates.coords.latitude);
    const markerId = await newMap.addMarker({
      coordinate: {

        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,

      },
      title:'Has comenzado aquí',
      
    });
  };

  const CurrentPosition2 = async () => {
    const coordinates2 = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates2.coords.latitude, coordinates2.coords.longitude);
    //longitude2 = coordinates2.coords.longitude;
    // latitude2 = coordinates2.coords.latitude;
    setLongitude2(coordinates2.coords.longitude);
    setLatitude2(coordinates2.coords.latitude);


    //console.log(coordinates2);
    const markerId2 = await newMap.addMarker({
      coordinate: {

        lat: coordinates2.coords.latitude,
        lng: coordinates2.coords.longitude,

      },
      title:'Has llegado aquí',
    });

  };
  const ClearData = async () => {
    {/*longitude=0;
    latitude=0;
    longitude2=0;
    latitude2=0;
    */}
    console.log("Data cleared");
    setLatitude(0);
    setLongitude(0);
    setLatitude2(0);
    setLongitude2(0);
    
  }
  return (
    <IonPage>
      <div className='component-wrapper'>
        <h1>Este es tu mapa personalizada</h1>
        <capacitor-google-map ref={mapRef} style={{
          display: 'inline-block',
          width: 400,
          height: 300,
        }}></capacitor-google-map>

        <IonButton color="success" onClick={createMap}>Create Map</IonButton>
        <IonButton color="success" onClick={createMap}>Reload Map</IonButton>
      </div>
      <IonItem>
        <h1>
          Has recorrido {distance} metros
        </h1>
      </IonItem>
      <IonButton color="success" expand="block" onClick={CurrentPosition}>
        Start</IonButton>
      <IonButton color="danger" expand="block" onClick={CurrentPosition2}>
        FInish
      </IonButton>
      <IonButton color="success" expand="block" onClick={calculateDistance}>
        Calculate the result
      </IonButton>
      <IonButton color="success" expand="block" onClick={ClearData}>
        Clear the datas
      </IonButton>


    </IonPage>

  )
}

export default MyMap;