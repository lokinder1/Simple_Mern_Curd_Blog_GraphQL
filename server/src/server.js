// const { ApolloServer, gql } = require('apollo-server');
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("./database");

const typeDefs = require("./typeDefs/index.js");
const resolvers = require("./resolvers/index.js");

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);


