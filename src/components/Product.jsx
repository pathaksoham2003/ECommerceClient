import React, { useEffect, useState } from "react";
import styles from "../css/Product.module.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {host} from "./util.js";
import { Link, useParams } from "react-router-dom";
const Product = () => {
  const { cat, productID } = useParams();
  const [products, setProducts] = useState([]);
  const [sim, setSim] = useState([]);
  const [main, setMain] = useState({});
  const [imgs, setImgs] = useState([]);
  const [mUrl, setUrl] = useState("");
  const userID = window.localStorage.getItem("userID");
  const getData = () => {
    const response = fetch(`${host}product/${cat}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response
      .then((data) => {
        const newData = data.json();
        return newData;
      })
      .then((data) => {
        setProducts(data);
        const sim = data.filter((product) => product._id !== productID);
        const mainProduct = data.find((product) => product._id === productID);
        setImgs(mainProduct.imageUrl);
        setUrl(mainProduct.imageUrl[0]);
        setSim(sim);
        setMain(mainProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateMain = (productID) => {
    const sim = products.filter((product) => product._id !== productID);
    const mainProduct = products.find((product) => product._id === productID);
    setSim(sim);
    setMain(mainProduct);
    setImgs(mainProduct.imageUrl);
    setUrl(mainProduct.imageUrl[0]);
  };
  const handleCart = async (productID,storeID) =>{
    const obj = {productID:productID,userID:userID,storeID:storeID};
    const response = await fetch(`${host}user/addtocart`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(obj)
    })
    const data = await response.json();
    alert(data);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.contain}>
      <div className={styles.perPro}>
        <div className={styles.sideIHold}>
          <div className={styles.exImg}>
            {imgs.map((url) => {
              return (
                <img
                  onMouseEnter={() => {
                    setUrl(url);
                  }}
                  className={styles.img}
                  src={url}
                />
              );
            })}
          </div>
          <div className={styles.mainImg}>
            <img className={styles.Mimg} src={mUrl} />
          </div>
        </div>
        {
          <div className={styles.desHolder}>
            <div className={styles.name}>
              <h3>{main.name}</h3>
            </div>
            <div className={styles.prq}>
              <h3>
                <CurrencyRupeeIcon />
                {main.price}
              </h3>
              <h4>⭐{main.rating}</h4>
              <h4>{main.quantity}</h4>
             {userID===null?(<></>):(<><button onClick={()=>{handleCart(main._id,main.storeID)}}>Add To Cart</button>
              <button>Buy Now</button></>)}
            </div>
            <div className={styles.desc}>
              <p>{main.description}</p>
            </div>
          </div>
        }
      </div>
      <div className={styles.other}>
        <span className={styles.heading}>Similar Products</span>
        <div className={styles.simHolder}>
          {sim?.map((pro) => {
            return (
              <div className={styles.card}>
                <div className={styles.iholder}>
                  <Link to={`/product/${cat}/${pro._id}`}>
                    <img
                      onClick={() => {
                        updateMain(pro._id);
                      }}
                      className={styles.img}
                      src={pro?.imageUrl[0]}
                    />
                  </Link>
                </div>
                <Link to={`/product/${cat}/${pro._id}`} className={styles.span}>
                  {pro.name}
                </Link>
                <div className={styles.cardBot}>
                  <span className={styles.ratings}>
                    <CurrencyRupeeIcon />
                    {pro.price}
                  </span>
                  <span className={styles.ratings}>{pro.ratings * "⭐"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
