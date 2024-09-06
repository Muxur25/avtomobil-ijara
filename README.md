Avtomobil ijarasi loyihasi
Express, prisma, jwt, cookie, bcrypt texnalogiya va kutubxonalari asosida ishlangan


.env fayl strukturasi:

DATABASE_URL="postgresql://postgres:1234567@localhost:5432/database_name?schema=public" 

PORT=8080

JWT_SECRET=jsonhellos

admin_password=admin


database_name -- ushbu database ni postgres da yaratasiz
admin_password -- login qilish uchun password yani loyihani birinchi o'rnatganingizda sizda avtomatik tarzda yangi username:superadmin, password: .env password, email: default holatda superadmin@email.com ni oladi va rolega superadmin roleni beradi batafsil admin middlewareda ko'rishingiz mumkin foydalanuvchi qo'shish transactionlar qo'shishni faqat superadmin va admin tipitagi foydalanuvchilar qo'sha oladi 

Loyihani o'rnatish tartibi ushbu loyihani clone qiling va cd qilib dreaktoriyaga o'ting

