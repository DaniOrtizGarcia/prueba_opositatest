import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from './loader';

const getLoaderElement = () => screen.getByTestId('loader');
const renderLoader = () => render(<Loader />);

describe('Loader Component', () => {
  it('should render the loader', () => {
    renderLoader();
    const loaderElement = getLoaderElement();
    
    expect(loaderElement).toBeInTheDocument();
  });
});
