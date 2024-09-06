const { PrismaClient } = require('@prisma/client')
const BaseError = require('../error/baseError')

const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class BookingService {
	async createBooking(userId, carId, startDate, endDate ){
		if(!userId || !carId || !startDate || !endDate){
			throw BaseError.Error('Qaysidur malumot kiritilmadi')
		}
		
		const isUser = await prisma.user.findUnique({where: {id:userId}})
		if(!isUser){
			throw BaseError.Error('User is not defained')
		}
		const isCar = await prisma.car.findUnique({where: {id: carId}})
		
		if (!isCar){
			throw BaseError.Error('Car is not defained')
		}
		
		if(!isCar.availabilityStatus){
			throw BaseError.Error('The car is already booked')
		}
		
		const start = new Date(startDate);
		const end = new Date(endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		
		const totalCost = diffDays * isCar.pricePerDay;
		
		const booking = await prisma.booking.create({
			data: {
				userId,
				carId,
				startDate,
				endDate,
				totalCost, // Hisoblangan qiymat
			}
		});
		
		return booking
		
		
	}
	
	async getAllBooking(){
		return await prisma.booking.findMany()
	}
	
	async getById(id, refreshToken){
		const booking = await prisma.booking.findUnique({where: {id: Number(id)}, include: {user:true}})
		
		if(!booking){
			throw BaseError.Error('Booking is not defained')
		}
		
		const isUser = jwt.verify(refreshToken, process.env.JWT_SECRET)
		
		if(!isUser){
			throw BaseError.Error('User is not defained')
		}
		
		if(booking.user.username !== isUser.user){
			throw BaseError.Error('This booking is not your')
		}
		
		
		return booking
	}
	
	async deleteById(id, refreshToken){
		const booking = await prisma.booking.findUnique({where: {id: Number(id)}, include: {user:true}})
		
		if(!booking){
			throw BaseError.Error('Booking is not defained')
		}
		
		const isUser = jwt.verify(refreshToken, process.env.JWT_SECRET)
		
		if(!isUser){
			throw BaseError.Error('User is not defained')
		}
		
		if(booking.user.username !== isUser.user){
			throw BaseError.Error('This booking is not your')
		}
		
		await prisma.booking.delete({where: {id: Number(id)}})
		
		return {message: 'Booking successfuly deleted'}
	}
}

module.exports = new BookingService()