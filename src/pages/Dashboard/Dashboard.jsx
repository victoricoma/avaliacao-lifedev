import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import Modal from "../../components/Modal";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const { user } = useAuthValue();
  const { deleteDocument, response } = useDeleteDocument("posts");

  const fetchPosts = async () => {
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("createAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      
      setPosts(postsData);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeleteClick = (id) => {
    setPostToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      await deleteDocument(postToDelete);
      fetchPosts(); // Recarrega a lista após excluir
      setModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setPostToDelete(null);
  };

  if (loading) {
    return <p>Carregando posts...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerencie seus posts</p>
      <div className={styles.post_header}>
        <span>Título</span>
        <span>Ações</span>
      </div>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/post/new" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <div className={styles.post_container}>
          {posts.map((post) => (
            <div className={styles.post_row} key={post.id}>
              <div className={styles.post_title}>
                <p>{post.title}</p>
                <p className={styles.post_author}>por: {post.createdBy}</p>
              </div>
              <div className={styles.post_actions}>
                <Link to={`/post/${post.id}`} className="btn btn-outline">
                  Ver
                </Link>
                {user && user.uid === post.userId && (
                  <>
                    <Link to={`/post/edit/${post.id}`} className="btn btn-outline">
                      Editar
                    </Link>
                    <button 
                      onClick={() => handleDeleteClick(post.id)} 
                      className="btn btn-outline btn-danger"
                      disabled={response.loading}
                    >
                      {response.loading ? "Aguarde..." : "Excluir"}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={styles.new_post}>
        <Link to="/post/new" className="btn">
          Criar novo post
        </Link>
      </div>
      
      {/* Modal de confirmação */}
      <Modal 
        isOpen={modalOpen}
        message="Tem certeza que deseja excluir este post?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default Dashboard;