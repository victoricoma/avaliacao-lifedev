import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import PostDetail from './pages/Login/PostDetail/PostDetail'
import CreatePost from './pages/CreatePost/CreatePost'
import { useAuth } from './hooks/useAuth'
import './App.css'

function App() {
    const { currentUser } = useAuth()

  return (
    <>
      <div>
        <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />


              <Route
              path="/dashboard"
              element={currentUser ? <Dashboard/> : <Navigate to="/login"/>}
              />
              <Route
              path="/post/:id"
              element={currentUser ? <PostDetail /> : <Navigate to="/login" />}
              />
              <Route
              path="/post/new"
              element={currentUser ? <CreatePost/> : <Navigate to="/login" />}
              />
              <Route
              path="*"
              element={<Navigate to={currentUser ? "/dashboard" : "/"} />}
              />

            </Routes>
          </div>
          <Footer />
      </div>
    </>
  )
}

export default App
