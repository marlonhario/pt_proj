import "dotenv/config";
import "reflect-metadata";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { createSchema } from "./utils/createSchema";
import fileupload from "express-fileupload";
import routes from "./routes";
import path from "path";
import { run } from "./utils/signalSystem";
var bodyParser = require("body-parser");

(async () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: process.env.REQUEST_ORIGIN,
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(fileupload());
  app.use(bodyParser.json());
  app.use(routes);
  app.use(express.static(path.join(__dirname, "public")));

  //Listen to IP and address
  const server = http.createServer(app);
  server.listen(
    {
      port: process.env.GRAPHPORT,
      host: process.env.IP_ADDRESS,
    },
    async () => {
      console.log("Graph schema installed...");

      await createConnection();

      const schema = await createSchema();

      const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
      });

      apolloServer.applyMiddleware({ app, cors: false });


      console.log("Graph running...");
    }
  );
})();
