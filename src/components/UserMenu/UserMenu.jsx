import { useState } from 'react';
import styles from './UserMenu.module.css';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ user }) => {
    const [open, setOpen] = useState(false);
    const { logout } = useAuthentication();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return(
        <div className={styles.menu_container}>
            <img
            src={user.photoURL || "/default-user.png"}
            alt="Avatar"
            onClick={() => setOpen(!open)}
            className={styles.avatar}
            />
            {open && (
                <div className={styles.menu}>
                    <button onClick={() => navigate("/dasboard")}>Dasboard</button>
                    <button onClick={() => navigate("/post/new")}>Post</button>
                    <button onClick={handleLogout}>Logout</button>
                    </div>
            )}
        </div>
    );
};

export default UserMenu;