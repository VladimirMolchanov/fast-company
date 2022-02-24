import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ options, onChange, name, label }) => {
    const optionsArray = (!Array.isArray(options) && typeof options === "object")
        ? Object.keys(options).map((optionName) => ({
            label: options[optionName].name,
            value: options[optionName]._id
        }))
        : options;

    const handleChange = (value) => {
        onChange({
            name: name,
            value
        });
    };

    return (
        <>
            <div className="mb-4">
                {label &&
                    <label className="form-label" htmlFor={name}>{label}</label>
                }
                <Select
                    isMulti
                    options={optionsArray}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                    name={name}
                    closeMenuOnSelect={false}
                />
            </div>
        </>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string
};

export default MultiSelectField;
