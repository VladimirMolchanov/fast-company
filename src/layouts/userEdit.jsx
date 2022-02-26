import React from "react";
import { useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage";

const UserEdit = () => {
    const params = useParams();
    const userId = params.userId;
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <UserEditPage userId={userId}/>
                </div>
            </div>
        </div>
    );
};

export default UserEdit;
