import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    async function singUp({ email, password }) {
        const key = "AIzaSyCn3dn0SjT2GKu477HW673zpH3Pz3M5T1M";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${key}`;
        const { data } = await axios.post(url, { email, password, returnSecureToken: true });
        console.log(data);
    }
    return (
        <>
            <AuthContext.Provider value={{ singUp }}>{children}</AuthContext.Provider>
        </>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
