import React, { useEffect, useState } from "react";
import image from "../css/logo.svg";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link } from "react-router-dom";
import styles from "../css/AllProducts.module.css";
import {host} from "./util.js";
const AllProducts = () => {
  const [list, setList] = useState([]);
  const [temp,setTemp] = useState([]);
  const [filter,setFilter]=useState(false);
  const [price,setPrice] = useState(0);
  const filterHandler = ()=>{
    setFilter(!filter);
  }
  const getproducts = async () => {
    const data = await fetch(`${host}product/allproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newData = await data.json();
    setList(newData);
  };
  console.log(temp);
  const handleFilter = (cat) =>{
    const newArr = list.filter((pro)=> pro.category===cat);
    setTemp(newArr);
  }
  const handlePrice = (e) =>{
    setPrice(e.target.value)
    const newArr = list.filter((pro)=>pro.price<=e.target.value);
    setTemp(newArr);
  }
  useEffect(() => {
    getproducts();
  }, []);
  return (
    <div className={styles.contain}>
      <div className={filter?styles.sidebarRes:styles.sidebar}>
        <l className={styles.filters}>
          <li className={styles.filterHead}>FILTERS</li>
          <li className={styles.filter} onClick={()=>{setTemp([])}}>All Products</li>
          <li className={styles.filter} onClick={()=>{handleFilter("mens")}}>Mens</li>
          <li className={styles.filter} onClick={()=>{handleFilter("womens")}}>Womens</li>
          <li className={styles.filter} onClick={()=>{handleFilter("electronics")}}>ELectronics</li>
          <li className={styles.filter} >Price:<CurrencyRupeeIcon/>{price}<input type="range" min="0" max="10000" onChange={handlePrice}/></li>
          <li className={styles.filter}></li>
        </l>
      </div>
      
      <div className={styles.products}>
        <button onClick = {filterHandler} className={styles.filterBut}>Filter</button>
        {temp.length===0 ? (list?.map((pro) => {
          return (
            <div className={styles.card}>
              <div className={styles.iholder}>
                <Link to={`/product/${pro.category}/${pro._id}`}>
                  <img className={styles.img} src={pro.imageUrl}/>
                </Link>
              </div>
              <Link to={`/product/${pro.category}/${pro._id}`}className={styles.span}>
            {pro.name}
              </Link>
              <span className={styles.ratings}>{pro.rating}⭐</span>
              <div className={styles.bholder}>
              <Link to={`/product/${pro.category}/${pro._id}`}className={styles.but}>
            <CurrencyRupeeIcon/>{pro.price}
              </Link>
              </div>
            </div>
          );
        })):(temp?.map((pro) => {
          return (
            <div className={styles.card}>
              <div className={styles.iholder}>
                <Link to={`/product/${pro.category}/${pro._id}`}>
                  <img className={styles.img} src={pro.imageUrl}/>
                </Link>
              </div>
              <Link to={`/product/${pro.category}/${pro._id}`}className={styles.span}>
            {pro.name}
              </Link>
              <span className={styles.ratings}>{pro.rating}⭐</span>
              <div className={styles.bholder}>
              <Link to={`/product/${pro.category}/${pro._id}`}className={styles.but}>
            <CurrencyRupeeIcon/>{pro.price}
              </Link>
              </div>
            </div>
          );
        }))}
      </div>
    </div>
  );
};

export default AllProducts;
