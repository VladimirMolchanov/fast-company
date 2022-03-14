import React, { useEffect, useState } from "react";
// import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const history = useHistory();
    const { signIn } = useAuth();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [error, setError] = useState({});
    const handleChange = (target) => {
        if (target) {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };

    const validateScheme = yup.object().shape({
        password: yup.string().required("Пароль обязательна для заполнения"),
        // .matches(/^(?=.*[A-Z])/, "Пароль должен содержать хотя бы одну заглавную букву")
        // .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одно число")
        // .matches(/(?=.*[!@#$%^&*])/, "Пароль должен содержать один из специальных символов !@#$%^&*")
        // .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8 символов"),
        email: yup.string().required("Электронная почта обязательна для заполнения").email("Email введен некорректно")
    });

    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: "Электронная почта обязательна для заполнения"
    //         },
    //         isEmail: {
    //             message: "Email введен некорректно"
    //         }
    //     },
    //     password: {
    //         isRequired: {
    //             message: "Пароль обязательна для заполнения"
    //         },
    //         isCapitalSymbol: {
    //             message: "Пароль должен содержать хотя бы одну заглавную букву"
    //         },
    //         isContainDigit: {
    //             message: "Пароль должен содержать хотя бы одно число"
    //         },
    //         min: {
    //             message: "Пароль должен состоять минимум из 8 символов",
    //             value: 8
    //         }
    //     }
    // };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        // const error = validator(data, validatorConfig);
        validateScheme
            .validate(data)
            .then(() => {
                setError({});
            })
            .catch((err) => {
                setError({
                    [err.path]: err.message
                });
            });
        // setError(error);
        return Object.keys(error).length === 0;
    };
    const isValid = Object.keys(error).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await signIn(data);
            history.push(history.location.state.from.pathname ? history.location.state.from.pathname : "");
        } catch (error) {
            setError(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={error.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={error.password}
            />
            <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
                Оставаться в системе
            </CheckBoxField>
            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
