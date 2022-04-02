export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Не правильно введен пароль";
        case "EMAIL_NOT_FOUND":
            return "Такого email не существует";
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует";
        default:
            return "Слишком много попыток входа. Попробуйте позже";
    }
}
