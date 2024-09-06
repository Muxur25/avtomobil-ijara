const bookingService = require('../service/booking.service')

class BookingController {
	async createBooking(req, res, next){
		try {
			const {userId, carId, startDate, endDate } = req.body
			const data = await bookingService.createBooking(userId, carId, startDate, endDate)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async getAllBooking(req, res, next){
		try{
			const data = await bookingService.getAllBooking()
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async getById(req, res, next){
		try {
			const {id} = req.params
			const {refreshToken} = req.cookies
			const data = await bookingService.getById(id, refreshToken)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async deleteById(req, res, next){
		try {
			const {id} = req.params
			const {refreshToken} = req.cookies
			const data = await bookingService.deleteById(id, refreshToken)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
}


module.exports = new BookingController()