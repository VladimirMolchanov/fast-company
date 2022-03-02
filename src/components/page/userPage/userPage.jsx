import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory, useLocation } from "react-router-dom";
import InfoCards from "../../ui/infoCards";
import MeetingsCard from "../../ui/meetingsCard";
import QualitiesCard from "../../ui/qualitiesCard";
import CommentsList from "../../ui/comments/commentsList";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleBtn = () => {
        history.push(`${location.pathname}/edit`);
    };

    const renderUser = (user) => {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <InfoCards
                                name={user.name}
                                profession={user.profession.name}
                                rate={user.rate}
                                onSettings={handleBtn}
                            />
                            <QualitiesCard qualities={user.qualities}/>
                            <MeetingsCard meetings={user.completedMeetings}/>
                        </div>
                        <div className="col-md-8">
                            <CommentsList pageId={user._id}/>
                        </div>
                    </div>
                </div>
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
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
