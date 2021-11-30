
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//create associations

//relation between post and user
User.hasMany(Post, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Post.belongsTo(User, {foreignKey: 'user_id', onDelete: 'SET NULL'});

//relation between comments to post
Post.hasMany(Comment, {foreignKey: 'post_id', onDelete: 'CASCADE'});
Comment.belongsTo(Post, {foreignKey: 'post_id', onDelete: 'SET NULL'})

//relation comment to user
User.hasMany(Comment, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Comment.belongsTo(User, {foreignKey: 'user_id', onDelete: 'SET NULL'});


module.exports = { User, Post, Comment };