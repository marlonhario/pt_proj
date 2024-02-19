import { useState, useEffect } from 'react';
import { useMeQuery } from '../../../../generated/graphql';

interface Person {
    email: string;
    first_name: string;
    last_name: string;
    time_zone: string;
}

const useForm = (callback: any, validate: any) => {
    const { data, loading } = useMeQuery();
    let is_email: string = '';
    let is_first: string = '';
    let is_last: string = '';
    let is_timezone: string = '';
   
    if (loading) {
        is_email = '';
        is_first = '';
        is_last = '';
    } else if ((data && data.me?.email)
        || (data && data.me?.first_name)
        || (data && data.me?.first_name)
        || (data && data.me?.last_name)
        || (data && data.me?.time_zone)) {
        is_email = data.me.email;
        is_first = data.me.first_name;
        is_last = data.me.last_name;
        is_timezone = data.me.time_zone;
    }
 
    const [values, setValues] = useState<Person>(
        {
            email: is_email,
            first_name: is_first,
            last_name: is_last,
            time_zone: is_timezone
        }
    );

    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState<any>(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback(values);
        }
    }, [errors]);

    const handleSubmit = (event: React.FormEvent) => {
        if (event) event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    const handleDropdown = (e: any) => {
        setValues(values => ({ ...values, time_zone: e.value }));
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        handleDropdown
    }
};

export default useForm;