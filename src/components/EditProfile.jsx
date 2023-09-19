import React, { useEffect } from 'react'
import { useState } from "react";
import styles from "../css/NewProduct.module.css";
import { useNavigate } from "react-router-dom";
import {host} from "./util.js";

const EditProfile = () => {
  const userID = window.localStorage.getItem("userID");
  const navigate = useNavigate();
  const imageUrlRegex =
    /\b(?:https?|ftp):\/\/\S+\.(?:png|jpe?g|gif|bmp|webp)\b/;
  const [auth, setAuth] = useState({
    name:"",
    email:"",
    imageUrl:"",
    address:""
  });
  const setData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAuth((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  const gettingData = () =>{
    const res = fetch(`${host}user/${userID}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    res.then((res)=>{
        const data = res.json();
        return data;
    }).then((data)=>{
        console.log(data);
        setAuth(data);
    })
  }
  useEffect(()=>{
    gettingData();
  },[])
  const updateUser = async () => {
    const response = await fetch(
      `${host}user/${userID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.status === 422 || !data) {
      alert("error " + data);
    } else {
      alert("Product has been successfully created");
      navigate("/user/profile");
    }
  };
  return (
    <div className={styles.contain}>
      <div className={styles.box}>
        <h4 className={styles.heading}>Update User</h4>
        <div className={styles.input}>
          <h4 className={styles.subheading}>Username</h4>
          <input
            onChange={setData}
            value={auth.name}
            name="name"
            className={styles.inputfield}
            type="text"
          />
          <h4 className={styles.subheading}>Email</h4>
          <input
            onChange={setData}
            value={auth.email}
            name="email"
            className={styles.inputfield}
            type="text"
          />
          <h4 className={styles.subheading}>ImageUrl</h4>
          <input
            onChange={setData}
            value={auth.imageUrl}
            name="imageUrl"
            className={styles.inputfield}
            type="text"
          />
          <h4 className={styles.subheading}>Address</h4>
          <input
            onChange={setData}
            value={auth.address}
            name="address"
            className={styles.inputfield}
            type="text"
          />
          </div>
          <div className={styles.ButHolder}>
          <span className={styles.bButt} onClick={updateUser}>
            Update User
          </span>
          </div>
        </div>
      </div>
  );
};

export default EditProfile