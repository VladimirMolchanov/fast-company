import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserForm from "../../ui/userForm";

const UserEditPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});

    useEffect(() => {
        let cleanup = false;
        api.professions.fetchAll().then((data) => {
            if (!cleanup) setProfessions(data);
        });
        api.qualities.fetchAll().then((data) => {
            if (!cleanup) setQualities(data);
        });
        return () => (cleanup = true);
    }, []);

    useEffect(() => {
        let cleanup = false;
        api.users.getById(userId).then((data) => {
            if (!cleanup) setUser(data);
        });
        return () => (cleanup = true);
    }, []);

    return (
        <>
            {user && professions && qualities
                ? <UserForm
                    user={user}
                    professions={professions}
                    qualities={qualities}/>
                : <h1>Loading...</h1>
            }
        </>
    );
};
UserEditPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserEditPage;
