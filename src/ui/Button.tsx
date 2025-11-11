import { MouseEventHandler } from "react";

type TButtonProps = {
  text: string;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

function Button({ text, onClickHandler, className = " " }: TButtonProps) {
  return (
    <button className={className} onClick={onClickHandler}>
      {text}
    </button>
  );
}

export default Button;
