import React,{useState, useEffect} from "react";
import { dbService } from "../fbase";
import { addDoc, collection,serverTimestamp,onSnapshot,
    orderBy,
    query}  from "firebase/firestore";


const Home = ({userObj})=>{
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    // const getNweets = async ()=>{
    //     const dbNweets = query(collection(dbService, "nweets"));
    //     const querySnapshot = await getDocs(dbNweets);
    //     querySnapshot.forEach((doc) => {
    //         const nweetObj = {
    //             ...doc.data(),
    //             id: doc.id,
    //         }
    //         setNweets(prev => [nweetObj, ...prev]);
    //     });
    // }


    useEffect(() => {
     const q = query(collection(dbService, "nweets"),orderBy('createdAt',"desc"));
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
        console.log(`서브밋 하는 느윗:${nweet}`);
        await addDoc(collection(dbService, "nweets"), {
        text:nweet,
        createdAt: serverTimestamp(),
        creatorId: userObj.uid,
        });
        setNweet("");
        };


    const onChange = (ev)=>{
        const{
            target:{value},
        } = ev;
        setNweet(value);
    };

console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="Nweet"/>
            </form>

            <div>
                {nweets.map((nweet) =>(
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>))}
            </div>
            
        </div>

    );
    };
export default Home;