export const initialState: PasswordState = {
    old_password: '',
    new_password: '',
}

export interface PasswordState {
    old_password: string;
    new_password: string;
}