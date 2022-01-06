import React, {useState, useEffect} from"react";
import AppRouter from './Router';
import "firebase/compat/auth";
import {authService} from "../fbase";





function App() {

  const[init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        // setIsLoggedIn(true);
        setUserObj(user);
      // }else{
      //   setIsLoggedIn(false);
       }
      setInit(true);
    })
  }, []);
  return (
  <>
  {init ? (<AppRouter isLoggedIn ={Boolean(userObj)} userObj={userObj}/>) : ("initializing...")}


  <footer>&copy;{new Date().getFullYear()} Nwitter</footer>
  </>
  );
}

export default App;
