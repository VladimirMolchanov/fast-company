import React from "react";
import UserForm from "../../ui/userForm";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQuality } from "../../../hooks/useQuality";

const UserEditPage = () => {
    const { currentUser: user } = useAuth();
    const { professions, isLoading: isLoadingProfessions } = useProfessions();
    const { qualities, isLoading: isLoadingQualities } = useQuality();
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
