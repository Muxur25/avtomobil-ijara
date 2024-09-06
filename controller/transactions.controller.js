const trancactionService = require('../service/transactions.service')

class TransactionsController {
	async createTransaction(req, res, next){
		try {
			const {bookingId, amountPaid, paymentDate} = req.body
			const data = await trancactionService.createTransaction(bookingId, amountPaid, paymentDate)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async updateTransactions(req, res, next){
		try {
			const {id} = req.params
			const {paymentStatus} = req.body
			const data = await trancactionService.updateTransactions(id, paymentStatus)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async deleteTransactions(req, res, next){
		try {
			const {id} = req.params
			const data = await trancactionService.deleteTransaction(id)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async allTransactions(req, res, next){
		try {
			const data = await trancactionService.getTransactions()
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
}

module.exports = new TransactionsController()