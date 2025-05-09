import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import styles from "./EditPost.module.css";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { updateDocument, response } = useUpdateDocument("posts");

  // Carregar dados do post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = docSnap.data();
          
          // Verificar se o usuário é o autor do post
          if (postData.userId !== user.uid) {
            setError("Você não tem permissão para editar este post");
            return;
          }
          
          setTitle(postData.title);
          setBody(postData.body);
        } else {
          setError("Post não encontrado!");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Erro ao buscar post:", error);
        setError("Ocorreu um erro ao carregar o post. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      // Validar campos
      if (!title || !body) {
        setFormError("Por favor, preencha todos os campos!");
        return;
      }

      // Atualizar post
      const post = {
        title,
        body,
      };

      await updateDocument(id, post);
      
      // Redirecionar para dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      setFormError("Ocorreu um erro ao atualizar o post. Tente novamente mais tarde.");
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return (
      <div className={styles.edit_post}>
        <h2>Editar Post</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.edit_post}>
      <h2>Editar Post</h2>
      <p>Altere os dados do post como desejar</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        {!response.loading && <button className="btn">Atualizar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default EditPost;