const jwt = require('jsonwebtoken')
const BaseError = require('../error/baseError')

module.exports = function(req, res, next){
	const {refreshToken} = req.cookies
	const user = jwt.verify(refreshToken, process.env.JWT_SECRET)
	if(!user){
		return next(BaseError.Unauthorization())
	}
	
	next()
	
}