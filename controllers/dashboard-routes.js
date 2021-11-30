
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const checkAuth = require('../utils/auth');

router.get('/', checkAuth, (req, res) => {
    Post.findAll({ where: {user_id: req.session.user_id},
                attributes: [ 
                    'id',
                    'contents',
                    'title',
                    'user_id',
                    'created_at'
                ]
                // include 
            })
            .then(dbPostData => {
                const posts = dbPostData.map(post => post.get({ plain: true }));
                res.render('dashboard', {posts, loggedIn: true});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
});

module.exports = router;