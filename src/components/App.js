import React, {useState, useEffect} from"react";
import AppRouter from './Router';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {authService} from "../fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";





function App() {

  const[init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);
  return (
  <>
  {init ? <AppRouter isLoggedIn ={isLoggedIn}/> : "initializing..."}
  <footer>&copy;{new Date().getFullYear()} Nwitter</footer>
  
  </>
  );
}

export default App;
