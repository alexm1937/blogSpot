
const router = require('express').Router();
const { Post, User } = require('../../models');
const sequelize = require('../../config/connection');
//const auth?

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'contents', 'post_url', 'user_id', 'created_at'],
        order: [['created_at', 'DESC']],
        // include comments and user models?
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        contents: req.body.contents,
        post_url: req.body.post_url,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;