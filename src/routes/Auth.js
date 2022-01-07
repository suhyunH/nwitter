import React from "react";
import {authService} from "../fbase";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup
    } from 'firebase/auth';
import AuthForm from '../components/AuthForm';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";


const Auth = ()=>{
    const onSocialClick = async(ev)=>{
       const{target:{name}}= ev;
       let provider;
       if(name === "google"){
        provider = new GoogleAuthProvider();
       }else if(name === "github"){
        provider = new GithubAuthProvider();
       }
       await signInWithPopup(authService, provider);
    }

    return (
      
      <div className="authContainer">
          <FontAwesomeIcon
          icon={faTwitter}
          color={"#04AAFF"}
          size="3x"
          style={{ marginBottom: 30 }}
        />
          <AuthForm />   
          <div className="authBtns">
              <button className="authBtn" onClick={onSocialClick} name="google">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
              <button className="authBtn" onClick={onSocialClick}name="github">Continue with Github  <FontAwesomeIcon icon={faGithub} /></button>
          </div>
      </div>
    
    );
    }
export default Auth;