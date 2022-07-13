import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import * as http from "http";
import { ObjectId } from "mongodb";
import next from "next";

import { SignProps } from "../pages/[timesheet]/sign";
import connect_to_db from "../utils/connect_to_db";
import get_env_vars, { ENV_VARS } from "../utils/get_env_vars";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

interface RequestBody extends Omit<SignProps, "timesheet"> {
  signature_string: string;
}

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);

  const env_vars = get_env_vars(ENV_VARS);
  const { mongoCollection } = await connect_to_db(env_vars);

  app.use(cors());
  app.use(bodyParser.json());

  app.post("/api/signature", async (req, res) => {
    const run = async ({ id, by, signature_string }: RequestBody) => {
      try {
        const query = { _id: new ObjectId(id) };
        await mongoCollection.findOneAndUpdate(
          query,
          {
            $set: {
              [`${by}_signature`]: signature_string,
            },
          },
          { upsert: true }
        );
      } catch (err) {
        console.error(err);
      }
    };

    try {
      await run(req.body);
      res.status(204);
    } catch (error) {
      res.status(400).send({ error });
    }
  });

  app.get("/favicon.ico", function (req, res) {
    res.sendStatus(204);
  });

  app.get("/:timesheet", (req, res) => {
    return handle(req, res);
  });

  app.get("*", (req, res) => handle(req, res));

  server.listen(3000, () => {
    console.log(
      "Ready on ",
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.SITE_URL
    );
  });
});
