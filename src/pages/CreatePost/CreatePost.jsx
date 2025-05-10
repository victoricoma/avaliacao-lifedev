import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) {
      alert("Você precisa estar logado para criar um post.");
      return;
    }
  
    setLoading(true);
  
    const post = {
      title,
      content,
      imageURL,
      createdAt: Timestamp.now(),
      createdBy: user.displayName || "Anônimo",
      photoURL: user.photoURL?.trim()
        ? user.photoURL
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'Usuário')}&background=random&color=fff`,
      uid: user.uid,
    };
  
    try {
      const docRef = await addDoc(collection(db, "posts"), post);
      navigate(`/post/${docRef.id}`); // redireciona para PostPage com ID
    } catch (error) {
      console.error("Erro ao criar post:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h2 className={styles.create}>Criar novo post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Conteúdo:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          URL da Imagem (opcional):
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Publicando..." : "Publicar"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
