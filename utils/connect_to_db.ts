import { Collection, Db, MongoClient } from "mongodb";

const connect_to_db = async (connection_vars: {
  [key: string]: string;
}): Promise<{
  client: MongoClient;
  database: Db;
  mongoCollection: Collection<Document>;
}> => {
  const client = new MongoClient(connection_vars.MONGODB_URI);
  await client.connect();
  const database = client.db(connection_vars.MONGODB_DB);

  return {
    client,
    database,
    mongoCollection: database.collection(connection_vars.MONGODB_COLLECTION),
  };
};

export default connect_to_db;
