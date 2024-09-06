const {Router} = require('express')
const roleController = require('../controller/role.controller')
const router = Router()
const adminMiddle = require('../middleware/admin')
const userMiddle = require('../middleware/user')

router.post('/',adminMiddle,  roleController.createRole)

router.get('/', adminMiddle, roleController.getRoles)

router.put('/:id', adminMiddle, roleController.updateRole)

router.delete('/:id', adminMiddle,  roleController.removeRole)

module.exports = router