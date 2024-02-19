import express from "express";
import { verify } from "jsonwebtoken";
import { sendRefreshToken, rememberMeRefreshToken } from "./sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../auth/Auth";
import { Users } from "../entity/Users";
import BackTestController from "../controllers/back-testing/BackTestController";

var router = express.Router();

router
    .get("/", (_req, res) => {
        res.send("Server is now running...");
    })
    .post("/refresh_token", async (req, res) => {
        const token = req.cookies.ck_login;
        const ptRememberMe = req.cookies.ptRememberMe;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }

        let payload: any = null;

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err) {
            console.log(err);
            sendRefreshToken(res, "");
            return res.send({ ok: false, accessToken: "" });
        }

        if (ptRememberMe) {
            try {
                verify(ptRememberMe, process.env.REACT_APP_REMEMBER!);
            } catch (err) {
                console.log(err);
                rememberMeRefreshToken(res, "");
                sendRefreshToken(res, "");
                return res.send({ ok: false, accessToken: "" });
            }
        }

        const user = await Users.findOne({ id: payload.userId });

        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }

        sendRefreshToken(res, createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user) });
    })
    .get("/request-back-testing", (req, res) => {
        var controller = new BackTestController();
        var data = req.body;
        controller.processRequest(data, (response: any) => {
            res.set("status", response.status);
            res.send(response);
        });
    })
    .post("/upload", async (req, res) => {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return null;
        }
        const token = authorization.split(" ")[1];

        if (req.files === null) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        if (req.files) {
            const file: any = req.files.file;
            const date: number = Date.now();

            file.mv(`${__dirname}/public/images/${date + "-" + file.name}`, async (err: any) => {
                if (err) {
                    return res.status(500).send(err);
                }

                const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
                const user = await Users.findOne(payload.userId);

                if (!user) {
                    return null;
                }

                user.profile_image = date + "-" + file.name;
                await user.save();

                return res.json({ fileName: user.profile_image });
            });
        }

        return res;
    });

export default router;
