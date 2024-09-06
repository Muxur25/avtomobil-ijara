const {Router} = require('express')
const bookingController = require('../controller/booking.controller')

const router = Router()

const adminMiddle = require('../middleware/admin')
const userMiddle = require('../middleware/user')

router.post('/', userMiddle,  bookingController.createBooking)
router.get('/', adminMiddle, bookingController.getAllBooking)
router.get('/:id', userMiddle,  bookingController.getById)
router.delete('/:id', userMiddle,  bookingController.deleteById)


module.exports = router