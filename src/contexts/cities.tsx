import { FC, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { cityData } from "../schemas";
import { city } from "../schemas";

interface CitiesContextValue{
    cities: cityData[] | null,
    isLoading:boolean,
    currentCity:cityData | null,
    getCity:Function,
    createCity:Function,
    deleteCity: Function,
    error:string
}

const DEFAULT_VALUE: CitiesContextValue = {
    cities: null,
    isLoading: false,
    currentCity:null,
    getCity:()=>{},
    createCity:()=>{},
    deleteCity:()=>{},
    error:""
};

const CitiesContext = createContext<CitiesContextValue>(DEFAULT_VALUE)

interface CitiesProviderProps{
    children: ReactNode
}

type actionTypes = 
          | {type:"loading"}
          | {type:"cities/loaded", payload:cityData[]}
          | {type:"city/loaded", payload:cityData}
          | {type:"city/created", payload:cityData}
          | {type:"city/deleted", payload:string}
          | {type:"error", payload:string}

interface IState {
  cities: cityData[]|null,
  isLoading:boolean,
  currentCity:cityData|null,
  error: string
}

const initialState:IState = {
  cities:null,
  isLoading:false,
  currentCity:null,
  error:""
}

const  reducer = (state:IState, action: actionTypes):IState =>{
  switch(action.type){
    case "loading":
      return {...state, isLoading:true}
    case "cities/loaded":
      return {...state, isLoading:false, cities:action.payload}
    case "city/loaded":
      return {...state, isLoading:false, currentCity:action.payload}
    case "city/created":
      return {...state, isLoading:false, currentCity:action.payload, cities: state.cities ? [...state.cities, action.payload] : [action.payload]}
    case "city/deleted":
      let updatedCitiesList:cityData[]|null|undefined = null
      if(action.payload) updatedCitiesList = state.cities?.filter(city=>city.id !== action.payload)
      return {...state, isLoading:false, currentCity:null, cities:updatedCitiesList ?? null }
    case "error":
      console.log("ERROR: ", action.payload)
      return {...state, isLoading:false, error:action.payload}
    default:
      return state
  }
}

const BASE_URL = "http://localhost:8000";

const CitiesProvider:FC<CitiesProviderProps> = ({children}) =>{
  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{
    async function fetchData(){
      dispatch({type:"loading"})
    try{
      const response = await fetch(`${BASE_URL}/cities`)
      if(!response.ok) throw new Error("Failed to fetch cities data.")
      const data = await response.json()
      dispatch({type:"cities/loaded", payload:data})
    } catch(err:any){
      console.log("ERROR CATCH: ", err.message)
      dispatch({type:"error", payload:err.message})
    } 
  }
  fetchData()
  }, [])

  const getCity = async(id:string) =>{
    if(currentCity && currentCity.id === id) return;
    dispatch({type:"loading"})
      try{
        const response = await fetch(`${BASE_URL}/cities/${id}`)
        if(!response.ok) throw new Error("Failed to fetch city data.")
        const data = await response.json()
        dispatch({type:"city/loaded", payload:data})
      } catch(err:any){
        dispatch({type:"error", payload:err.message})
      } 
  }

  const createCity = async (newCity:city) =>{
    dispatch({type:"loading"})
    try{
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(!response.ok) throw new Error("Failed to create city")
      const data:cityData = await response.json()
      
      dispatch({type:"city/created", payload:data})
    } catch(err:any){
      dispatch({type:"error", payload:err.message})
    }
  }

  const deleteCity = async (id:string) =>{
    dispatch({type:"loading"})
    try{
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE"
      })
      if(!response.ok) throw new Error("Failed to delete city")

      dispatch({type:"city/deleted",payload: id})
    } catch(err:any){
      dispatch({type:"error", payload:err.message})
    } 
  }

  return <CitiesContext.Provider value={({
    cities, isLoading,currentCity, getCity, createCity, deleteCity, error
  })}>{children}</CitiesContext.Provider>
}

const useCities = () =>{
    const context = useContext<CitiesContextValue>(CitiesContext)
    if(context === null) throw new Error("Cities context was used outside of the Cities Provider")
    return context
}

export {CitiesProvider, useCities}