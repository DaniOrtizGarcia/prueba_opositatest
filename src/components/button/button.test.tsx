import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button, ButtonProps, ButtonTypes } from './button';

const getButton = () => screen.getByRole('button');
const renderButton = (props: ButtonProps) => render(<Button {...props} />);

describe('Button Component', () => {
  it('renders with default props', () => {
    renderButton({text: 'Click me', onClick: () => {}});
    const button = getButton();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(button).not.toBeDisabled();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    renderButton({text: 'Click me', onClick: handleClick});
    const button = getButton();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with Button with type CLOSEICON', () => {
    renderButton({text: 'Click me', onClick: () => {}, type: ButtonTypes.CLOSEICON});
    expect(getButton()).toHaveClass(ButtonTypes.CLOSEICON);
  });

  it('renders with Button with type DEFAULT', () => {
    renderButton({text: 'Click me', onClick: () => {}, type: ButtonTypes.DEFAULT});
    expect(getButton()).toHaveClass(ButtonTypes.DEFAULT);
  });

  it('applies custom text color', () => {
    renderButton({text: 'Click me', onClick: () => {}, colorText: 'red'});
    expect(getButton()).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('disables button when disabled prop is true', () => {
    renderButton({text: 'Click me', onClick: () => {}, disabled: true});
    expect(getButton()).toBeDisabled();
  });
});
