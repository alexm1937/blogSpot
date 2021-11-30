
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
router.get('/post/:id', (req, res) => {
    Post.findOne({
        attributes: ['id', 'title', 'contents', 'user_id', 'created_at']
        //include?
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        //serialize data?
        const post = dbPostData.get({plain: true});
        //pass data to template
        res.render('single-post', { post, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;