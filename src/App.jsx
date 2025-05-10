import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';
import Post from './post/post';

const App = () => {
  const { user, authIsReady } = useAuthContext();

  if (!authIsReady) {
    return <p>Carregando autenticação...</p>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: '80px' }}></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/post/new" element={user ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/post/:id" element={user ? <Post /> : <Navigate to="/login" />} />
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;
