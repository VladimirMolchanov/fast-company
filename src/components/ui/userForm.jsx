/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import SelectFiled from "../common/form/selectFiled";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { validator } from "../../utils/validator";
import BackHistoryButton from "../common/backButton";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/users";

const UserForm = ({ user, professions, qualities }) => {
    const dispatch = useDispatch();

    /* eslint-disable */
    const [data, setData] = useState({
        name: user.name || "",
        email: user.email || "",
        profession: user.profession,
        sex: user.sex || "male",
        qualities: user.qualities
            ? user.qualities.map((_id) => {
                  const q = qualities.find((quality) => quality._id === _id);
                  return q && { label: q.name, value: q._id };
              })
            : []
    });
    /* eslint-enable */

    const [error, setError] = useState({});
    const [isPending, setIsPending] = useState(false);

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const professionList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const handleChange = (target) => {
        if (target) {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательна для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Профессия обязательна для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
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

        const payload = {
            ...user,
            name: data.name,
            email: data.email,
            sex: data.sex,
            profession: data.profession,
            qualities: data.qualities.map((item) => item.value)
        };

        const redirect = `/users/${user._id}`;

        dispatch(updateUser(payload, redirect));
    };

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={error.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={error.email}
                        />
                        <SelectFiled
                            onChange={handleChange}
                            options={professionList}
                            defaultOption="Choose..."
                            error={error.profession}
                            label="Выбери свою профессию"
                            name="profession"
                            value={data.profession}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={data.sex}
                            name="sex"
                            onChange={handleChange}
                        />
                        <MultiSelectField
                            options={qualitiesList}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            type="submit"
                            disabled={!isValid || isPending}
                            className="btn btn-primary w-100 mx-auto">
                            {isPending && (
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                />
                            )}
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
UserForm.propTypes = {
    user: PropTypes.object,
    professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    qualities: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default UserForm;
