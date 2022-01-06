import React,{useState, useEffect, useRef} from "react";
import { dbService, storageService } from "../fbase";
import { addDoc, collection,serverTimestamp,onSnapshot,
    orderBy,
    query}  from "firebase/firestore";
import Nweet from '../components/Nweet';
import { ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';



const Home = ({userObj})=>{
    //hook must be on the top of the fuction
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();
    const fileInput =useRef();

    useEffect(() => {
     const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
     const unsubscribe = 
     onSnapshot(q, (snapshot)=>{
         const nweetArr = snapshot.docs.map((doc)=>({
             id: doc.id,
             ...doc.data(),
         }));
         setNweets(nweetArr);
         console.log(nweetArr);
     });
     return () => {
        unsubscribe();
    };
    }, [])


    const onSubmit =async (e) => {
        e.preventDefault();
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        console.log(response);
        // await addDoc(collection(dbService, "nweets"), {
        // text:nweet,
        // createdAt: serverTimestamp(),
        // creatorId: userObj.uid,
        // });
        // setNweet("");
    };


    const onChange = (ev)=>{
        const{
            target:{value},
        } = ev;
        setNweet(value);
    };

    const onFileChange=(ev)=>{
        const {target:{files}} =ev;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend=(finishedEv)=>{
            // const{currentTarget:{result}} = finishedEv;
            // setAttachment(result);
            setAttachment(finishedEv.currentTarget.result);
        };
        reader.readAsDataURL(theFile);
    };
    
    const onClearAttachment = ()=>{
        setAttachment(null);
        fileInput.current.value ="";

    }

console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120}/>
                <input ref={fileInput} type="file" accept='image/*' onChange={onFileChange}/>
                <input type="submit" value="Nweet"/>
                {attachment &&<div> 
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                    </div>
                }
            </form>

            <div>
                {nweets.map((nweet) =>(
                    <Nweet key={nweet.id} nweetObj ={nweet} isOwner={nweet.creatorId ===userObj.uid}/>
                    )
                )}
            </div>
            
        </div>

    );
    };
export default Home;