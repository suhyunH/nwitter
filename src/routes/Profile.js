import React,{useEffect} from "react";
import { useHistory } from 'react-router-dom';
import {authService, dbService} from "../fbase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";


export default ({userObj})=>{
    const history = useHistory();
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
return (
    <>
        <button onClick={onLogOutClick}>Log out</button>
    </>
)
}