import React from "react";
import{Link} from"react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AuthForm from './AuthForm';

const Navigation =({userObj})=>
<nav>
    <div>
        <Link to="/" style={{}}> <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" /></Link>
    </div>
    <div>
            <Link to="/profile" 
                style={{marginLeft:10, marginRight:0, display:"flex",flexDirection:"column",alignItems: "center",
                fontSize: 12,}}> 
                {userObj.photoURL? <img src={userObj.photoURL} className='profilePic'/>: <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />}
                <span style={{ marginTop: 10 }}>
                  {userObj.displayName?  `${userObj.displayName}'s Profile`: "Profile"}
                </span>
            </Link>
    </div>
</nav>

export default Navigation;