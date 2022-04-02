import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../service/user.service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../store/users";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};
const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const currentUser = useSelector(getCurrentUserData());

    const [isLoading, setIsLoading] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            const newUsers = [...users];
            const indexUser = users.findIndex((u) => u._id === currentUser._id);
            newUsers[indexUser] = currentUser;
            setUsers(newUsers);
        }
        // setUsers((prevState) => ({
        //     ...prevState,
        //     [currentUser._id]: currentUser
        // }));
    }, [currentUser]);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function updateUser(data) {
        try {
            const { content } = await userService.update(data);
            setUsers((prevState) => ({
                ...prevState,
                [content._id]: content
            }));
        } catch (e) {
            errorCatcher(e);
            throw e;
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    }
    function getUserById(userId) {
        return users.find((u) => u._id === userId);
    }

    return (
        <>
            <UserContext.Provider value={{ users, getUserById, updateUser }}>
                {!isLoading ? children : "Loading..."}
            </UserContext.Provider>
        </>
    );
};
UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default UserProvider;
