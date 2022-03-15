import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";

const CommmentsContext = React.createContext();

export const useProfessions = () => {
    return useContext(CommmentsContext);
};

const CommmentsProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function createComment(data) {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id,
            _id: nanoid()
        };
    }
    return (
        <>
            <CommmentsContext.Provider value={{ comments, createComment }}>{children}</CommmentsContext.Provider>
        </>
    );
};

export default CommmentsProvider;
