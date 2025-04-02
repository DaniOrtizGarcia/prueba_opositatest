import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './footer';

const getFooterElement = () => screen.getByRole('contentinfo');
const renderFooter = () => render(<Footer />);

describe('Footer Component', () => {
  it('should render the footer with correct text', () => {
    renderFooter();
    const footerElement = getFooterElement();
    
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveTextContent('Prueba técnica OpositaTest');
  });
});
