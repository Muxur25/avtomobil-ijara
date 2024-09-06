const express = require('express')
const error = require('./middleware/error')
require('dotenv').config()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const app = express()
const bcrypt = require('bcryptjs')

const cookie = require('cookie-parser')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookie())


async function seedDatabase() {
	// Rollarni tekshirish
	const roleCount = await prisma.role.count();
	
	if (roleCount === 0) {
		// Agar rollar hali yaratilmagan bo'lsa, yaratiladi
		const adminRole = await prisma.role.create({
			data: {
				roleName: 'superadmin',
			},
		});
		
		const userRole = await prisma.role.create({
			data: {
				roleName: 'user',
			},
		});
		
		// Parolni hashlash
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(process.env.admin_password, salt);
		
		// Admin foydalanuvchisini yaratish
		await prisma.user.create({
			data: {
				username: 'superadmin',
				email: 'superadmin@email.com',
				password: hashedPassword,
				roleId: adminRole.id,
			},
		});
		
		console.log('Rollar va admin foydalanuvchi yaratildi.');
	} else {
		console.log('Rollar allaqachon mavjud.');
	}
}

seedDatabase()



app.use('/users', require('./router/user.router'))
app.use('/roles', require('./router/role.router'))
app.use('/cars', require('./router/car.router'))
app.use('/bookings', require('./router/booking.router'))
app.use('/transactions', require('./router/transactions.router'))

app.use(error)

const bootstrap = () => {
	app.listen(process.env.PORT, () => {
		console.log('Server rouning in 8080 port')
	})
}

bootstrap()