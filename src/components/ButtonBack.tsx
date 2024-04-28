import { FC } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const ButtonBack:FC = () =>{
const navigate = useNavigate()
    function navigateBack(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        e.preventDefault()
    
        navigate(-1)
      }
    return(
        <Button style="back" onClick={navigateBack}>&larr; Back</Button>
    )
}

export default ButtonBack