import { FC } from "react";
import styles from "./AppLayout.module.css"
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";

const AppLayout:FC = ()=>{
    return (
        <div className={styles.app}>
            <Sidebar />
                <User />
                <Map />
        </div>
    )
}

export default AppLayout