import React from "react";
import { Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/navBar";

export const App = () => {
    return (
        <>
            <NavBar/>
            <Route path="/" exact component={Main}/>
            <Route path="/login" component={Login}/>
            <Route path="/users/:userId" component={Users}/>
            <Route path="/users" exact component={Users}/>
        </>
    );
};
