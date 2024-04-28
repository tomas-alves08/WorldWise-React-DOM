import { FC, useEffect, useState } from "react";
import styles from "./Map.module.css"
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { LatLngTuple} from "leaflet";
// import L from "leaflet";
// import positionIcon from "../../public/icons8-position-50.png"
import { useCities } from "../contexts/cities";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

const Map:FC = ()=>{
    const {cities} = useCities()
    const [mapPosition, setMapPosition] = useState<LatLngTuple>([40,0])
    const {position: geolocationPosition, isLoading: isLoadingPosition, getPosition} = useGeolocation()
    
    const [mapLat, mapLng] = useUrlPosition()
    // const [searchParams] = useSearchParams()
    // const mapLat = Number(searchParams.get("lat"))
    // const mapLng = Number(searchParams.get("lng"))

    // console.log("MAP", mapLat, mapLng)
    
    useEffect(()=>{
        if(mapLat && mapLng) setMapPosition([mapLat || 40.46635901755316, mapLng ||-3.7133789062500004])
    },[mapLat, mapLng])

    useEffect(()=>{
        if (geolocationPosition) {
            const { lat, lng } = geolocationPosition;
            setMapPosition([lat, lng]);
        }
    }, [geolocationPosition])

    return (
        <div className={styles.mapContainer}>
           {!geolocationPosition && <Button type="position" onClick={getPosition}>{isLoadingPosition ? "Loading...": "Use your position"}</Button>}
         <MapContainer center={mapLat !==0 && mapLng !== 0 ? [mapLat, mapLng] : mapPosition} zoom={5} scrollWheelZoom={true}  className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities && cities.map(city=>(
        <Marker position={city.position} key={city.id}>
          <Popup>
            <span>{city.emoji}</span><span>{city.cityName}</span>
          </Popup>
        </Marker>))}
      <ChangeCenter position={[mapLat || mapPosition[0], mapLng || mapPosition[1]]} />
      <DetectClick />
      </MapContainer>

        </div>
    ) 
}

interface ChangeCenterProps{
    position:LatLngTuple
}

const ChangeCenter:FC<ChangeCenterProps> = ({position}) =>{
    const map = useMap()
    map.setView(position)
    return null
}

const DetectClick:FC = () =>{
    const navigate = useNavigate()
    // const [searchParams, setSearchParams] = useSearchParams()
    useMapEvents({
        click: (e) =>{
            const { lat, lng } = e.latlng;
            // setSearchParams([lat, lng])
            navigate(`form?lat=${lat}&lng=${lng}`)
        } 
    })
    return null
} 

export default Map
