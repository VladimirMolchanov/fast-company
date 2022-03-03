import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectFiled from "../form/selectFiled";
import TextareaField from "../form/textareaField";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберете от чьего тмени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const error = validator(data, validatorConfig);
        setErrors(error);
        return Object.keys(error).length === 0;
    };
    useEffect(() => {
        api.users.fetchAll().then(setUsers);
    }, []);
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayOfUsers = users && Object.keys(users).map((userId) => ({
        name: users[userId].name,
        value: users[userId]._id
    }));
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectFiled
                    onChange={handleChange}
                    options={arrayOfUsers}
                    name="userId"
                    value={data.user}
                    defaultOption="выберите пользователя"
                    error={errors.userId}
                />
                <TextareaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
