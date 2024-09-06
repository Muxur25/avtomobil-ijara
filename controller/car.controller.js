const carService = require('../service/car.service')

class CarController {
	async addCar(req, res, next){
		try {
			const body = req.body
			const data = await carService.addCar(body)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async getCars(req, res, next){
		try {
			const page = Number(req.query.page) || 1
			const data = await carService.getCars(page)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async updateCar(req, res, next){
		try {
			const {id} = req.params
			const body = req.body
			const data = await carService.updateCar(id, body)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async removeCar(req, res, next){
		try {
			const {id} = req.params
			const data = await carService.removeCar(id)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
}

module.exports = new CarController()