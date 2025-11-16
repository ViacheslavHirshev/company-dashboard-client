import styles from "./Loader.module.css";

function Loader({ size }: { size: "full" | "small" }) {
  return (
    <div className={`${size === "full" ? styles.full : styles.small}`}>
      <div className={`${styles["spinner-3"]}`}></div>;
    </div>
  );
}

export default Loader;
