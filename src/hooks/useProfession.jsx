import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProfessionService from "../service/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};
const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfessions();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getProfessions() {
        try {
            const { content } = await ProfessionService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function getProfession(id) {
        return professions.find((p) => p._id === id);
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    return (
        <>
            <ProfessionContext.Provider value={{ isLoading, professions, getProfession }}>
                {children}
            </ProfessionContext.Provider>
        </>
    );
};
ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default ProfessionProvider;
