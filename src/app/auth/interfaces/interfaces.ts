export interface User {
    email: string;
    password: string;
    showPassword: boolean;
    code: string;
    name: string;
}

export interface CognitoUserSession {
    idToken: string;
    refreshToken: string;
    accessToken: string;
}