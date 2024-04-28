import { FC, ReactNode, createContext, useContext, useReducer } from "react";

interface IAuthContext{
    user:IUser|null,
    isAuthenticated:boolean,
    login:Function
    logout:Function
}

const USER_CONTEXT_DEFAULT_VALUE:IAuthContext = {
    user:null,
    isAuthenticated:false,
    login:()=>{},
    logout:()=>{}
}

const AuthContext = createContext<IAuthContext>(USER_CONTEXT_DEFAULT_VALUE)

interface IAuthProviderProps{
    children:ReactNode
}

interface IUser{
    name: string,
    email: string,
    password: string,
    avatar: string
}

const FAKE_USER:IUser = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

interface IState{
    user:IUser|null,
    isAuthenticated:boolean
}

type ActionType =
    // | {type:"authenticate", payload:IState}
    | {type:"login", payload:IUser}
    | {type:"logout"}

const initialState:IState = {
    user:null,
    isAuthenticated:false
}

const reducer = (state:IState, action:ActionType):IState =>{
    switch(action.type){
        // case "authenticate":
        //     return {...state, isAuthenticated:true}
        case "login":
            console.log("Reducer Login: ", action.payload)
            return {...state, user:action.payload, isAuthenticated:true}
        case "logout":
            console.log("REDUCER LOGOUT")
            return {...state, user:null, isAuthenticated:false}
        default:
            throw new Error("This action is unknown")
    }
}

const AuthProvider:FC<IAuthProviderProps> = ({children}) =>{
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

    function login(email:string, password:string){
        console.log("Auth Context Login: ")
        if(email === FAKE_USER.email && password === FAKE_USER.password)
        dispatch({type:"login", payload:FAKE_USER})
    }

    function logout(){
        dispatch({type:"logout"})
    }

    return <AuthContext.Provider value={({user, isAuthenticated, login, logout})}>{children}</AuthContext.Provider>
}

function useAuth(){
    const context = useContext<IAuthContext>(AuthContext)
    if(context === null) throw new Error("Auth context was used outside of the Auth Provider")
    return context
}

export {
    AuthProvider,
    useAuth
}