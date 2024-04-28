import { FC } from "react";
import { useAuth } from "../contexts/fakeAuthContext";

const PageNotFound:FC = ()=>{
    const {user} = useAuth()
    console.log("USER: ", user)
    return(
        <>
        <h1>Page not found</h1>
        </>
    ) 
}

export default PageNotFound