import isEmpty from 'is-empty';
import Validator from 'validator';

export type RegisterData = {
    name: string;
    email: string;
    password: string;
    password2: string;
};

export const validateRegisterInput = (data: RegisterData) => {
    const errors = <RegisterData>{};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is empty';
    }

    if (Validator.isEmpty(data.password2))
        errors.password2 = 'Confirm Password field is required';

    if (!Validator.isLength(data.password, { min: 2, max: 30 }))
        errors.password = 'Password must be between 2 and 30 characters';

    if (!Validator.equals(data.password, data.password2))
        errors.password2 = 'Passwords must match';

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
