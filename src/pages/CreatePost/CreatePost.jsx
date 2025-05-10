import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError ] = useState(null);
    const {currentUser} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if(!currentUser) {
            setError("Você precisa estar logado para criar um post!");
            return;
        }

        try {
            const postData = {
                itle,
                content,
                uid: currentUser.vid,
                authorId: currentUser.uid,
                author: currentUser.email,
                createAt: serverTimestamp(),
                likes: 0,
                comments: []
            };
            console.log('Enviando para o Firebase:', postData);

            console.log('Post salvo com ID', DocumentReference.id);
            navigate('/dashboard');
        } catch (err) {
            console.error("Erro ao criar post:", err);
            setError('Erro ao salvar:' + error.message);
        }
    };

    return (
        <div className="create-post">
            <h1>Criar novo post</h1>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubtion}>
                <div className="form-group">
                    <label>Titulo</label>
                    <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    minLength={3}
                    />
                </div>

                <div className="from-group">
                    <label>Conteudo</label>
                    <textarea
                    placeholder='Conteúdo'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    minLength={10}
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Publicar Post
                </button>
            </form>
        </div>
    );
}