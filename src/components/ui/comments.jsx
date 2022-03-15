import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import useComments from "../../hooks/useComments";
const Comments = () => {
    const { userId } = useParams();
    const [comments, setComment] = useState([]);
    const { createComment } = useComments();
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => setComment(data));
    }, []);
    const handleSubmit = (data) => {
        createComment(data);
    };
    const handleRemoveComment = (id) => {
        api.comments.remove(id).then((id) => {
            setComment(comments.filter((x) => x._id !== id));
        });
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {sortedComments.length > 0 && (
                        <div className="card mb-3">
                            <div className="card-body ">
                                <h2>Comments</h2>
                                <hr />
                                <CommentsList comments={sortedComments} onRemove={handleRemoveComment} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Comments;
