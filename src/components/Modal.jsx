import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_container}>
        <p>{message}</p>
        <div className={styles.modal_buttons}>
          <button 
            className={styles.ok_button} 
            onClick={onConfirm}
          >
            OK
          </button>
          <button 
            className={styles.cancel_button} 
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;