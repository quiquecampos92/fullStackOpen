const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'blog 2',
        author: 'Quique 2',
        url: 'https://www.w3schools.com/html/',
        likes: 5
    },
    {
        title: 'blog 3',
        author: 'Quique 3',
        url: 'https://www.w3schools.com/html/',
        likes: 2
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}