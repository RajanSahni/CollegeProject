const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create a question
router.post('/', questionController.createQuestion);

// Get all questions
router.get('/', questionController.getAllQuestions);

// Get a single question
router.get('/:id', questionController.getQuestion);

// Update a question
router.put('/:id', questionController.updateQuestion);

// Delete a question
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;