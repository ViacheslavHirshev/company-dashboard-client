import Button from "../buttons/Button";
import styles from "./NoData.module.css";

type TNoDataProps = {
  message: string;
  btnText?: string;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
};

export function NoData({ message, btnText, clickHandler }: TNoDataProps) {
  return (
    <div className={styles.noDataContainer}>
      <p className={styles.message}>{message}</p>
      {btnText && (
        <Button style="primary" onClickHandler={clickHandler}>
          {btnText}
        </Button>
      )}
    </div>
  );
}
