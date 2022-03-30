import React from "react";
import UserForm from "../../ui/userForm";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities";

const UserEditPage = () => {
    const { currentUser: user } = useAuth();
    const { professions, isLoading: isLoadingProfessions } = useProfessions();
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
