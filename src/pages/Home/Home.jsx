import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFetchPosts } from '../../hooks/useFetchPosts';
import UserMenu from '../../components/UserMenu/UserMenu';
import illustration from '../../assets/reactimagem.png';
import { useEffect } from 'react';

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { posts, loading } = useFetchPosts();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const left = document.querySelector(`.${styles.reactSymbolsLeft}`);
      const right = document.querySelector(`.${styles.reactSymbolsRight}`);
      const moveY = (e.clientY / window.innerHeight - 0.5) * 10;

      if (left && right) {
        left.style.transform = `translateY(${moveY}px)`;
        right.style.transform = `translateY(${-moveY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCreatePostClick = () => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", "createPost");
      navigate("/login");
    } else {
      navigate("/post/new");
    }
  };

  const handleViewPost = (postId) => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", `/post/${postId}`);
      navigate("/register");
    } else {
      navigate(`/post/${postId}`);
    }
  };

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div>
          <h2>Bem-vindo ao MiniDevBlog</h2>
          <p className={styles.techParagraph}>
            Aqui você poderá compartilhar conhecimentos incríveis sobre
            tecnologia com pessoas que têm o mesmo interesse que você.
          </p>
          <button
            onClick={handleCreatePostClick}
            className={styles.createPostButton}
          >
            Criar seu post
          </button>
        </div>
        <img
          src={illustration}
          alt="Ilustração Tech"
          className={styles.illustration}
        />
      </section>

      <section className={styles.posts}>
        <h2>Últimos Posts</h2>
        {loading ? (
          <p>Carregando posts...</p>
        ) : posts.length === 0 ? (
          <p>Nenhum post encontrado.</p>
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
                      <p className={styles.authorName}>
                        {post.createdBy || "Desconhecido"}
                      </p>
                      <p className={styles.postTime}>
                        {post.createdAt?.seconds
                          ? new Date(post.createdAt.seconds * 1000).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                          : ""}
                      </p>
                    </div>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.body?.slice(0, 120)}...</p>
                  <button
                    onClick={() => handleViewPost(post.id)}
                    className={styles.viewMore}
                  >
                    Ler post completo
                  </button>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
