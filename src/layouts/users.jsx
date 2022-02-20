import React from "react";
import UserComponent from "../components/users";
import { useParams } from "react-router-dom";
import User from "../components/user";

const Users = () => {
    const params = useParams();
    const userId = params.userId;
    return (
        <>
            {userId
                ? <User userId={userId}/>
                : <UserComponent/>
            }
        </>
    );
};

export default Users;
