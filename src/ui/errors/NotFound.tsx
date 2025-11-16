import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.heading}>Page doesn't exist 😢</h1>
    </div>
  );
}

export default NotFound;
