export const REGEX = {
    // minimo 8 caracteres, ao menos 1 letra maiuscula e um caracter especial
    password: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    // 6 a 9 dígitos numéricos + dígito final (0–9 ou X)
    rg: /^\d{6,9}[0-9Xx]$/,
    // exatamente 8 dígitos numéricos
    zipCode: /^\d{8}$/,
} as const;