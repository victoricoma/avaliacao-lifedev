import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/config";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.error("Post não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar post:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [id, navigate]);

  if (loading) return <p>Carregando post...</p>;
  if (!post) return <p>Post não encontrado.</p>;

  // 🔒 Verificação segura da data
  const dataFormatada = post.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000).toLocaleString("pt-BR")
    : "Data indisponível";

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <img
          src={
            post.photoURL ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(post.createdBy || "Usuário")}&background=random&color=fff`
          }
          alt="Foto de perfil"
          style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "1rem" }}
        />
        <div>
          <strong>{post.createdBy || "Autor desconhecido"}</strong>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>{dataFormatada}</p>
        </div>
      </div>

      <h1>{post.title || "Sem título"}</h1>

      {post.imageURL && (
        <div style={{ margin: "1rem 0" }}>
          <img
            src={post.imageURL}
            alt="Imagem do post"
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
      )}

      <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
        {post.content || "Conteúdo indisponível."}
      </p>
    </div>
  );
}
