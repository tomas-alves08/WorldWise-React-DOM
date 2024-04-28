import { FC, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/cities";
import { city } from "../schemas.ts";

export function convertToEmoji(countryCode:string) {

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

const Form:FC = () =>{
  const navigate = useNavigate()
  const {createCity, isLoading} = useCities()
  const [lat, lng] = useUrlPosition()

  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("")
  const [error, setError] = useState<string>("")

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false)

useEffect(()=>{
  if(!lat && !lng) return;
  async function fetchCityData(){
    try{
      setIsLoadingGeocoding(true)
      setError("")
      const response = await fetch(`${BASE_URL}/?latitude=${lat}&longitude=${lng}`)
      if(!response.ok) throw new Error("Fetch city data failed")
      const data = await response.json()

      if(!data.countryCode || data.country || data.cityName) throw new Error("That doesn't seem to be a city. Click somewhere else 😆")

      setCountry(data.countryName)
      setCityName(data.city || data.locality || "")
      setEmoji(convertToEmoji(data.countryCode))
    } catch(err:any){
      setError(err.message)
    } finally{
      setIsLoadingGeocoding(false)
    }
  }
  fetchCityData()
},[lat, lng])

const handleSubmit = async (e: React.FormEvent) => {
  console.log("HADNLE SUBMIT!!")
  e.preventDefault()
  if(!cityName || !date) return;

  const newCity:city = {
    cityName,
    country,
    emoji,
    date,
    notes,
    position:{
      lat,
      lng
    },
  }

  await createCity(newCity)
  navigate("/app/cities")
}

if(!lat && !lng) return <Message message="Start by clicking somewhere in the map" />

if(isLoadingGeocoding) return <Spinner />
if(error) return <Message message={error} />
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={(date:Date)=> setDate(date)} selected={date} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button style="primary" onClick={()=>navigate(-1)}>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
