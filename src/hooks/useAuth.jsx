import { useEffect, useState} from "react";
import { auth } from '../firebase/config';
import { onAuthStateChanged } from "firebase/auth";

export function useAuth() {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [auth])

    return { currentUser, loading}
}