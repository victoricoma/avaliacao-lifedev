import styles from './Login.module.css'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {auth} from '../../firebase/config'


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login, error: authError, loading } = useAuthentication()

    const handlerSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const user = {email, password}
            await login(user)
        } catch (error) {
            setError(error.message)
        }
    }

        const handleGoogleLogin = async () => {
            setError("")
            try{
                const provider = new GoogleAuthProvider()
                await signInWithPopup(auth, provider)
            } catch (error) {
                setError(error.messsage)
                console.error("Erro no login com Google", error)
            }
        }

        useEffect(() => {
            if (authError) {
                setError(authError)
            }
        }, [authError])


    return (
        <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Faça login em nossa plataforma de desenvolvedores</p>
            <form onSubmit={handlerSubmit}>
                <label>
                    <span>E-mail: </span>
                    <input
                        type='email'
                        name='email'
                        required
                        placeholder='E-mail do usuário'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>Senha: </span>
                    <input
                        type='password'
                        name='password'
                        required
                        placeholder='Insira sua senha'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                {!loading && <button className='btn'>Entrar</button>}
                {loading && <button className='btn' disabled>Aguarde... </button>}
                {error && <p>{error}</p>}
            </form>

            <button
            onClick={handleGoogleLogin}
            className={styles.googleBtn}
            disabled={loading}
            >

                <img src="htps://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className={styles.googleLogo}
                />
                Entrar com Google
            </button>
            
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )
}
export default Login