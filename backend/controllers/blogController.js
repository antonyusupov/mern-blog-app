const  mongoose  = require('mongoose');
const Blog = require('../models/blogModels');


const getBlogs = async (req, res) => {
    // try {
        const blogs = await Blog.find({}).sort({createdAt: -1 });
        res.status(200).json(blogs);
    // } catch (error) {
    //     console.error('Error fetching blogs:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
}

const getBlog = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such a Blog'})
    }

    const blog = await Blog.findById(id)

    if(!blog) {
        return res.status(404).json({error: 'No Such a Blog'})
    }

    res.status(200).json(blog)
}

const createBlog = async (req, res) => {
    const { title, content, username} = req.body

    try {
        const blog = await Blog.create({ title, content, username })

        res.status(200).json(blog)
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No Such a Blog' })
    }

    const blog = await Blog.findOneAndDelete({ _id:id } )

    if(!blog) {
        return res.status(400).json({ error: 'No Such a Blog'})
    }

    res.status(200).json(blog)
}

const updateBlog = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No Suc a Blog' })
    }

    const blog = await Blog.findOneAndUpdate( { _id: id}, {
        ...req.body
    })

    if(!blog) {
        return res.status(400).json({ error: 'No Such a Blog' })
    }

    res.status(200).json(blog)
}


module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog
}