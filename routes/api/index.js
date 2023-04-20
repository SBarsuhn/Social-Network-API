const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
// Tells the application what endpoint needs to be used depending on if the user is trying to view/edit users or thoughts
router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;