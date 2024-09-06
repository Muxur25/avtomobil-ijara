const jwt = require('jsonwebtoken')
const BaseError = require('../error/baseError')

module.exports = function(req, res, next){
	const {refreshToken} = req.cookies
	const user = jwt.verify(refreshToken, process.env.JWT_SECRET)
	if(!user){
		return next(BaseError.Unauthorization())
	}
	
	if(user.role !== 'admin' && user.role !== 'adminka' && user.role !== 'superadmin'){
		return next(BaseError.Error('You are not admin'))
	}
	
	next()
	
}