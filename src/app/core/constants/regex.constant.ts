export const REGEX = {
    // minimo 8 caracteres, ao menos 1 letra maiuscula e um caracter especial
    password: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
}