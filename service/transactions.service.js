const BaseError = require('../error/baseError')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class TransactionsService {
	async createTransaction(bookingId, amountPaid, paymentDate){
		if(!bookingId || !amountPaid || !paymentDate){
			throw BaseError.Error('Inform not entered')
		}
		
		const booking = await prisma.booking.findUnique({where: {id: bookingId}})
		
		if(!bookingId){
			throw BaseError.Error('Booking is not defained')
		}
		
		const sum = booking.totalCost - amountPaid
		
		await prisma.booking.update({where: {id: bookingId}, data: {totalCost: sum}})
		
		const transaction = prisma.transaction.create({data: {bookingId, amountPaid, paymentDate}})
		
		return transaction
		
	}
	
	async getTransactions(){
		return prisma.transaction.findMany()
	}
	
	async updateTransactions(id, paymentStatus){
		const transaction = await prisma.transaction.findUnique({where: {id: Number(id)}})
		if(!transaction){
			throw BaseError.Error('TransActions is not defained')
		}
		const updateTransaction = await prisma.transaction.update({where: {id: Number(id)}, data: {paymentStatus}})
		
		return updateTransaction
		
	}
	
	async deleteTransaction(id){
		if(!id){
			throw BaseError.Error('Id is not entered')
		}
		
		const transActions = await prisma.transaction.findUnique({where: {id: Number(id)}})
		if(!transActions){
			throw BaseError.Error('Transaction is not defained')
		}
		
		await prisma.transaction.delete({where: {id: Number(id)}})
		
		return {message: 'TransActions successfully deleted'}
	}
}

module.exports = new TransactionsService()