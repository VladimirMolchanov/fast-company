import React from "react";
import TextField from "../common/form/textField";
import PropTypes from "prop-types";

const Search = ({ onSearch, value }) => {
    const handleChange = ({ target }) => {
        onSearch(target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label=""
                    name="search"
                    value={value}
                    onChange={handleChange}
                    placeholder="Search"
                />
            </form>
        </>
    );
};
Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default Search;
