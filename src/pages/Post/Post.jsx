import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import styles from "./Post.module.css";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          console.log("Post não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Carregando post...</p>;
  }

  return (
    <div className={styles.post_container}>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <div className={styles.post_author}>
            <p>por: {post.createdBy}</p>
          </div>
          <div className={styles.post_content}>
            <p>{post.body}</p>
          </div>
        </>
      ) : (
        <p>Post não encontrado!</p>
      )}
    </div>
  );
};

export default Post;