const {gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Post {
        id: ID!
        title: String
        content: String
    }
    
    input PostInput {
        title: String!
        content: String!
    }
    
    type Query {
        getPost(_id: ID!): Post 
        getPosts: [Post]
    }

    type Mutation {
        createPost( input: PostInput ): Post
        updatePost(_id: ID!, input: PostInput): Post
        deletePost(_id: ID!) : Post
    }
`;

module.exports =  typeDefs;