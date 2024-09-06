const roleService = require('../service/role.service')


class RoleController {
	async createRole(req, res, next){
		try{
			const {roleName} = req.body
			const data = await roleService.createRole(roleName)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async getRoles(req, res, next){
		try {
			const data = await roleService.getRoles()
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async updateRole(req, res, next){
		try {
			const {id} = req.params
			const {roleName} = req.body
			const data = await roleService.updateRole(id, roleName)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async removeRole(req, res, next){
		try {
			const {id} = req.params
			const data = await roleService.removeRole(id)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
}

module.exports = new RoleController()