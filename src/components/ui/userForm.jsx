import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import SelectFiled from "../common/form/selectFiled";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { validator } from "../../utils/validator";
import api from "../../api";
import { useHistory } from "react-router-dom";

const UserForm = ({ user, professions, qualities }) => {
    const history = useHistory();
    const [data, setData] = useState({
        name: user.name || "",
        email: user.email || "",
        profession: user.profession ? user.profession._id : "",
        sex: user.sex || "male",
        qualities: user.qualities ? user.qualities.map(qualitie => ({ label: qualitie.name, value: qualitie._id })) : []
    });
    const [error, setError] = useState({});
    const [isPending, setIsPending] = useState(false);

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
        const professionName = Object.keys(professions).find((name) => professions[name]._id === data.profession);
        const _qualities = data.qualities.map((qualitie) => {
            const qualitiesName = Object.keys(qualities).find((name) => qualities[name]._id === qualitie.value);
            return qualities[qualitiesName];
        });
        setIsPending(true);

        api.users.update(user._id, {
            name: data.name,
            email: data.email,
            sex: data.sex,
            profession: professions[professionName],
            qualities: _qualities
        }).then(() => {
            setIsPending(false);
            history.push(`/users/${user._id}`);
        });
    };

    return (
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
                options={professions}
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
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
            />
            <button
                type="submit"
                disabled={!isValid || isPending}
                className="btn btn-primary w-100 mx-auto"
            >
                {isPending &&
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                }
                Submit
            </button>
        </form>
    );
};
UserForm.propTypes = {
    user: PropTypes.object,
    professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    qualities: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default UserForm;
