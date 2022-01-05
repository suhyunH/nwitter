import React,{useState} from "react";


const Home = ()=>{
    const [nweet, setNweet] = useState("");
    const onSubmit =(ev)=>{
        ev.preventDefault();
    };
    const onChange = (ev)=>{
        const{target:{value}} = ev;
        setNweet(value);

    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="Nweet"/>
            </form>
        </div>

    );
    };
export default Home;