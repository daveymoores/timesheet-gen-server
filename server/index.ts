import bodyParser from "body-parser";
import express, { Express } from "express";
import * as http from "http";
import { MongoClient, ObjectId } from "mongodb";
import next from "next";
import * as socketIo from "socket.io";

import { SignProps } from "../pages/[timesheet]/sign";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

interface RequestBody extends Omit<SignProps, "timesheet"> {
  signature_string: string;
}

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);
  const io: socketIo.Server = new socketIo.Server();

  const mongo_uri = process.env.MONGODB_URI;
  if (!mongo_uri) throw new Error("MONGODB_URI not set");

  const mongoClient = new MongoClient(mongo_uri);
  await mongoClient.connect();
  const database = mongoClient.db("timesheet-gen");
  const mongoCollection = database.collection("timesheet-temp-paths");

  io.attach(server);

  app.use(bodyParser.json());

  app.post("/api/signature", async (req, res) => {
    const run = async ({ id, by, signature_string }: RequestBody) => {
      try {
        await mongoClient.connect();
        const database = mongoClient.db("timesheet-gen");
        const timesheet_collection = database.collection(
          "timesheet-temp-paths"
        );

        const query = { _id: new ObjectId(id) };
        await timesheet_collection.findOneAndUpdate(
          query,
          {
            $set: {
              [`${by}_signature`]: signature_string,
            },
          },
          { upsert: true }
        );
      } finally {
        await mongoClient.close();
      }
    };

    try {
      await run(req.body);
      res.status(204);
    } catch (error) {
      res.status(400).send({ error });
    }
  });

  app.get("/:timesheet", (req, res) => {
    const pipeline = [
      { $match: { "fullDocument.random_path": req.body.timesheet } },
    ];
    const changeStream = mongoCollection.watch(pipeline);

    io.on("connect", (socket: socketIo.Socket) => {
      changeStream.on("change", ({ updateDescription }) => {
        const updateFields = updateDescription?.updatedFields;

        if (!updateFields) {
          socket.emit("signature_update", { signature: null, error: true });
          changeStream.close();
          return;
        }

        const signature = updateFields.user_signature;
        const signee = Object.keys(updateFields).find(
          (key: string) => key.indexOf("_signature") > -1
        );

        const payload = { signature, signee, error: false };

        socket.emit("signature_update", payload);
        changeStream.close();
      });

      socket.on("disconnect", () => {
        console.log("client disconnected");
      });
    });

    return handle(req, res);
  });

  app.get("*", (req, res) => handle(req, res));
  // server.get("/:timesheet/sign", (req, res) => {
  //   const routeMatch = match("/:timesheet/sign", new URL(req.url).pathname);
  //   return app.render(req, res, routeMatch.params.timesheet, routeMatch.params);
  // });

  server.listen(3000, () => {
    console.log("Ready on http://localhost:3000");
  });
});