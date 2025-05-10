import styles from "./CreatePost.module.css";
import { useState } from "react";
import { userInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");
    const { user } = useAuthValue();
    const { insertDocument, response } = userInsertDocument("posts");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        try {
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL.");
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        // check all values
        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos.");
        }

        console.log(tagsArray);
        console.log({
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        // redirect to home page
        navigate("/");
    }
    return (
        <div classsName={styles.create_post}>
            <h2>Criar Post</h2>
            <p>Escreva sobre o que você quiser e compartilhe com o mundo!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título:</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Pense em um título..."
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>URL da imagem:</span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insira uma imagem que represente o seu post..."
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <label>
                    <span>Conteúdo:</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Escreva o conteúdo do seu post..."
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Insira as tags separadas por vírgula..."
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                {!response.loading && (
                    <button className="btn">Criar Post</button>
                )}
                {response.loading && (
                    <button className="btn" disabled>Aguarde...</button>
                )}
                {response.error && (
                    <p className="error">{response.error}</p>
                )}
                    {formError && (
                        <p className="error">{formError}</p>
                    )}
                </form>
        </div>
    )
    
}
