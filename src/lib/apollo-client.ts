import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { initializeContentStore } from "./markdown/content-initializer";

// Initialize content store before creating schema
await initializeContentStore();

// Create the executable schema for SchemaLink
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
});
