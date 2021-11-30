
const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

//get homepage populated with posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'contents', 'user_id', 'created_at'],
        order: [['created_at', 'DESC']]
        ///include models
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true}));//makes posts arr to pass to template
        res.render('homepage', {posts, loggedIn: req.session.loggedIn});//renders main.handlebars then passes homepage into {{{body}}}
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//login
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    } 
    res.render('login');
});
//get route single post

module.exports = router;