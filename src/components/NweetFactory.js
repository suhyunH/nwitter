import React, {useState, useRef} from "react";
import { dbService, storageService } from "../fbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection,serverTimestamp}  from "firebase/firestore";

const NweetFactory=({userObj})=>{
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const fileInput =useRef();

    const onSubmit =async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
            //참조경로
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
           //참조경로로 파일 업로드 
            const response = await uploadString(attachmentRef, attachment, "data_url");
            //storage에 있는 파일 url로 다운로드 받기 ... await 빼면 오류난다. 
            attachmentUrl =  await getDownloadURL(response.ref);  
        }

        //이미지랑 같이 트윗 없으면 ""로 삽입 
        const nweetPosting = {
            text:nweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
            attachmentUrl,
        };

         await addDoc(collection(dbService, "nweets"), nweetPosting);
         setNweet("");
         setAttachment("");
         fileInput.current.value ="";
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
            const{currentTarget:{result}} = finishedEv;
            setAttachment(result);
            // setAttachment(finishedEv.currentTarget.result);
        };
        reader.readAsDataURL(theFile);
    };
    
    const onClearAttachment = ()=>{
        setAttachment("");
        fileInput.current.value ="";

    }
  return (  
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
            )

}
export default NweetFactory;