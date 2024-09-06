const {Router} = require('express')
const carController = require('../controller/car.controller')
const adminMiddle = require('../middleware/admin')
const userMiddle = require('../middleware/user')
const router = Router()

router.post('/', adminMiddle, carController.addCar)
router.get('/', userMiddle, carController.getCars)
router.put('/:id', adminMiddle, carController.updateCar)
router.delete('/:id', adminMiddle, carController.removeCar)


module.exports = router