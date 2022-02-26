import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="nav">
            <li>
                <Link className="nav-link" aria-current="page" to="/">Main</Link>
            </li>
            <li>
                <Link className="nav-link" aria-current="page" to="/login">Login</Link>
            </li>
            <li>
                <Link className="nav-link" aria-current="page" to="/users">Users</Link>
            </li>
        </nav>
    );
};
NavBar.propTypes = {};

export default NavBar;
