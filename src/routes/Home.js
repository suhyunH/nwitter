import React,{useState, useEffect} from "react";
import { dbService} from "../fbase";
import { collection, onSnapshot,
    orderBy,
    query}  from "firebase/firestore";
import Nweet from '../components/Nweet';
import NweetFactory from '../components/NweetFactory';



const Home = ({userObj})=>{
    //hook must be on the top of the fuction
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
     const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
     const unsubscribe = 
     onSnapshot(q, (snapshot)=>{
         const nweetArr = snapshot.docs.map((doc)=>({
             id: doc.id,
             ...doc.data(),
         }));
         setNweets(nweetArr);
     });
     return () => {
        unsubscribe();
    };
    }, [])

    return (
        <div>
            <NweetFactory userObj={userObj}/>

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