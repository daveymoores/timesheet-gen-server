// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { SignProps } from "../[timesheet]/sign";

interface RequestBody extends Omit<SignProps, "timesheet"> {
  signature_string: string;
}

interface RequestData extends NextApiRequest {
  body: RequestBody;
}

const handler = async (req: RequestData, res: NextApiResponse) => {
  const URI = process.env.MONGODB_URI;

  if (!URI) {
    throw new Error("MONGODB_URI is not set");
  }

  const client = new MongoClient(URI);

  const run = async ({ id, by, signature_string }: RequestBody) => {
    try {
      await client.connect();
      const database = client.db("timesheet-gen");
      const timesheet_collection = database.collection("timesheet-temp-paths");

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
      await client.close();
    }
  };

  try {
    await run(req.body);
    res.status(204);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export default handler;
