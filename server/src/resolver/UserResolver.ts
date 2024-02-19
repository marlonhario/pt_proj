import { isAuth } from "../utils/isAuth";
import { verify } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import { createRememberMeToken, createRefreshToken, createVerificationToken, verifyToken, decodeToken } from "./../auth/Auth";
import { createAccessToken } from "../utils/auth";
import { MyContext } from "../utils/MyContext";
import { LoginResponse, UpdateResponse } from "./../types/response/login_response";
import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware, Int } from "type-graphql";
import { Users } from "../entity/Users";
import { UpdateUserInput } from "./../types/inputs/update_user_input";
import { sendRefreshToken, rememberMeRefreshToken } from "../utils/sendRefreshToken";
import { getConnection } from "typeorm";

import { SocketLabsClient } from "@socketlabs/email";

@Resolver()
export class UserResolver {
    @Query(() => String)
    UserTest() {
        return "User resolver!";
    }

    @Query(() => String)
    hello() {
        return "hi!";
    }

    @Query(() => Users, { nullable: true })
    async me(@Ctx() context: MyContext) {
        const authorization = context.req.headers["authorization"];

        if (!authorization) {
            return null;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
            const user = await Users.findOne(payload.userId);

            if (user) {
                return user;
            }
            return null;
        } catch (err) {
            return null;
        }
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(@Ctx() { payload }: MyContext) {
        return `your user id is: ${payload!.userId}`;
    }

    @Query(() => [Users])
    users() {
        return Users.find();
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Arg("isRememberActive") isRememberActive: boolean,
        @Ctx() { res, req }: MyContext
    ): Promise<LoginResponse> {
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return {
                errors: {
                    field: "email",
                    message: "Email doesn't exist!",
                },
            };
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            return {
                errors: {
                    field: "password",
                    message: "Incorrect password!",
                },
            };
        }

        if (isRememberActive) {
            rememberMeRefreshToken(res, createRememberMeToken(user));
        }

        sendRefreshToken(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user),
            rememberMeToken: createRememberMeToken(user),
            user: user,
        };
    }

    @Mutation(() => Number)
    async register(@Arg("email") email: string, @Arg("password") password: string, @Ctx() { req }: MyContext) {
        const verificationDetails = createVerificationToken(email, password);

        const user = await Users.findOne({ where: { email } });
        if (!user) {
            const client = new SocketLabsClient(Number(process.env.SOCKETLABS_SERVER_ID), String(process.env.SOCKETLABS_API_KEY));

            const message = {
                to: email,
                from: process.env.EMAIL_FROM,
                subject: "Hello from Prosper Together",
                htmlBody: `<html>
                      <h1>Please click to link to activate</h1>
                      <p>${req.get("origin")}/verification/${verificationDetails}</p>
                      <hr />
                      <p>This email contain sensetive info</p>
                      <p></p>
                    </html>`,
                messageType: "basic",
            };

            client.send(message).then(
                (res: any) => {
                    console.log(res);
                    return 200;
                },
                (err: any) => {
                    console.log(err);
                    return 400;
                }
            );

            return 400;
        }
        return 409;
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res }: MyContext) {
        sendRefreshToken(res, "");
        rememberMeRefreshToken(res, "");
        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
        await getConnection().getRepository(Users).increment({ id: userId }, "tokenVersion", 1);

        return true;
    }

    @Mutation(() => Number)
    async verification(@Arg("token") token: string) {
        if (token) {
            const isVerifyToken: any = verifyToken(token);

            if (isVerifyToken) {
                const getDecodedToken: any = decodeToken(token);
                const { email, password } = getDecodedToken;
                const user = await Users.findOne({ where: { email } });

                if (!user) {
                    const hashedPassword = await hash(password, 12);
                    try {
                        await Users.insert({
                            email,
                            password: hashedPassword,
                        });
                    } catch (error) {
                        return 400;
                    }
                    return 200;
                }
                return 409;
            }
            return 408;
        }
        return 400;
    }

    @Mutation(() => Boolean)
    async resetPassword(@Arg("token") token: string, @Arg("oldpass") old_password: string, @Arg("newpass") password: string) {
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        const user = await Users.findOne(payload.userId);

        if (!user) {
            throw new Error("could not find user");
        }

        const valid = await compare(old_password, user.password);

        if (!valid) {
            throw new Error("old password is not match!");
        } else {
            user.password = await hash(password, 12);

            await user.save();

            return true;
        }
    }

    @Mutation(() => UpdateResponse)
    async updateUserDetails(@Arg("token") token: string, @Arg("data") data: UpdateUserInput): Promise<UpdateResponse> {
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        const user = await Users.findOne(payload.userId);

        if (!user) {
            throw new Error("could not find user");
        }

        Object.assign(user, data);

        await user.save();

        return {
            user: user,
        };
    }

    @Mutation(() => LoginResponse)
    async getRememberMe(@Arg("token") token: string): Promise<LoginResponse> {
        if (token) {
            const payload: any = verify(token, process.env.REACT_APP_REMEMBER!);
            const email = payload.email;

            const user = await Users.findOne({ where: { email } });

            return {
                user: user,
            };
        }
    }
}
