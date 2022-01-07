import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';


// userObj을 여러 컴포넌트에 다 적용하는 이유는 
// 소스를 authService로 하나씩 넣는 것보다 소스가 하나로 통일되어 한번에 변화된다. 
// App에서 처음 userObj를 만들고 routher에 아래와 같이넣은다음에 나머지에도 넣어줌 
const AppRouter= ({refreshUser, isLoggedIn, userObj})=>{
 
 return (

    <Router>
        {isLoggedIn && <Navigation userObj={userObj}/>}
        <Switch>
            <>
            {isLoggedIn?(
                <div
                style={{
                  maxWidth: 890,
                  width: "100%",
                  margin: "0 auto",
                  marginTop: 80,
                  display: "flex",
                  justifyContent: "center",
                }}>
                            
            <Route exact path="/">
                <Home userObj={userObj}/>
            </Route> 
            <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser}/>
            </Route> 
             </div>
             ) : (
            <Route exact path="/">
                <Auth/>
            </Route>
            )}
            </>
        </Switch>
    </Router>
 )

};
export default AppRouter;