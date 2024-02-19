export interface FormData {
    email: string;
    password: string;
    passwordVerify?: string;
}

export interface Props {
    showPassword: boolean;
    formData: FormData;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleFields: (name: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    setShowPassword: (value: boolean) => void;
}