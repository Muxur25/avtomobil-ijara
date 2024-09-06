const {Router} = require('express')
const userController = require('../controller/user.controller')
const router = Router()
const {body} = require('express-validator')
const adminMiddle = require('../middleware/admin')
const userMiddle = require('../middleware/user')


router.post('/', adminMiddle, body('email').isEmail(), body('username').isLength({min:3, max:15}), userController.register)

router.get('/', adminMiddle,  userController.getUser)

router.put('/:id', adminMiddle, userController.updateUser)

router.delete('/:id', adminMiddle, userController.removeUser)

router.post('/login', userController.loginUserOrAdmin)

router.get('/logout', userMiddle,  userController.logout)

module.exports = router