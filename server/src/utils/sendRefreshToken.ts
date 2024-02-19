import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(
    "ck_login",
    token,
    {
      httpOnly: true,
      path: "/refresh_token"
    }
  );
}

export const rememberMeRefreshToken = (res: Response, token: string) => {
  res.cookie(
    "ptRememberMe",
    token,
    {
      path: "/"
    }
  );
}