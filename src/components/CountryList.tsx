import { FC } from "react";
import styles from "./CountryList.module.css"
import { cityData } from "../schemas";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/cities";

const CountryList:FC = () =>{
    const {cities, isLoading} = useCities()
    console.log(cities)
    console.log(isLoading)
    if(isLoading) return <Spinner />
    if(cities !== null && !cities.length) return <Message message="Add your first city by clicking on a city on the map" />
    
    const countries:cityData[] = cities !== null ?
        cities.reduce((countriesGroup: cityData[], curCountry: cityData)=>{
        if(!countriesGroup.map(country=>country.country).includes(curCountry.country)) countriesGroup.push(curCountry)
        return countriesGroup
    },[])
    : []
    
    return(
        <ul className={styles.countryList}>
            {countries?.map((country)=>(
                <CountryItem country={country} key={country.id}/>
            ))}
        </ul>
    )
}

export default CountryList