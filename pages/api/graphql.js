import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import connectDb from "../../apollo/db";

// connectDb();

const apolloServer = new ApolloServer({ schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
