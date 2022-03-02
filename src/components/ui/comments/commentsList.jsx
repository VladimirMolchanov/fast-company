import React, { useEffect, useState } from "react";
import api from "../../../api";
import Comment from "./comment";
import PropTypes from "prop-types";
import _ from "lodash";
import CommentForm from "./commentForm";

const CommentsList = ({ pageId }) => {
    const [comments, setComments] = useState();
    useEffect(() => {
        let cleanup = false;
        api.comments.fetchCommentsForUser(pageId).then((data) => {
            if (!cleanup && data) {
                return Promise.all(data.map((comment) => {
                    return api.users.getById(comment.userId).then((user) => {
                        return {
                            ...comment,
                            user
                        };
                    });
                }));
            }
        }).then((data) => {
            if (!cleanup) setComments(data);
        });
        return () => (cleanup = true);
    }, []);

    const handleDelete = (id) => {
        let cleanup = false;
        api.comments.remove(id).then(() => {
            return api.comments.fetchCommentsForUser(pageId);
        }).then((data) => {
            if (!cleanup && data) {
                return Promise.all(data.map((comment) => {
                    return api.users.getById(comment.userId).then((user) => {
                        return {
                            ...comment,
                            user
                        };
                    });
                }));
            }
        }).then((data) => {
            if (!cleanup) setComments(data);
        });
        return () => (cleanup = true);
    };

    const handleCallback = () => {
        api.comments.fetchCommentsForUser(pageId).then((data) => {
            if (data) {
                return Promise.all(data.map((comment) => {
                    return api.users.getById(comment.userId).then((user) => {
                        return {
                            ...comment,
                            user
                        };
                    });
                }));
            }
        }).then((data) => {
            setComments(data);
        });
    };

    const sortComment = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <CommentForm onCallback={handleCallback}/>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr/>
                    {sortComment
                        ? sortComment.map((comment) => (
                            <Comment
                                id={comment._id}
                                key={comment._id}
                                name={comment.user.name}
                                content={comment.content}
                                createdAt={+comment.created_at}
                                onDelete={handleDelete}
                            />
                        ))
                        : <p>Loading...</p>
                    }
                </div>
            </div>
        </>
    );
};
CommentsList.propTypes = {
    pageId: PropTypes.string.isRequired
};

export default CommentsList;
