import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";
import UserEditPage from "../components/page/userEditPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList } from "../store/users";

const Users = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { userId, edit } = params;
    const { currentUser } = useAuth();
    const dataStatus = useSelector(getDataStatus());
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUsersList());
        }
    }, []);
    if (!dataStatus) return "Loading";
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        userId === currentUser._id ? (
                            <UserEditPage />
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
