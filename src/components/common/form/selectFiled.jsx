import React from "react";
import PropTypes from "prop-types";

const SelectFiled = ({ label, value, onChange, defaultOption, options, error, name }) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const optionsArray = (!Array.isArray(options) && typeof options === "object")
        ? Object.keys(options).map((optionName) => ({
            name: options[optionName].name,
            value: options[optionName]._id
        }))
        : options;

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <select
                className={getInputClasses()}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
            >
                <option disabled value="">{defaultOption}</option>
                {optionsArray && optionsArray.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
            {error && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};
SelectFiled.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string,
    name: PropTypes.string
};

export default SelectFiled;
