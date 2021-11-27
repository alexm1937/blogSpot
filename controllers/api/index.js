
const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
//const commentRoutes

router.use('/users/', userRoutes);
router.use('/posts/', postRoutes);
//const router.use comments


module.exports = router;