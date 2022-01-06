import React,{useState} from "react";
import { dbService } from "../fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";

const Nweet = ({nweetObj, isOwner})=>{
    const [edit, setEdit] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetRef= doc(dbService,"nweets",`${nweetObj.id}`);
    
    const onDeleteClick = async()=>{
        const ok = window.confirm("Are you sure to delete this nweet?");
        if(ok){
            // 삭제
           await deleteDoc(NweetRef);
        }
    };

    const toggleEditing = ()=>setEdit((prev) =>!prev);
    
    const onSubmit =async(ev)=>{
        ev.preventDefault();
        // 보내고싶은 데이터 newNweet = edit input
        await updateDoc(NweetRef, {
            text: newNweet,
            });
        setEdit(false);    
    }
    const onChange =(ev)=>{
        const{target:{value}} = ev;
        setNewNweet(value);
    }

    return (
    <div key={nweetObj.id}>
        {
            edit ?   (
                <>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder='Edit your nweet' value={newNweet} required onChange={onChange}/>
                    <input type="submit" value="Update Nweet" ></input>    
                </form>
                <button onClick={toggleEditing}>cancel</button>
                </>
                )
              :
            (<>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl &&<img src={nweetObj.attachmentUrl} width="50px" height="50px"/>}
            { isOwner&&
                (
                <>
                <button onClick={onDeleteClick}>Delete Nweet</button>
                <button onClick={toggleEditing}>Edit Nweet</button>
                </>
                )
            }
            </>)
        }
    </div>
);
};


export default Nweet;
