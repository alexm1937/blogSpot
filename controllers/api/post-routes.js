
const router = require('express').Router();
const { Post, User } = require('../../models');
const sequelize = require('../../config/connection');
//const auth?

//get all
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'contents', 'user_id', 'created_at'],
        order: [['created_at', 'DESC']],
        // include comments and user models?
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//get by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'contents', 'user_id', 'created_at']
        //include comments and user model
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        contents: req.body.contents,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//update post
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            contents: req.body.contents            
        },
        { 
            where: {id: req.params.id}
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete post
router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;