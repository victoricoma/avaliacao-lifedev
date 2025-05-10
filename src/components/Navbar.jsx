import { NavLink } from "react-router-dom"
import { useAuthValue } from "../context/AuthContext"
import styles from './Navbar.module.css'


const Navbar = () => {
  const { logout } = userAuthentication()
  const { user } = useAuthValue()
  console.log(user)
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink className={styles.brand} to="/">
          <div>
            <img src={logo} alt="Brand" width="50px" height="30px" />Mini<span>Blog</span>
          </div>
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink to="/" 
            className={({ isActive }) => (isActive ? styles.active : "")}>
              Home
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/login" 
              className={({ isActive }) => (isActive ? styles.active : "")}>
                Entrar
              </NavLink>
            </li>
          )}
          <li>
            <NavLink 
            to="/register"
            className={({ isActive }) => (isActive ? styles.active : "")}>
              Cadastrar
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink 
              to="/posts/create"
              className={({ isActive }) => (isActive ? styles.active : "")}>
                Criar Post
              </NavLink>
            </li>
          )}
          <li>
            <NavLink 
            to="/dashboard"
            className={({ isActive }) => (isActive ? styles.active : "")}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}>
              Sobre
            </NavLink>
          </li>
          {user && (
            <li>
              <button className={styles.logout} onClick={logout}>
                <img src={sair} alt="Sair" width="20px" height="20px" />
              </button> 
            </li>
          )}  
        </ul>
      </nav>
    </>
  )
}

export default Navbar