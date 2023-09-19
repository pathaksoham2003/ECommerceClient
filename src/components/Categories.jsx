import React, { useEffect, useState } from 'react'
import styles from "../css/Categories.module.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link } from 'react-router-dom';
import {host} from "./util.js";
const Categories = () => {
  const [elec, setElec] = useState([]);
  const [mens, setMens] = useState([]);
  const [womens, setWomens] = useState([]);
  const request = ()=>{
    const res = fetch(`${host}product/allproducts`,{
    method:"GET",
    headers:{
        "Content-Type":"application/json"
      }
    });
    console.log(res);
    res.then((data)=>{
      const newData = data.json()
      console.log(newData);
     return newData;
    }).then((newData)=>{
       const mensCat = newData.filter((pro)=>pro.category==="mens");
      setMens(mensCat);
      const womensCat = newData.filter((pro)=>pro.category==="womens");
      setWomens(womensCat);
      const electronicsCat = newData.filter((pro)=>pro.category==="electronics");
      setElec(electronicsCat);
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    request();
  },[])
  return (<div className={styles.contain}>
 
      <span className={styles.heading}>Electronics</span>
      <div className={styles.simHolder}>
        {elec?.map((pro) => {
          return (
            <div className={styles.card}>
              <div className={styles.iholder}>
                <Link to={`/product/${pro.category}/${pro._id}`}>
                  <img
                    className={styles.img}
                    src={pro?.imageUrl[0]}
                  />
                </Link>
              </div>
              <Link to={`/product/${pro.category}/${pro._id}`} className={styles.span}>
                {pro.name}
              </Link>
              <div className={styles.cardBot}>
                <span className={styles.ratings}>
                  <CurrencyRupeeIcon />
                  {pro.price}
                </span>
                <span className={styles.ratings}>{"⭐"}</span>
              </div>
            </div>
          );
        })}

    </div>
    
      <span className={styles.heading}>Mens</span>
      <div className={styles.simHolder}>
        {mens?.map((pro) => {
          return (
            <div className={styles.card}>
              <div className={styles.iholder}>
                <Link to={`/product/${pro.category}/${pro._id}`}>
                  <img
                    className={styles.img}
                    src={pro?.imageUrl[0]}
                  />
                </Link>
              </div>
              <Link to={`/product/${pro.category}/${pro._id}`} className={styles.span}>
                {pro.name}
              </Link>
              <div className={styles.cardBot}>
                <span className={styles.ratings}>
                  <CurrencyRupeeIcon />
                  {pro.price}
                </span>
                <span className={styles.ratings}>{ "⭐"}</span>
              </div>
            </div>
          );
        })}

    </div>

      <span className={styles.heading}>Womens</span>
      <div className={styles.simHolder}>
        {womens?.map((pro) => {
          return (
            <div className={styles.card}>
              <div className={styles.iholder}>
                <Link to={`/product/${pro.category}/${pro._id}`}>
                  <img
                    className={styles.img}
                    src={pro?.imageUrl[0]}
                  />
                </Link>
              </div>
              <Link to={`/product/${pro.category}/${pro._id}`} className={styles.span}>
                {pro.name}
              </Link>
              <div className={styles.cardBot}>
                <span className={styles.ratings}>
                  <CurrencyRupeeIcon />
                  {pro.price}
                </span>
                <span className={styles.ratings}>{"⭐"}</span>
              </div>
            </div>
          );
        })}

    </div>
  </div>
 
  )
}

export default Categories