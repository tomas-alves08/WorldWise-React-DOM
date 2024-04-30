import { FC, ReactNode, MouseEventHandler } from "react";
import styles from "./Button.module.css"

interface ButtonProps{
    children:ReactNode,
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void,
    style:string
}

const Button:FC<ButtonProps> = ({children, onClick, style}) =>{
    return(
        <button onClick={onClick as MouseEventHandler<HTMLElement>} className={`${styles.btn} ${styles[style]}`}>{children}</button>
    )
}

export default Button