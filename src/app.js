import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import users from "./layouts/users";
import NavBar from "./components/navBar";

export const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/users/:userId?" component={users}/>
                <Route path="/" exact component={Main}/>
                <Redirect to="/"/>
            </Switch>
        </>
    );
};
