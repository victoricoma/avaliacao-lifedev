import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export default function PostDetail() {
    const {id} = useParams();
    const [post, setPost] = useState(null);


    useEffect(() => {
        const fetchPost = async () => {
            const docRef = doc(db, 'posts', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPost({id: docSnap.id, ...docSnap.data() });
            }
        };
        fetchPost();
    }, [id]);

    if (!post) return <div>Carregando...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>Por: {post.author}</p>
            <div style={{ marginTop: '1rem'}}>
                {post.content}
            </div>
        </div>
    );
}
