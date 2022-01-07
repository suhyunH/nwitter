import React, {useState, useEffect} from"react";
import AppRouter from './Router';
import "firebase/compat/auth";
import {authService} from "../fbase";
import { updateProfile } from "firebase/auth";


function App() {

  const[init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        setUserObj({
          displayName :user.displayName,
          uid:user.uid,
          photoURL:user.photoURL,
          updateProfile:(args) =>updateProfile(user, { displayName: user.displayName ,photoURL:user.photoURL }),
        });
       }else{
         setUserObj("");
       }
      setInit(true);
    })
  }, []);

  //다른 컴포넌트에서 유저에 관한 사항을 업뎃하게 되면 가장 상위에있는 즉 userObj를 만든 부모 클래스 app에서 리프레쉬되게 만들어줌. 
  const refreshUser =()=>{
    const user = authService.currentUser;

    setUserObj({
      displayName :user.displayName,
      uid:user.uid,
      photoURL:user.photoURL,
      updateProfile:(args) =>user.updateProfile(args),
    });
  }

  return (
  <>
  {init ? (<AppRouter refreshUser={refreshUser} isLoggedIn ={Boolean(userObj)} userObj={userObj}/>) : ("initializing...")}


  <footer style={{textAlign: "center", marginTop:50}}>&copy;{new Date().getFullYear()} Nwitter</footer>
  </>
  );
}

export default App;
