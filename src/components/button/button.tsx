import { BaseSyntheticEvent } from 'react';
import './button.scss';

export enum ButtonTypes {
  DEFAULT = 'default',
  LINK = 'link',
  ONLYICON = 'only-icon',
  CLOSEICON = 'close-icon'
}

interface ButtonProps {
  type?: ButtonTypes,
  text: string;
  onClick: (e: BaseSyntheticEvent) => void,
  colorText?: string,
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ type = ButtonTypes.DEFAULT, text, onClick, colorText, disabled }) => {
  return (
    <button
      className={`button ${type}`}
      style={{color: colorText}}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
