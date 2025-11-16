import { MouseEventHandler } from "react";

import styles from "./Button.module.css";

type TButtonProps = {
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: React.ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
  style?: "primary" | "secondary" | "danger";
};

function Button({
  onClickHandler,
  children,
  className = "",
  type = "button",
  disabled = false,
  style,
}: TButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${className ? className : ""} ${
        styles[style ? `${style}` : ""]
      }`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}

export default Button;
