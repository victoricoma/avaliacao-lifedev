import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Post from './pages/Post/Post'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CreatePost from './pages/CreatePost/CreatePost'
import Search from './pages/Search/Search'
import Dashboard from './pages/Dashboard/Dashboard'
import EditPost from './pages/EditPost/EditPost'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

import { AuthProvider } from './context/AuthContext'

function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()
  const loadingUser = user === undefined
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      });
    }, [auth]);

    if (loadingUser) {
      return <div className="loading">Carregando...</div>
    }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/posts/create" element={<CreatePost />} />
              <Route path="/posts/edit/:id" element={<EditPost />} />
              <Route path="/search" element={<Search />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App

