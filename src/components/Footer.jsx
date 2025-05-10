import styles from './Footer.module.css'

const Footer = () => {
  return (
    <>
    <footer className={styles.footer}>
        <h3>Escreva sobre o que você tem interesse!</h3>
        <p>Fatec Dev Team &copy; 2024</p>
        <img src={logo} alt="Logo de Developer Mini Blog"></img>
    </footer>
    </>
  );
};

export default Footer