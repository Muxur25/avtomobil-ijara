Avtomobil ijarasi loyihasi
Express, prisma, jwt, cookie, bcrypt texnalogiya va kutubxonalari asosida ishlangan



------------------------------------------------------------------------------------------
.env fayl strukturasi:

DATABASE_URL="postgresql://postgres:1234567@localhost:5432/database_name?schema=public" 

PORT=8080

JWT_SECRET=jsonhellos

admin_password=admin


database_name -- ushbu database ni postgres da yaratasiz
admin_password -- login qilish uchun password yani loyihani birinchi o'rnatganingizda sizda avtomatik tarzda yangi username:superadmin, password: .env password, email: default holatda superadmin@email.com ni oladi va rolega superadmin roleni beradi batafsil admin middlewareda ko'rishingiz mumkin foydalanuvchi qo'shish transactionlar, carlarni yangilash, o'chirish qo'shishni faqat superadmin va admin tipitagi foydalanuvchilar qila oladi 


------------------------------------------------------------------------------------------
Loyihani o'rnatish tartibi ushbu loyihani clone qiling va cd qilib dreaktoriyaga o'ting

npm install

npx prisma migrate dev

npm run dev


------------------------------------------------------------------------------------------
loyihani tekshirish uchun postmandan foydalanin quyidagi link orqali import qilib oling:

https://api.postman.com/collections/36964233-1de83f97-c937-4c94-b20b-9002682175d7?access_key=PMAT-01J752KR2X9304WKPT8K6WBVT5


------------------------------------------------------------------------------------------
Avval login qilib oling: 

Loyihani birinchi o'rnatganingizda faqat quyidagi email va passwordlar orqali  login qilishingiz va yangi admin(yoki user) larni (rollarni) create qilishingiz mumkin:

email: superadmin@email.com

password: .env faylidagi passwordingiz









