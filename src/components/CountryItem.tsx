import { FC } from "react";
import styles from "./CountryItem.module.css";
import { cityData } from "../schemas";

interface CountryItemProps{
  country:cityData
}

const CountryItem:FC<CountryItemProps> = ({ country }) =>{
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
