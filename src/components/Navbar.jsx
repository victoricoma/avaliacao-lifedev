import styles from './Navbar.module.css';
import { NavLink } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Navbar = () => {
  const { user } = useAuthContext();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.links_list}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              `${styles.brand} ${isActive ? styles.active : ''}`
            }
          >
            <span>Life</span>Dev
          </NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink 
                to="/login" 
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/register" 
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/post/new" 
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Criar Post
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.exit}>
                Sair
              </button>
            </li>
          </>
        )}
      </ul>

      {user && (
        <div className={styles.user_info}>
          <span className={styles.greeting}>Olá, {user.displayName?.toLowerCase() || "usuário"}</span>
          <img
            src={
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "Usuário")}&background=random&color=fff`
            }
            alt="Avatar"
            className={styles.avatar}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
