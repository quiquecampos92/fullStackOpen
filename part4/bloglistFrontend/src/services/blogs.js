import axios from 'axios'

const basedUrl = '/api/blogs'

let token = null


const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAllBlogs = () => {
    return axios.get(basedUrl)
}

const createBlog = (newBlog) => {
    return axios.post(basedUrl, newBlog)
}

const updateBlog = (id, modifiedBlog) => {
    return axios.put(`${basedUrl}/${id}`, modifiedBlog)
}

const deleteBlog = (id) => {
    console.log('Blog eliminado');
    return axios.delete(`${basedUrl}/${id}`)
}

export default {
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    setToken
}