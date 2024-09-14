const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Ruta para obtener todos los blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

// Ruta para obtener un blog específico por id
blogsRouter.get('/:id', async (request, response, next) => {

    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end() // Si no encuentra el blog, retorna un 404
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const { title, author, url, likes } = request.body

    // Validar que el título y la URL estén presentes
    if (!title || !url) {
        return response.status(400).json({ error: 'title and url are required' })
    }

    const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0
    })

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})


// Ruta para eliminar un blog
blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

// Ruta para actualizar un blog existente
blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.content,
        author: body.important,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter