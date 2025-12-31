import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/lib/graphql/schema";
import { resolvers } from "@/lib/graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
  includeStacktraceInErrorResponses: process.env.NODE_ENV !== "production",
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({
    // You can add any context here that your resolvers might need
    // For example: authentication, database connections, etc.
  }),
});

export { handler as GET, handler as POST };
