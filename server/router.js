const router = require('express').Router();
const resCtrl = require('./controllers/resolution.controller');
const userCtrl = require('./controllers/user.controller');
const authMiddleware = require('./middlewares/auth');

router.get('/allresolutions', resCtrl.getAllRes);
router.put('/addres/:ref', resCtrl.addRes);
router.put('/remres/:ref', resCtrl.remRes);


router.post('/register', userCtrl.createAccount);
router.post('/login', userCtrl.login);
router.post('/logout', authMiddleware, userCtrl.logout);
router.get('/profile', authMiddleware, userCtrl.getProfileInfo);
router.get('/allusers', userCtrl.getAllUsers);
router.get('/getuser/:id', userCtrl.getUser);
router.put('/addRes/:userId/:ref', userCtrl.addRes);
router.put('/addnote', userCtrl.addNote);
router.get('/getnotes/:userId', userCtrl.getNotes);

module.exports = router;