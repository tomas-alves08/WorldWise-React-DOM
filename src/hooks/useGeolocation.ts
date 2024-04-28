import { useState } from "react";

type position = {
    lat:number,
    lng:number
} | null

export const useGeolocation = (defaultPosition=null) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [position, setPosition] = useState<position|null>(defaultPosition)
    const [error, setError] = useState<string|null>(null)

    function getPosition(){
        if(!navigator.geolocation) return setError("Your browser does not support geolocation")

        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(pos=>{
            setPosition({
                lat:pos.coords.latitude,
                lng:pos.coords.longitude
            })
            setIsLoading(false)
        }),
        (error:any)=>{
            setError(error.message)
            setIsLoading(false)
        }
    }

    return {isLoading, position, error, getPosition}
}