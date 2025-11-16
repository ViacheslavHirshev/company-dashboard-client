import Button from "./buttons/Button";

type TNoDataProps = {
  message: string;
  btnText?: string;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
};

export function NoData({ message, btnText, clickHandler }: TNoDataProps) {
  return (
    <div>
      <p>{message}</p>
      {btnText && <Button onClickHandler={clickHandler}>{btnText}</Button>}
    </div>
  );
}
