import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Person4Icon from "@mui/icons-material/Person4";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../css/Profile.module.css";
import { Link } from "react-router-dom";
import {host} from "./util.js";
const Profile = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(false);
  const userID = window.localStorage.getItem("userID");
  const getuser = async () => {
    const response = await fetch(`${host}user/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUser(data);
  };
  const profileHandler = () => {
    setProfile(!profile);
  };
  const [cart, setCart] = useState([]);
  const getData = async () => {
    const response = await fetch(`${host}user/gcart/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCart(data);
  };
  const handleBuying = async(productID,storeID)=>{
    const obj = {productID,userID,storeID};
    const response = await fetch(`${host}user/placeorder`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(obj)
    })
    if(response.ok){
      getOrders();
      alert("Successful Deletion");
      return;
    }
    return alert("error");
  }
  const deleteCart = async(productID) =>{
    const response = await fetch(`${host}user/deletecart/${productID}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/josn"
      }
    })
    if(response.ok){
      getData();
      alert("Successful Deletion");
      return;
    }
    return alert("error");
  }
  // Order Section 
  const [orders,setOrders] = useState([]);
  const getOrders = async()=>{
    const response = await fetch(`${host}user/gorder/${userID}`,{
      method:"GET",
      headers:{
        "Cotent-Type":"application/json"
      }
    })
    if(!response.ok){
      return alert("Error"+response.data);
    }
    const data = await response.json();
    setOrders(data);
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getuser();  
  }, []);
  useEffect(() => {
    getOrders();  
  }, []);
  console.log(cart);
  return (
    <div className={styles.contains}>
      <div onClick={profileHandler} className={styles.rSquare}>
        <img src={user.imageUrl} className={styles.content} />
      </div>
      <div className={profile ? styles.rSideBar : styles.sideBar}>
        <div className={profile ? styles.hideSquare : styles.square}>
          <img src={user.imageUrl} className={styles.content} />
        </div>
        <span className={styles.info}>
          <Person4Icon /> {user.name}
        </span>
        <span className={styles.info}>
          <AlternateEmailIcon /> {user.email}
        </span>
        <span className={styles.info}>
          <LocationOnIcon />
          {user.address}
        </span>
        <span className={styles.edit}>
          <Link to={`/useredit/${user._id}`}>Edit Profile</Link>
        </span>
      </div>
      <div className={styles.product}>
        <span className={styles.heading}>Cart</span>
        <div className={styles.simHolder}>
          {cart?.map((pro) => {
            return (
              <div className={styles.card}>
                <span className={styles.delete} onClick={()=>{deleteCart(pro._id)}}><DeleteIcon/></span>
                <div className={styles.iholder}>
                  <Link to={`/product/${pro.category}/${pro._id}`}>
                    <img className={styles.img} src={pro?.imageUrl} />
                  </Link>
                </div>
                <Link
                  to={`/product/${pro.category}/${pro._id}`}
                  className={styles.span}
                >
                  {pro.name}
                </Link>
                <div className={styles.cardBot}>
                  <span className={styles.ratings}>
                    <CurrencyRupeeIcon />
                    {pro.price}
                  </span>
                  <span className={styles.ratings}><button onClick={()=>handleBuying(pro._id,pro.storeID)}>Buy Now</button></span>
                </div>
              </div>
            );
          })}
        </div>
        <span className={styles.heading}>Ordered</span>
         <div className={styles.simHolder}>
         {orders?.map((pro) => {
            return (
              <div className={styles.card}>
              <div className={styles.iholder}>
                <Link to={`/product/${pro.category}/${pro._id}`}>
                  <img className={styles.img} src={pro?.imageUrl} />
                </Link>
              </div>
              <Link
                to={`/product/${pro.category}/${pro._id}`}
                className={styles.span}
              >
                {pro.name}
              </Link>
              <div className={styles.cardOrderBot}>
                <span className={styles.ratings}>OrderPlaced🎉</span>
              </div>
            </div>
            );
          })}
        </div> 
      </div>
    </div>
  );
  {
    /* {JSON.stringify(user)};*/
  }
};

export default Profile;
