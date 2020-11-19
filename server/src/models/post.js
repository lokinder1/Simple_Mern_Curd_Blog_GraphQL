const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  content: String
});

const Post = mongoose.model('post', postSchema); 

module.exports = {
  Post
};