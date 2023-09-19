import React, { useState } from "react";
import styles from "../css/NewProduct.module.css";
import { useNavigate } from "react-router-dom";
import {host} from "./util.js";
const NewProduct = () => {
  const navigate = useNavigate();
  const imageUrlRegex =
    /\b(?:https?|ftp):\/\/\S+\.(?:png|jpe?g|gif|bmp|webp)\b/;
  const emptyStringRegex = /^ *$/;
  const [temp, setTem] = useState("");
  const [url, setUrl] = useState("");
  const [auth, setAuth] = useState({
    name: "",
    price: 0,
    quantity: 0,
    imageUrl: [],
    description: "",
    category: "",
  });
  console.log(auth);
  const setData = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (e.target.name === "category") {
      value = e.target.value.toLowerCase();
    } 
    setAuth((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  const setTemp = (e) => {
    const value = e.target.value;
    setTem(value);
  };
  const setUr = (e) => {
    const value = e.target.value;
    setUrl(value);
  };
  const addCate = () => {
    const lowerTemp = temp.toLowerCase();
    if (!emptyStringRegex.test(lowerTemp)) {
      setAuth((preval) => {
        const newCate = [...preval.category, lowerTemp];
        return { ...preval, category: newCate };
      });
      setTem("");
    }
  };
  // const removeCate = (val) => {
  //   console.log(val);
  //     setAuth((preval) => {
  //       const newCate = auth.category.filter((cat)=> cat!==val);
  //       return { ...preval, category: newCate };
  //     });
  // };
  const addUrl = () => {
    if (imageUrlRegex.test(url)) {
      setAuth((preval) => {
        const newUrl = [...preval.imageUrl, url];
        return { ...preval, imageUrl: newUrl };
      });
      setUrl("");
    }
  };
  const removeUrl = (val) => {
    console.log(val);
    setAuth((preval) => {
      const newUrl = auth.imageUrl.filter((cat) => cat !== val);
      return { ...preval, imageUrl: newUrl };
    });
  };
  const createProduct = async () => {
    const storeID = window.localStorage.getItem("storeID");
    const response = await fetch(
      `${host}product/${storeID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.status === 422 || !data) {
      alert("error " + data);
    } else {
      alert("Product has been successfully created");
      navigate("/store");
    }
  };
  return (
    <div className={styles.contain}>
      <div className={styles.box}>
        <h4 className={styles.heading}>Create Product</h4>
        <div className={styles.input}>
          <h4 className={styles.subheading}>Name</h4>
          <input
            onChange={setData}
            value={auth.name}
            name="name"
            className={styles.inputfield}
            type="text"
          />
          <h4 className={styles.subheading}>Price</h4>
          <input
            onChange={setData}
            value={auth.price}
            name="price"
            className={styles.inputfield}
            type="number"
          />
          <h4 className={styles.subheading}>Quantity</h4>
          <input
            onChange={setData}
            value={auth.quantity}
            name="quantity"
            className={styles.inputfield}
            type="number"
          />
          <div
            className={
              auth.imageUrl.length === 0 ? styles.imgDis : styles.imgHolder
            }
          >
            {auth.imageUrl.map((val) => {
              return (
                <img
                  className={styles.img}
                  onClick={() => {
                    removeUrl(val);
                  }}
                  src={val}
                />
              );
            })}
          </div>
          <h4 className={styles.subheading}>ImageUrl</h4>
          <div className={styles.sameLine}>
            {" "}
            <input
              onChange={setUr}
              value={url}
              className={styles.inputfield}
              type="text"
            />
            <span className={styles.butt} onClick={addUrl}>
              Add
            </span>
          </div>
          <h4 className={styles.subheading}>Description</h4>
          <input
            onChange={setData}
            value={auth.description}
            name="description"
            className={styles.inputfield}
            type="text"
          />
          {/* <div
            className={
              auth.category.length === 0 ? styles.catDis : styles.catHolder
            }
          >
            {auth.category.map((val) => {
              return <span className={styles.cat} onClick={()=>{removeCate(val)}}>{val}</span>;
            })}
          </div> */}
          <h4 className={styles.subheading}>Category</h4>
          <div className={styles.sameLine}>
            <input
              onChange={setData}
              value={auth.category.toLowerCase()}
              name="category"
              className={styles.inputfield}
              type="text"
            />
            <span className={styles.butt} onClick={addCate}>
              Add
            </span>
          </div>
          <span className={styles.cButt} onClick={createProduct}>
            Create Product
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
