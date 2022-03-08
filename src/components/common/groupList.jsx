import React from "react";
import PropTypes from "prop-types";

function isArray(variable) {
    return variable !== null && typeof variable === "object" && Array.isArray(variable);
}

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    const arrItems = isArray(items) ? items : Object.keys(items).map((key) => items[key]);
    return (
        <ul className="list-group">
            {arrItems.map((item) => (
                <li
                    key={item[valueProperty]}
                    className={"list-group-item " + (item === selectedItem ? "active" : "")}
                    onClick={() => onItemSelect(item)}
                    role="button">
                    {item[contentProperty]}
                </li>
            ))}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
