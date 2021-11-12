import React, { ButtonHTMLAttributes } from "react";

import styles from "../Button/Button.styles";

interface ButtonProps extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick, className }) => (
  <>
    <button type={type} onClick={onClick} className={className}>
      {text}
    </button>
    <style jsx>{styles}</style>
  </>
);

export default Button;
