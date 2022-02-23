import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, error, label }) => {
    return (
        <div className="mb-4">
            <label className="form-label">
                {label}
            </label>
            {options.map((option) => (
                <div key={option.name + "_" + option.value} className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name={name}
                        id={option.name + "_" + option.value}
                        checked={option.value === value}
                        value={option.value}
                        onChange={onChange}
                    />
                    <label htmlFor={option.name + "_" + option.value} className="form-check-label">
                        {option.name}
                    </label>
                </div>
            ))}

        </div>
    );
};
RadioField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string,
    name: PropTypes.string
};

export default RadioField;
