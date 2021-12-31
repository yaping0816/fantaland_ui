import { useState } from 'react';

export default function useForm(submitCallback) {
    const [values, setValues] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        e.target.reset();
        submitCallback && submitCallback(values);
        setValues({});
    }

    function handleChange(e) {
        e.persist();
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return [handleSubmit, handleChange, values];
}
