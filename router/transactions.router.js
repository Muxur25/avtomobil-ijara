const {Router} = require('express')
const transactionController = require('../controller/transactions.controller')

const router = Router()
const adminMiddle = require('../middleware/admin')

router.post('/', adminMiddle,  transactionController.createTransaction)
router.get('/', adminMiddle,  transactionController.allTransactions)
router.put('/:id', adminMiddle, transactionController.updateTransactions)
router.delete('/:id', adminMiddle, transactionController.deleteTransactions)


module.exports = router