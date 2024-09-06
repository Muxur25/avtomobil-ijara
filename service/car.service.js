const { PrismaClient } = require('@prisma/client')
const BaseError = require('../error/baseError')

const prisma = new PrismaClient()

class CarService {
	async addCar(body){
		if(!body){
			throw BaseError.Error('All inform not entered')
		}
		
		const data = await prisma.car.create({data: body})
		return data
	}
	
	async getCars(page) {
		const pageSize = 2; // Har bir sahifada 2 ta yozuv
		const currentPage = page || 1; // Agar page kiritilmasa, 1-sahifa olinadi
		const skip = (currentPage - 1) * pageSize; // O'tkazib yuboriladigan yozuvlar soni
		
		return await prisma.car.findMany({
			skip: skip,
			take: pageSize,
		});
	}
	
	
	
	async updateCar(id, body){
		if(!id){
			throw BaseError.Error('Id is not entered')
		}
		
		const isCar = await prisma.car.findUnique({where: {id: Number(id)}})
		if(!isCar){
			throw BaseError.Error('Car is not defained')
		}
		
		const data = await prisma.car.update({data: body, where: {id: Number(id)}})
		return data
	}
	
	async removeCar(id){
		const isCar = await prisma.car.findUnique({where: {id: Number(id)}})
		if(!isCar){
			throw BaseError.Error('Car is not base')
		}
		
		await prisma.car.delete({where: {id: Number(id)}})
		return {message: 'success deleted'}
	}
}

module.exports = new CarService()