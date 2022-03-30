import React from "react";
import UserForm from "../../ui/userForm";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/profession";

const UserEditPage = () => {
    const { currentUser: user } = useAuth();
    const professions = useSelector(getProfessions());
    const isLoadingProfessions = useSelector(getProfessionsLoadingStatus());
    const qualities = useSelector(getQualities());
    const isLoadingQualities = useSelector(getQualitiesLoadingStatus());

    return (
        <>
            {user && !isLoadingProfessions && !isLoadingQualities ? (
                <UserForm user={user} professions={professions} qualities={qualities} />
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default UserEditPage;
