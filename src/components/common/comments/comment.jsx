import React, { useEffect, useState } from "react";
import { displayDate } from "../../../utils/displayDate";
import PropTypes from "prop-types";

const Comment = ({ content, created_at, created, _id, id, userId, onRemove }) => {
    const [user] = useState();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
    }, []);
    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                {isLoading ? (
                    "Loading..."
                ) : (
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle"
                                width="150"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user && user.name}{" "}
                                            <span className="small">- {displayDate(created_at)}</span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(_id)}>
                                            <i className="bi bi-x-lg" />
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
Comment.propTypes = {
    content: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    created: PropTypes.string,
    _id: PropTypes.string,
    id: PropTypes.string,
    userId: PropTypes.string,
    onRemove: PropTypes.func
};

export default Comment;
