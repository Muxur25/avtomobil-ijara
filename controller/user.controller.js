const userService = require('../service/user.service')
const {validationResult} = require('express-validator')


class UserController {
	async register(req, res, next){
		try {
			const error = validationResult(req)
			if(!error.isEmpty()){
				return res.json({error: error.array()[0].msg})
			}
			const {username, email, password, roleId} = req.body
			const data = await userService.register(username, email, password, +roleId)
			res.json(data)
		} catch (e) {
			next(e)
		}
	}
	
	async getUser(req, res, next){
		try {
			const data = await userService.getUser()
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async updateUser(req, res, next){
		try {
			const body = req.body
			const { id } = req.params
			const data = await userService.updateUser(body, id)
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async removeUser(req, res, next){
		try {
			const {id} = req.params
			const {message} = await userService.removeUser(id)
			res.json(message)
		}catch (e) {
			next(e)
		}
	}
	
	async loginUserOrAdmin(req, res, next){
		try {
			const {email, password} = req.body
			const data = await userService.loginUserOrAdmin(email, password)
			res.cookie('refreshToken', data.token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
	
	async logout(req, res, next){
		try {
			const {refreshToken} = req.cookies
			const data = userService.logout(refreshToken)
			res.clearCookie('refreshToken')
			res.json(data)
		}catch (e) {
			next(e)
		}
	}
}

module.exports = new UserController()