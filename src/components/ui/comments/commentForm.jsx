import React, { useEffect, useState } from "react";
import SelectFiled from "../../common/form/selectFiled";
import api from "../../../api";
import TextareaField from "../../common/form/textareaField";
import { validator } from "../../../utils/validator";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const CommentForm = ({ onCallback }) => {
    const params = useParams();
    const [data, setData] = useState({
        user: "",
        content: ""
    });
    const [error, setError] = useState({});
    const [options, setOptions] = useState();
    const [isPending, setIsPending] = useState(false);
    const handleChange = (target) => {
        if (target) {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setOptions(data.map((user) => ({
                name: user.name,
                value: user._id
            })));
        });
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        user: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        content: {
            isRequired: {
                message: "Пароль обязательна для заполнения"
            }
        }
    };

    const validate = () => {
        const error = validator(data, validatorConfig);
        setError(error);
        return Object.keys(error).length === 0;
    };
    const isValid = Object.keys(error).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        setIsPending(true);
        api.comments.add({
            pageId: params.userId,
            userId: data.user,
            content: data.content
        }).then(() => {
            setIsPending(false);
            onCallback();
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <SelectFiled
                    value={data.user}
                    onChange={handleChange}
                    options={options}
                    name="user"
                    error={error.user}
                />
                <TextareaField
                    label="Сообщение"
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    error={error.content}
                />
                <div className="d-flex justify-content-end">
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="btn btn-primary"
                    >
                        {isPending &&
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                        }
                        Опубликовать
                    </button>
                </div>
            </form>
        </>
    );
};
CommentForm.propTypes = {
    onCallback: PropTypes.func
};

export default CommentForm;
