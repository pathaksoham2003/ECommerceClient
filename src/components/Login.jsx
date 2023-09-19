import React, { useEffect, useState } from "react";
import styles from "../css/Login.module.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {host} from "./util.js";
const Login = () => {
  const [login, setLogin] = useState(true);
  const [cookies, setAuthCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
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
  const checkUser = async (e) => {
    e.preventDefault();
    const check = document.getElementById("check");
    const url = check.checked ? `${host}store/checkstore`:`${host}user/checkuser`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      });
      if(response.status === 203){
        return alert("Check your EmailID and Password");
      }
      if (response.ok) {
        const data = await response.json();
        setAuthCookie("authToken", data.token);
        window.localStorage.setItem(check.checked?"storeID":"userID",data.id);
        {check.checked?navigate("/store"):navigate("/user/profile")}
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("ERROR " + error);
      alert("An error occured during login");
    }
  };
  const createUser = async (e) => {
    e.preventDefault();
    const check = document.getElementById("check");
    const url = check.checked ? `${host}store/createstore`:`${host}user/createuser`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      });
      if (response.ok) {
        const data = await response.json();
        setAuthCookie("authToken", data.token);
        window.localStorage.setItem(check.checked?"storeID":"userID",data.id);
        {check.checked?navigate("/store"):navigate("/user/profile")}
      } else {
        alert("error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className={styles.contain}>
      <div className={login ? styles.logBox : styles.signBox}>
        <div className={styles.selects}>
          <span
            className={styles.selectLeft}
            onClick={() => {
              setLogin(true);
            }}
          >
            LogIn
          </span>
          <span
            className={styles.selectRight}
            onClick={(preval) => {
              setLogin(!preval);
            }}
          >
            SignUp
          </span>
        </div>
        <h4 className={styles.heading}>{login ? "Log-In!" : "Signup"}</h4>
        <div className={styles.input}>
          {!login ? (
            <>
              <h4 className={styles.subheading}>Name</h4>
              <input
                onChange={setData}
                value={auth.name}
                name="name"
                className={styles.inputfield}
                type="text"
              />
            </>
          ) : (
            <></>
          )}
          <h4 className={styles.subheading}>Email</h4>
          <input
            onChange={setData}
            value={auth.email}
            name="email"
            className={styles.inputfield}
            type="email"
          />
          <h4 className={styles.subheading}>
            {login ? "Enter Password 🅿" : "Set Password 📌"}
          </h4>
          <input
            onChange={setData}
            value={auth.password}
            name="password"
            className={styles.inputfield}
            type="password"
          />
          <div className={styles.checkbox}>          <h4 className={styles.checkH}>Want to login as a store owner?</h4>
          <input className={styles.check} id="check" type ="checkbox"/></div>
          {login ? (
            <button type="submit" className={styles.logIn} onClick={checkUser}>
              Log-In
            </button>
          ) : (
            <button type="submit" className={styles.logIn} onClick={createUser}>
              Sign-In
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Login;
