export default function validate(values: any) {
    let errors: any = {};

    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.first_name) {
        errors.first_name = 'First name is required';
    }

    if (!values.last_name) {
        errors.last_name = 'Last name is required';
    }


    return errors;
};