import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import * as http from "http";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);

  app.use(cors());
  app.use(bodyParser.json());

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
      dev ? "http://localhost:3000" : process.env.SITE_URL
    );
  });
});
