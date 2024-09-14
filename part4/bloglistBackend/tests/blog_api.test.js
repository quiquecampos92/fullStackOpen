const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    console.log('entered test')
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert(titles.includes('blog 2'))
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Quique test',
        url: 'prueba de url',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    assert(titles.includes('async/await simplifies making async calls'))
})

test('blog without title is not added', async () => {
    const newBlog = {
        author: 'Quique test',
        url: 'prueba de url',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]


    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a blog can be deleted ', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]


    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('blogs have id property, not _id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    blogs.forEach(blog => {
        assert(blog.id)
        assert(!blog._id)
    })
})

test('a new blog post can be created', async () => {
    // Obtener los blogs antes de la solicitud POST
    const blogsAtStart = await helper.blogsInDb()

    // Definir los datos del nuevo blog
    const newBlog = {
        title: 'Learning async/await in Node.js',
        author: 'John Doe',
        url: 'http://example.com/learning-async-await',
        likes: 5
    }

    // Realizar una solicitud POST para crear un nuevo blog
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201) // Verificar que la respuesta tenga el código 201 (creado)
        .expect('Content-Type', /application\/json/)

    // Obtener los blogs después de la solicitud POST
    const blogsAtEnd = await helper.blogsInDb()

    // Verificar que el número de blogs se ha incrementado en uno
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

    // Verificar que el nuevo blog esté en la base de datos
    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Learning async/await in Node.js'))
})

test('a blog\'s likes can be updated', async () => {
    // Obtener los blogs existentes
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0] // Seleccionar el primer blog para actualizar

    const updatedBlogData = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 10, // Aumentar los likes en 10
    }

    // Realizar la solicitud PUT para actualizar los likes
    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlogData)
        .expect(200) // Verificar que la respuesta tenga el código 200 (OK)

    // Verificar que los likes se han actualizado correctamente
    assert.strictEqual(response.body.likes, blogToUpdate.likes + 10)

    // Verificar que el blog actualizado está en la base de datos
    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 10)
})


after(async () => {
    await mongoose.connection.close()
})