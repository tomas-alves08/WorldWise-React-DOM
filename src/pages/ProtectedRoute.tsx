import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "../contexts/fakeAuthContext";
import { useNavigate } from "react-router";

interface ProtectedRouteProps{
    children:ReactNode
}

const ProtectedRoute:FC<ProtectedRouteProps> = ({children}) =>{
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!isAuthenticated) navigate("/")
    },[isAuthenticated, navigate])
    
    return isAuthenticated ? children : null
}

export default ProtectedRoute