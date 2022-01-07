import React,{useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {authService, dbService} from "../fbase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default ({refreshUser, userObj})=>{
    const history = useHistory();
    const [newDisplayName, setNewtDisplayName] = useState(userObj.displayName);
    const onLogOutClick =()=>{
        authService.signOut();
        history.push("/");
    };
    const getMyNweets=async ()=>{
        const q = query(collection(dbService,"nweets"),where("creatorId","==",userObj.uid),orderBy("createdAt","desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.map((doc)=>{
            console.log(doc.data());
        }); 
    };
    useEffect(() => {
     getMyNweets();
    }, [])
    const onChange = (ev)=>{
        const{target:{value}} =ev;
        setNewtDisplayName(value);
    }
    const onSubmit= async (ev)=>{
        ev.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser,{displayName : newDisplayName});
        };
        refreshUser();
    }
return (
    <>
    <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder='Display name' value={newDisplayName}/>
        <input type="submit" value="Update Profile"  />
    </form>
        <button onClick={onLogOutClick}>Log out</button>
    </>
)
}