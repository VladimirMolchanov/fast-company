import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const User = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleBtn = () => {
        history.push("/users");
    };

    const renderUser = (user) => {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities}/>
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button
                    onClick={() => {
                        handleBtn();
                    }}
                >Все пользователи</button>
            </>
        );
    };

    return (
        <>
            {user
                ? renderUser(user)
                : <h1>Loading...</h1>
            }
        </>
    );
};
User.propTypes = {
    userId: PropTypes.string
};

export default User;
