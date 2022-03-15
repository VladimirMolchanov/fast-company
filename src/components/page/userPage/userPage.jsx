import React from "react";
import PropTypes from "prop-types";
import MeetingsCard from "../../ui/meetingsCard";
import QualitiesCard from "../../ui/qualitiesCard";
import UserCard from "../../ui/userCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUsers";

const UserPage = ({ userId }) => {
    const { getUserById } = useUser();
    const user = getUserById(userId);

    const renderUser = (user) => {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard data={user.qualities} />
                            <MeetingsCard value={user.completedMeetings} />
                        </div>
                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return <>{user ? renderUser(user) : <h1>Loading...</h1>}</>;
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
