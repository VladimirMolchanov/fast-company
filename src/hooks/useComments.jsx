import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../service/comment.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const CommmentsContext = React.createContext();

export const useComment = () => {
    return useContext(CommmentsContext);
};

const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getComments();
    }, [userId]);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function createComment(data) {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id,
            _id: nanoid()
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments((prevState) => [...prevState, content]);
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (e) {
            errorCatcher(e);
        } finally {
            setLoading(false);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    return (
        <>
            <CommmentsContext.Provider value={{ isLoading, comments, createComment }}>
                {children}
            </CommmentsContext.Provider>
        </>
    );
};
CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default CommentsProvider;
