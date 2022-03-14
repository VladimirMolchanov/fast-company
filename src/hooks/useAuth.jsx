import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../service/user.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../service/localStorage.service";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [currentUser, setUser] = useState();
    const [isLoading, setLoading] = useState(true);
    async function signIn({ email, password }) {
        const url = `accounts:signInWithPassword`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await getUserData();
        } catch (e) {
            errorCatcher(e);
            const { code, message } = e.response.data.error;
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Не правильно введен пароль"
                    };
                    throw errorObject;
                }
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Такого email не существует"
                    };
                    throw errorObject;
                }
            }
        }
    }
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    async function signUp({ email, password, ...rest }) {
        const url = `accounts:signUp`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                ...rest
            });
        } catch (e) {
            errorCatcher(e);
            const { code, message } = e.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (e) {
            errorCatcher(e);
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (e) {
            errorCatcher(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);
    return (
        <>
            <AuthContext.Provider value={{ signUp, currentUser, signIn }}>
                {!isLoading ? children : "Loading..."}
            </AuthContext.Provider>
        </>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
