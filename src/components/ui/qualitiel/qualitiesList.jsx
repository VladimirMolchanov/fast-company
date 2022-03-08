import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQuality();
    const q = qualities.map((id) => getQuality(id));
    return <>{!isLoading ? q.map((qual) => <Quality {...qual} key={qual._id} />) : "Loading..."}</>;
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
