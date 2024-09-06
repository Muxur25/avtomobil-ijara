const BaseError = require('../error/baseError')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserService {
	async register(username, email, password, roleId) {
		if (!username || !email || !password || !roleId) {
			throw BaseError.Error('Qaysidur malumotni kiritmadingiz')
		}

		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(password, salt)
		
		const data = await prisma.user.create({
			data: { username, email, password: hashPassword, roleId },
		})

		return data
	}
	
	async getUser(){
		return await prisma.user.findMany()
	}
	
	async updateUser(userData, id) {
		// Foydalanuvchini topish
		const isUser = await prisma.user.findUnique({
			where: { id: Number(id) }
		});
		
		// Foydalanuvchi mavjudligini tekshirish
		if (!isUser) {
			throw new BaseError('User is not defined');
		}
		
		// Parolni hash qilish (agar parol yangilanayotgan bo'lsa)
		let updatedData = { ...userData };
		if (userData.password) {
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(userData.password, salt);
			updatedData.password = hashPassword;
		}
		
		// Foydalanuvchini yangilash
		const data = await prisma.user.update({
			where: { id: Number(id) },
			data: updatedData
		});
		
		return data;
	}
	
	async removeUser(id){
		const user = await prisma.user.findUnique({where: {id: Number(id)}})
		if (!user){
			throw BaseError.Error('User is not defained')
		}
		
		await prisma.user.delete({where: {id: Number(id)}})
		return {message: "User success deleted"}
	}
	
	async loginUserOrAdmin(email, password){
		if(!email || !password){
			throw BaseError.Error('Email or password not entered')
		}
		const user = await prisma.user.findUnique({where: {email}, include:{role:true}})
		if(!user){
			throw BaseError.Error('User is not defained')
		}
		
		const isPassword = await bcrypt.compare(password, user.password)
		
		if(!isPassword){
			throw BaseError.Error('Password invalid')
		}
		
		const token = jwt.sign({user: user.username, role: user.role.roleName}, process.env.JWT_SECRET, {expiresIn: '30d'})
		
		return {message: `welcome ${user.username} your role: ${user.role.roleName}`, token, user}
	}
	
	logout(refreshToken){
		if(!refreshToken){
			throw BaseError.Error('Token is not defained')
		}
		
		return {message: 'Success logout'}
		
	}
	

	
}

module.exports = new UserService()
