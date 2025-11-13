import styles from "./Modal.module.css";

type TModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ children, onClose }: TModalProps) {
  return (
    <div className={styles["modal-container"]}>
      <div className={styles.modal}>
        <div className={styles["modal-header"]}>
          <p className={styles.close} onClick={onClose}>
            &times;
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
