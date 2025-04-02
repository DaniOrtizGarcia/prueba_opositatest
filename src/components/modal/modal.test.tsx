import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Modal } from './modal';

const getModalElement = () => screen.getByTestId('modal');
const renderModal = () => render(<Modal>Test Content</Modal>);

describe('Modal Component', () => {
  it('should render the modal with children', () => {
    renderModal();
    const modalElement = getModalElement();
    
    expect(modalElement).toBeInTheDocument();
    expect(modalElement).toHaveTextContent('Test Content');
  });
});
