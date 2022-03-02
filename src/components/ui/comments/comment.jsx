import React, { useState } from "react";
import PropTypes from "prop-types";
import { conversionDate } from "../../../utils/date";

const Comment = ({ id, name, content, createdAt, onDelete }) => {
    const [isPending, setIsPending] = useState(false);
    conversionDate(createdAt);
    const handleDelete = (id) => {
        setIsPending(true);
        onDelete(id);
    };
    const style = {
        width: "21px",
        height: "21px"
    };
    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src="https://avatars.dicebear.com/api/avataaars/qweqwdas.svg"
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {name}
                                        <span className="small ms-2">
                                            {conversionDate(createdAt)}
                                        </span>
                                    </p>
                                    <button disabled={isPending} className="btn btn-sm text-primary d-flex align-items-center" onClick={() => handleDelete(id)}>
                                        {isPending
                                            ? <div style={style} className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
                                            : <i className="bi bi-x-lg"/>
                                        }

                                    </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Comment.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.number,
    onDelete: PropTypes.func
};

export default Comment;
