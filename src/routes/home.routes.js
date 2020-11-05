// getting necessary controllers and middleware
const router = require('express').Router(),
    { HomeController } = require('../controllers'),
    { isLoggedIn } = require('../middleware');

// serving main routes
router.get('/', HomeController.index);
router.get('/terms-&-conditions', HomeController.termsAndConditions);
router.get('/privacy-policy', HomeController.privacyPolicy);
router.get('/cookies-policy', HomeController.cookiesPolicy);

router.get('/foo', isLoggedIn, HomeController.foo);
router.get('/bar', isLoggedIn, HomeController.bar);

module.exports = router;