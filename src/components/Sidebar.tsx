import { FC } from "react";
import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css"
import { Outlet } from "react-router-dom";
import { useCities } from "../contexts/cities";

const Sidebar:FC = ()=>{
    const {error} = useCities()

    return (
        <div className={styles.sidebar}>
            <Logo />

            {error && <h1 style={{marginTop:"auto", color:"orangered"}}>💥 {error}</h1>}
            {!error &&
              <>
                <AppNav />
                <Outlet />
              </>
            }

            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
            </footer>
        </div>
    ) 
}

export default Sidebar