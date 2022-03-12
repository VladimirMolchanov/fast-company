import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import QualityProvider from "./hooks/useQuality";

export const App = () => {
    return (
        <>
            <NavBar />

            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route path="/users/:userId?/:edit?" component={users} />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>

            <ToastContainer />
        </>
    );
};
