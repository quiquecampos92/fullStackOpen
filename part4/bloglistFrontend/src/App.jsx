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

  return (
    <>
      {user === null ?
        loginForm() :
        <>
          <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
          <button className="border border-gray-300 p-2 rounded" onClick={handleLogout}>logout</button>
        </>
      }
      <Notification message={errorMessage} />
    </>
  )
}

export default App
