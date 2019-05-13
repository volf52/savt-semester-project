import isEmpty from 'is-empty';
import Validator from 'validator';

export type LoginData = {
    email: string;
    password: string;
};

export const validateLoginInput = (data: LoginData) => {
    const errors = <LoginData>{};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
