import { useState, useEffect } from 'react'
import blogService from "./services/blogs.js";
import { Blog } from "./components/Blog.jsx"
import Notification from './components/Notification.jsx'
import loginService from './services/login'



function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [okMessage, setOkMessage] = useState("")
  const [isActiveNewBlogForm, setIsActiveNewBlogForm] = useState(false)
  const [newBlogForm, setNewBlogForm] = useState({
    title: '',
    author: '',
    url: '',
    likes: ''
  })


  useEffect(() => {
    blogService
      .getAllBlogs()
      .then((response) => {
        let blogs = response.data;

        setBlogs(blogs);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);

      });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <button type="submit" className="border border-gray-300 p-2 rounded">login</button>
    </form>
  )

  const createBlogButton = () => {
    if (isActiveNewBlogForm) {
      setIsActiveNewBlogForm(false)
    } else {
      setIsActiveNewBlogForm(true)
    }
  }

  const handleBlogFormChange = (e) => {
    const { name, value } = e.target;
    setNewBlogForm({ ...newBlogForm, [name]: value });
  }

  const handleNewBlogSubmit = async (e) => {
    e.preventDefault()

    try {
      const newBlog = {
        "title": newBlogForm.title,
        "author": newBlogForm.author,
        "url": newBlogForm.url,
        "likes": newBlogForm.likes
      }
      const resp = await blogService.createBlog(newBlog)
      setNewBlogForm({
        title: '',
        author: '',
        url: '',
        likes: ''
      })
      setIsActiveNewBlogForm(false)
      blogService
        .getAllBlogs()
        .then((response) => {
          let blogs = response.data;

          setBlogs(blogs);
        })
        .catch((error) => {
          console.error("Error fetching blogs:", error);

        });
      setOkMessage("Blog added")
      setTimeout(() => {
        setOkMessage("")
      }, 2000)

    } catch (exception) {
      setErrorMessage('something was wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      {user === null ?
        loginForm() :
        <>
          <div className='flex
          '>
            <h1 className='font-bold capitalize m-4'>blogs</h1>
            <button onClick={createBlogButton} className='border border-gray-300 p-2 rounded'>Create new blog</button>
          </div>
          <Notification message={okMessage} />
          {isActiveNewBlogForm &&
            <div>
              <form onSubmit={handleNewBlogSubmit}>
                <div>
                  title
                  <input
                    type="text"
                    value={newBlogForm.title}
                    name="title"
                    onChange={handleBlogFormChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </div>
                <div>
                  author
                  <input
                    type="text"
                    value={newBlogForm.author}
                    name="author"
                    onChange={handleBlogFormChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </div>
                <div>
                  url
                  <input
                    type="text"
                    value={newBlogForm.url}
                    name="url"
                    onChange={handleBlogFormChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </div>
                <div>
                  likes
                  <input
                    type="text"
                    value={newBlogForm.likes}
                    name="likes"
                    onChange={handleBlogFormChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </div>
                <button type="submit" className="border border-gray-300 p-2 rounded">Create</button>
              </form>
            </div>
          }
          <div className='m-4'>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
          <button className="m-4 border border-gray-300 p-2 rounded" onClick={handleLogout}>logout</button>
        </>
      }
      <Notification message={errorMessage} />
    </>
  )
}

export default App
