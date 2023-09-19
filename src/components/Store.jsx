import React, { useEffect, useState } from "react";
import styles from "../css/Store.module.css";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import {host} from "./util.js";
const Store = () => {
  const [list, setList] = useState([]);
  const storeID = window.localStorage.getItem('storeID')
  console.log(list);
  const getProducts = async () => {
    const response = await fetch(`${host}store/products/${storeID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 422 || !data) {
      return alert("Error ", response.body);
    } else {
      setList(data);
    }
  };
  const deleteProduct = async(productID)=>{
    const response = await fetch(`${host}product/${productID}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    if(response.status===422){
      return alert("Error deleting the data");
    }else{
      getProducts();
      return alert("Data was successsfully deleted !");
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className={styles.contain}>
      <div className={styles.poster}>
        <div className={styles.logo}>SG</div>
        <aside className={styles.side}>
          <Link to="/createproduct" className={styles.butt}>
            Create Product
          </Link>
          <Link to="/store/orders" className={styles.butt}>View Orders</Link>
        </aside>
      </div>
      <div className={styles.products}>
        {list.map((pro) => {
          return (
            <div className={styles.card}>
              <div className={styles.iholder}>
              <span className={styles.delete} onClick={()=>{deleteProduct(pro._id)}}><DeleteIcon/></span>
                <img className={styles.img} src={pro.imageUrl}/>
              </div>
              <span className={styles.span}>{pro.name}</span>
              <span className={styles.ratings}><CurrencyRupeeIcon/>{pro.price}</span>
              <span className={styles.ratings}>{pro.quantity}</span>
              <div className={styles.bholder}>
                <Link className={styles.but}>Update Product Info</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Store;
