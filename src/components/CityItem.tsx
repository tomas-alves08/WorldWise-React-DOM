import { FC } from "react";
import { cityData } from "../schemas";
import styles from "./CityItem.module.css"
import { formatDate } from "../helper-functions";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/cities";

interface CityItemProps{
    city: cityData
}

const CityItem:FC<CityItemProps> = ({city}) =>{
    const {currentCity, deleteCity} = useCities()
    const {cityName, emoji, date, id , position} = city

    const matchingId = currentCity && currentCity.id === id
    const {lat, lng} = position

    function handleDelete(e:React.FormEvent){
        e.preventDefault()
        deleteCity(id)
    }
    return(
        <li >
            <Link to={`${id}?lat=${lat}&lng=${lng}`} className={`${styles.cityItem} ${matchingId && styles['cityItem--active']}`}>
            <span className={styles.emoji}>{emoji}</span> 
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem