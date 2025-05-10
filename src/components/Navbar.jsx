import styles from './Navbar.module.css'
import { NavLink } from "react-router-dom"
import { useAuth } from '../hooks/useAuth'
import { auth } from '../firebase/config'

const Navbar = () => {
  const {currentUser} = useAuth()

  const handleLogout = async() => {
    try{
      await auth.signOut()
    } catch (error) {
      console.error("Erro ao fazer logout", error)
    }
  }

  return (
      <nav className={styles.navbar}>
        <ul className={styles.links_list}>
          <NavLink to="/" className={styles.brand} activeClassName={styles.active}>
          <li><span>Life</span>Dev</li>
          </NavLink>

          {currentUser ? (
            <>
            <NavLink to="/dashboard" className={styles.link} activeClassName={styles.active}>
            <li>Dashboard</li>
            </NavLink>
            <NavLink to="/post/new" className={styles.link} activeClassName={styles.active}>
            <li>Novo Post</li>
            </NavLink>
            <button className={styles.exit} onClick={handleLogout}>
              Sair
            </button>
            </>
          ) : (
            <>
          <NavLink to="/login" className={styles.link} activeClassName={styles.active}>
          <li>Login</li>
          </NavLink>
          <NavLink to="/register" className={styles.link} activeClassName={styles.active}>
          <li>Register</li>
          </NavLink>
          </>
          )}
        </ul>
      </nav>
  );
};

export default Navbar;