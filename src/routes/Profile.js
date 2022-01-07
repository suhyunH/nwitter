import React,{useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {authService, dbService, storageService} from "../fbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';


export default ({refreshUser, userObj})=>{
    const history = useHistory();
    const [newDisplayName, setNewtDisplayName] = useState(userObj.displayName);
    const [img, setImg] = useState("");

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
    const onChangeImg = (ev)=>{
        const {target:{files}} =ev;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend=(finishedEv)=>{
            const{currentTarget:{result}} = finishedEv;
            setImg(result);
        };
        reader.readAsDataURL(theFile);


    }

    const onSubmit= async (ev)=>{
        ev.preventDefault();
        let imgUrl = "";
        if(img !== ""){
            const imgRef = ref(storageService,'profilePictures/' + img.name );
            const response = await uploadString(imgRef, img, "data_url");
            imgUrl =  await getDownloadURL(response.ref);  
        
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser,{displayName : newDisplayName, photoURL: imgUrl });
        };
        refreshUser();
        setImg("");

    }
}
   

    const onClearNewPro = ()=>{
        setImg("");
    }
return (
    <div className="container">
    <form className="factoryForm" onSubmit={onSubmit}>
         <label htmlFor="attach-file"className="factoryInput__label">
            <span>Add Profile Picture</span>
            <FontAwesomeIcon icon={faPlus} />
        </label>
        <input  id="attach-file" type="file" accept='image/*' onChange={onChangeImg} style={{opacity: 0,}}/>
        {img &&
                        <div className="factoryForm__attachment">
                        <img className="change_pic" src={img} style={{backgroundImage: img}} />
                        <button className="change_pic_Clear" onClick={onClearNewPro}><span>Remove</span><FontAwesomeIcon icon={faTimes} /></button>
                        </div>
        } 
        <input  className="formInput" onChange={onChange} type="text" placeholder='Display name' value={newDisplayName} autoFocus />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />    
    </form>
    <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
)
}