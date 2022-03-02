import React from "react";
import PropTypes from "prop-types";

const InfoCards = ({ name, profession, rate, onSettings }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={onSettings}>
                    <i className="bi bi-gear"/>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                            .toString(36)
                            .substring(7)}.svg`
                        }
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{profession}</p>
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary" role="button"/>
                            <i className="bi bi-caret-up text-secondary" role="button"/>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
InfoCards.propTypes = {
    name: PropTypes.string.isRequired,
    profession: PropTypes.string,
    rate: PropTypes.number,
    onSettings: PropTypes.func
};

export default InfoCards;
