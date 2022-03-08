import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";

export const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <ProfessionProvider>
                    <Route path="/users/:userId?/:edit?" component={users} />
                    <Route path="/login/:type?" component={Login} />
                </ProfessionProvider>
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </>
    );
};
