import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { formatDistanceToNow } from "date-fns";
import { useAuthentication } from "../../hooks/useAuthentication";


const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Buscar dados do usuário no Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setDisplayName(data.displayName || "");
          setBio(data.bio || "");
        }
      }
    };
    fetchUserData();
  }, [user]);

  // Buscar posts do usuário
  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsRef);

        const postsList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((post) => post.uid === user.uid)
          .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

        setPosts(postsList);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, [user]);

  const handleSave = async () => {
    const userRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userRef, {
        displayName,
        bio,
      });
      

      if (newPassword) {
        await updatePassword(getAuth().currentUser, newPassword);
        alert("Senha alterada com sucesso.");
      }

      setEditMode(false);
    } catch (err) {
      alert("Erro ao atualizar: " + err.message);
    }
  };

  return (
    <div className={styles.dashboard}>
      {userData && (
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarCircle}>
              {userData.displayName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2>{userData.displayName || "Nome do usuário"}</h2>
              <p>{userData.bio || "Minha biografia aqui"}</p>
            </div>
          </div>
  
          {editMode ? (
            <div className={styles.editForm}>
              <input
                type="text"
                placeholder="Nome do usuário"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <textarea
                placeholder="Minha biografia aqui"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <input
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className={styles.buttonGroup}>
                <button className={styles.saveButton} onClick={handleSave}>Salvar</button>
                <button onClick={() => setEditMode(false)}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div className={styles.buttonGroup}>
              <button onClick={() => setEditMode(true)}>Editar Perfil</button>
            </div>
          )}
        </div>
      )}
  
      <h2>Meus Posts</h2>
      {posts.length === 0 ? (
        <p>Você ainda não publicou nenhum post.</p>
      ) : (
        <div className={styles.postsList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <img
                  className={styles.avatar}
                  src={
                    post.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(post.createdBy || 'Usuário')}&background=random&color=fff`
                  }
                  alt="Avatar"
                />
                <div>
                  <p className={styles.authorName}>{post.createdBy || "Desconhecido"}</p>
                  <p className={styles.postTime}>
                    {post.createdAt
                      ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true })
                      : ""}
                  </p>
                </div>
              </div>
              <h3>{post.title}</h3>
              <p>{post.body?.slice(0, 120)}...</p>
              <Link to={`/post/${post.id}`} className={styles.viewMore}>
                Ler post completo
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default Dashboard;
