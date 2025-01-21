const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/categoryController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, createCategory);
router.get('/', authenticateToken, getAllCategories);

module.exports = router;
