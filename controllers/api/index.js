
const router = require('express').Router();

const userRoutes = require('./user-routes');
//const postRoutes
//const commentRoutes

router.use('/users/', userRoutes);
//const router.use posts
//const router.use comments


module.exports = router;