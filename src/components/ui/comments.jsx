import React, { useEffect } from "react";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import { useDispatch, useSelector } from "react-redux";
import {
    createComments,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const comments = useSelector(getComments());
    const currentUserId = useSelector(getCurrentUserId());
    const handleSubmit = (data) => {
        const newData = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId,
            _id: nanoid()
        };
        dispatch(createComments(newData));
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
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
                                {!isLoading ? (
                                    <CommentsList comments={sortedComments} onRemove={handleRemoveComment} />
                                ) : (
                                    "Loading"
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Comments;
