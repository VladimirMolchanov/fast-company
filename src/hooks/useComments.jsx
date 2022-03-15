import React, { useContext, useState } from "react";

const CommmentsContext = React.createContext();

export const useProfessions = () => {
    return useContext(CommmentsContext);
};

const CommmentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <>
            <CommmentsContext.Provider value={{ comments }}>{children}</CommmentsContext.Provider>
        </>
    );
};

export default CommmentsProvider;
