import { FC, useEffect } from "react";
import styles from "./City.module.css";
import ButtonBack from "./ButtonBack";
import { formatDate } from "../helper-functions";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/cities";

const City:FC = () =>{
  const {getCity, currentCity} = useCities()
  const {id} = useParams()

  // const currentCity = cities !== null ? cities.find(city=>city.id == id) : null
  
  // const city = cities !== null ? cities.find(city=>city.id == id) : null
  useEffect(()=>{
    getCity(id)
  },[id])


  //  useEffect(()=>{
  //   setCurrentCity(city)
  //  },[id, setCurrentCity])

  const {cityName, emoji, date, notes} = currentCity ? currentCity : {cityName:"", emoji:"", date:new Date(), notes:""}

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
