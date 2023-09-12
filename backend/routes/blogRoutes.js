const express = require('express');
const bodyParser = require('body-parser');

const {
    getBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog
} = require('../controllers/blogController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();
// router.use(bodyParser.json());

// GET all request
router.get('/', getBlogs)

// GET single blog request
router.get('/:id', getBlog)

// checks for user logged in or not
router.use(requireAuth)

// POST request
router.post('/create', createBlog)

// Update request
router.patch('/:id', updateBlog)

// Delete request
router.delete('/:id', deleteBlog)

module.exports = router;