import React, { ButtonHTMLAttributes } from "react";

import styles from "../Button/Button.styles";

interface ButtonProps extends Partial<ButtonHTMLAttributes<any>> {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick }) => (
  <>
    <button type={type} onClick={onClick}>
      {text}
    </button>
    <style jsx>{styles}</style>
  </>
);

export default Button;
