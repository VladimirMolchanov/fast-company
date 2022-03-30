import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionsByIds, getProfessionsLoadingStatus, loadProfessionsList } from "../../store/profession";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionsByIds(id));

    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);

    if (!isLoading) {
        return <p>{prof.name}</p>;
    }
    return "loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
