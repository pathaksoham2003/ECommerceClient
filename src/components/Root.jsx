import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import styles from "../css/Orders.module.css";
const Root = () => {
  return (
    <>
    <div className={styles.bigggest}>
    <Navbar/>
    <Outlet/>
    </div>
    </>
  )
}

export default Root