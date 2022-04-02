import React from "react";
import UserForm from "../../ui/userForm";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/profession";
import { getCurrentUserData } from "../../../store/users";

const UserEditPage = () => {
    const user = useSelector(getCurrentUserData());
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
