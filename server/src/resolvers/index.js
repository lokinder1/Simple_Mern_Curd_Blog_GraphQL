const { Post } = require("../models/post");

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getPost: async (root, { _id }) => {
      return await Post.findById(_id);
    },
    getPosts: async () => await Post.find({}).exec(),
  },
  Mutation: {
    createPost: async (root, {input}) => {
      try {
        let response = await Post.create(input);
        return response;
      } catch (e) {
        return e.message;
      }
    },

    updatePost: async (root, { _id, input }) => {
      try {
        return await Post.findOneAndUpdate(
          {
            _id,
          },
          input,
          {
            new: true,
          }
        );
      } catch (e) {
        return e.message;
      }
    },
    deletePost: async (root, { _id }) => {
      try {
        return await Post.findOneAndRemove({
          _id,
        });
      } catch (e) {
        return e.message;
      }
    },
  },
};

module.exports = resolvers;
