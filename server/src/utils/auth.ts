import { Users } from "../entity/Users";
import { sign, verify, decode } from "jsonwebtoken";

export const createAccessToken = (user: Users) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "7d",
    });
};

export const createVerificationToken = (email: string, password: string) => {
    return sign({ email: email, password: password }, process.env.VERIFICATION_TOKEN!, {
        expiresIn: "1h",
    });
};

export const verifyToken = (token: string) => {
    return verify(token, process.env.VERIFICATION_TOKEN!, (err) => {
        return err ? false : true;
    });
};

export const decodeToken = (token: string) => {
    return decode(token);
};

export const createRefreshToken = (user: Users) => {
    return sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "7d",
    });
};

export const createRememberMeToken = (user: Users) => {
    return sign({ email: user.email }, process.env.REACT_APP_REMEMBER!, {
        expiresIn: "30d",
    });
};
