import { getDataStatus, loadUsersList } from "../../../store/users";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";

const UsersLoader = ({ children }) => {
    const dataStatus = getDataStatus();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, []);
    if (!dataStatus) return "Loading";
    return children;
};
UsersLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default UsersLoader;
