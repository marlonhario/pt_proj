import React from 'react';
import { toast } from 'react-toastify';

export const toastify = (statusCode: number, message: string) => {
    const getMessage = <p>{message}</p>;

    if (statusCode === 100 ) return toast.info(getMessage);
    if (statusCode === 199 ) return toast.warning(getMessage);
    if (statusCode >= 200 && statusCode <= 226) return toast.success(getMessage);
    if (statusCode >= 400 && statusCode <= 598 ) return toast.error(getMessage);
    return toast.warning(getMessage);
};