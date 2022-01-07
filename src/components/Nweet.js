import React,{useState} from "react";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "../fbase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


const Nweet = ({nweetObj, isOwner})=>{
    const [edit, setEdit] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetRef= doc(dbService,"nweets",`${nweetObj.id}`); //nweet url 
    const urlRef = ref(storageService, nweetObj.attachmentUrl); //attachment url

    const onDeleteClick = async()=>{
        const ok = window.confirm("Are you sure to delete this nweet?");
        if(ok){
            // 삭제
           await deleteDoc(NweetRef);
           await deleteObject(urlRef);
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

    const onClick =(ev)=>{
        const {target:{src}} =ev;
        window.open(src)
    }

    return (
    <>
        {isOwner? 
            <div className='nweet ver'>
        {
            edit ?   (
                <>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input className="formInput" type="text" placeholder='Edit your nweet' value={newNweet} required autoFocus onChange={onChange}/>
                    <input className="formBtn" type="submit" value="Update Nweet" ></input>    
                </form>
                <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                </>
                )
            :
            (<>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} onClick={onClick}/>}
            
                
                <>
                <div className="nweet__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                </div>
                
                </>
                
            
            </>)
        }
        </div>
        
              :   
                <div className='nweet'>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} onClick={onClick}/>} 
                
                </div>
                }
    </>
);

}


export default Nweet;
