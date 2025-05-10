import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, resetPassword, error: authError, loading } = useAuthentication();
  const { user, authIsReady } = useAuthContext();
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setError('');
    await login({ email, password });
  };

  useEffect(() => {
    if (authError) setError(authError);
    if (authIsReady && user) {
      const redirect = localStorage.getItem("redirectAfterLogin");
      if (redirect === "createPost") {
        localStorage.removeItem("redirectAfterLogin");
        navigate('/post/new');
      } else {
        navigate("/");
      }
    }
  }, [authError, user, authIsReady, navigate]);

  const handleResetPassword = async () => {
    if (!email) {
      setError("Por favor, preencha seu e-mail para recuperar a senha.");
      return;
    }
  
    const result = await resetPassword(email);
    if (result?.success) {
      setError("E-mail de recuperação enviado! Verifique sua caixa de entrada.");
    }
  };
  

  return (
    <div className={styles.login}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Bem-vindo de volta!</h1>
        <p className={styles.subtitle}>Acesse sua conta para continuar.</p>

        <form onSubmit={handlerSubmit} className={styles.form}>
          <label>
            <span>E-mail:</span>
            <input
              type='email'
              name='email'
              required
              placeholder='Digite seu e-mail'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              type='password'
              name='password'
              required
              placeholder='Digite sua senha'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <p className={styles.forgotPassword}>
  <button
    type="button"
    onClick={() => handleResetPassword()}
    className={styles.forgotButton}
  >
    Esqueceu a senha?
  </button>
</p>

          <button className={styles.loginButton} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
