import React,{useState} from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    } from 'firebase/auth';
import {authService} from "../fbase";

const AuthForm =()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const toggleAccount = ()=>setNewAccount(prev =>!prev);
    
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
    return(
        <>
        <form onSubmit={onSubmit} className='container'>
            <input className='authInput' name="email" type="text" placeholder='Email' required value={email} onChange={onChange}></input>
            <input className='authInput' name="password" type="password" placeholder='Password' required value={password} onChange={onChange}></input>
            <input className='authInput authSubmit' type="submit" value={newAccount? "Create New Account" : "Sign in"} ></input>
        </form>
        {error && <span className='authError'>{error}</span>}
        <span onClick={toggleAccount} className='authSwitch'>{newAccount? "Sign in": "create Account"}</span>
        </>
    )
}
export default AuthForm;