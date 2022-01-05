import React,{useState} from "react";
import {authService} from "../fbase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup
    } from 'firebase/auth';

const Auth = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange =(ev)=>{
        const {target: {value, name}} = ev;
        // const {name, value } = ev.target;
        if(name==="email"){
            setEmail(value)
        }else if(name ==="password") {
            setPassword(value)
        }
    }

    const onSubmit= async(ev)=>{
        ev.preventDefault();
        try{
            let data;
            if(newAccount){
                data = await createUserWithEmailAndPassword(authService, email, password);
            }else{
               data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    };

    const toggleAccount = ()=>setNewAccount(prev =>!prev);

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

    
    return (<div>
        <form onSubmit={onSubmit}>
            <input name="email" type="text" placeholder='Email' required value={email} onChange={onChange}></input>
            <input name="password" type="password" placeholder='Password' required value={password} onChange={onChange}></input>
            <input type="submit" value={newAccount? "Create New Account" : "Sign in"} ></input>
        </form>
        {error}
        <span onClick={toggleAccount}>{newAccount? "Sign in": "create Account"}</span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick}name="github">Continue with Github</button>
        </div>
    </div>);
    }
export default Auth;