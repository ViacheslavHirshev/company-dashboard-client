import styles from "./CustomError.module.css";

function CustomError({ message }: { message: string }) {
  return <p className={styles.error}>Error: {message}</p>;
}

export default CustomError;
