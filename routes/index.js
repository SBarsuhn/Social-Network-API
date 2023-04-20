const router = require('express').Router();
const apiRoutes = require('./api');
// tells the application that the first endpoint that needs to be used is "/api" and will send the "wrong route" screen if a route is not entered correctly
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;