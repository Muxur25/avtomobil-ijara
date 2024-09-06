const { PrismaClient } = require('@prisma/client')
const BaseError = require('../error/baseError')
const prisma = new PrismaClient()



class RoleService {
	async createRole(roleName) {
		if (!roleName) {
			throw BaseError.Error('RoleName is not entered')
		}

		const data = await prisma.role.create({
			data: {
				roleName,
			},
		})

		return data
	}
	
	async getRoles(){
		return await prisma.role.findMany()
	}
	
	async updateRole(id, roleName){
		if(!id || !roleName){
			throw BaseError.Error('Id or RoleName is not entered')
		}
		
		const isUser = await prisma.role.findUnique({where: {id: Number(id)}})
		if(!isUser){
			throw BaseError.Error('Role is not defained')
		}
		
		const data = await prisma.role.update({where: {id: Number(id)}, data: {roleName}})
		return data
	}
	
	async removeRole(id){
		if(!id){
			throw BaseError.Error('Id is not entered')
		}
		
		const isUser = await prisma.role.findUnique({where: {id: Number(id)}})
		if(!isUser){
			throw BaseError.Error('Role is not defained')
		}
		
		await prisma.role.delete({where: {id: Number(id)}})
		return {message: "Role sucess delete"}
	}
}

module.exports = new RoleService()
