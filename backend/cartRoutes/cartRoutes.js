const express = require('express')
const { addItem, removeLastItem, listItems } = require('../cartControllers/cartController')

const router = express.Router()

router.post('/add', addItem)
router.delete('/remove', removeLastItem)
router.get('/list', listItems)

module.exports = router;