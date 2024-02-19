export interface LoginState {
    email: string;
    password: string;
    isLoading: boolean;
    error: string;
    isLoggedIn: boolean;
    variant: 'login' | 'forgetPassword';
}