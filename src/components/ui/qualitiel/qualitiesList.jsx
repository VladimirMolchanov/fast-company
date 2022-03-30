import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useSelector } from "react-redux";
import { getQualitiesByIds, getQualitiesLoadingStatus } from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    return <>{!isLoading ? qualitiesList.map((qual) => <Quality {...qual} key={qual._id} />) : "Loading..."}</>;
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
