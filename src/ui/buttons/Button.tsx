import { MouseEventHandler } from "react";

type TButtonProps = {
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: React.ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
};

function Button({
  onClickHandler,
  children,
  className = "",
  type = "button",
  disabled = false,
}: TButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={className}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}

export default Button;
