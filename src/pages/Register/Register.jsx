import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthentication } from "../../hooks/useAuthentication"
import styles from "./Register.module.css"


const Register = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const { createUser, error: authError, loading } = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password.length < 6) {
      setError("As senhas devem ter pelo menos 6 caraceres");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.")
      return;
    }

    try {
      const user = {
        displayName,
        email,
        password,
      };
      const res = await createUser(user);

      if (res && res.user) {
        navigate('/dashboard');
      }

    } catch(err) {
      console.error("Erro no registro", err);
      setError(err.message || "Ocorreu um erro ao registrar.");
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira a senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button className={styles.btn}
        type='submit'
        disabled={loading}
        >
          {loading ? "Aguarde..." : "Cadastrar"}

        </button>
      </form>
    </div>
  )
}
export default Register