import { Collection, Db, MongoClient } from "mongodb";

import { TimesheetServer } from "../pages/[timesheet]";

const connect_to_db = async (connection_vars: {
  [key: string]: string;
}): Promise<{
  client: MongoClient;
  database: Db;
  mongoCollection: Collection<TimesheetServer>;
}> => {
  const client = new MongoClient(connection_vars.MONGODB_URI);
  await client.connect();
  const database = client.db(connection_vars.MONGODB_DB);

  return {
    client,
    database,
    mongoCollection: database.collection<TimesheetServer>(
      connection_vars.MONGODB_COLLECTION
    ),
  };
};

export default connect_to_db;
