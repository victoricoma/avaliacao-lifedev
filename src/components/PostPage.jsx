import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        navigate("/login");
        return;
      }

      setUser(firebaseUser);

      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("Post não encontrado.");
      }
    });
  }, [id, navigate]);

  if (!post) return <p>Carregando post...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <img
          src={post.photoURL}
          alt="Perfil"
          style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "1rem" }}
        />
        <div>
          <strong>{post.createdBy}</strong><br />
          <small>{new Date(post.createdAt.seconds * 1000).toLocaleString()}</small>
        </div>
      </div>

      <h2>{post.title}</h2>

      {post.imageURL && (
        <img
          src={post.imageURL}
          alt="Imagem do post"
          style={{ maxWidth: "100%", borderRadius: "8px", marginBottom: "1rem" }}
        />
      )}

      <p>{post.content}</p>
    </div>
  );
};

export default PostPage;
