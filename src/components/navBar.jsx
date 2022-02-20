import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="nav">
            <Link className="nav-link" to="/">Main</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/users">Users</Link>
        </nav>
    );
};
NavBar.propTypes = {};

export default NavBar;
