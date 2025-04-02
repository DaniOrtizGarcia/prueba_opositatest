import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar, SearchBarProps } from './search-bar';

const getSearchInput = () => screen.getByRole('textbox');
const renderSearchBar = (props: SearchBarProps) => render(<SearchBar {...props} />);

describe('SearchBar Component', () => {
  it('should render the search bar with the correct placeholder', () => {
    renderSearchBar({searchQuery: '', handleSearch: () => {}, inputPlaceholder: 'Search here...'});
    const searchInput = getSearchInput();
    
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Search here...');
  });

  it('should call handleSearch on input change', () => {
    const handleSearchMock = vi.fn();
    renderSearchBar({searchQuery: '', handleSearch: handleSearchMock, inputPlaceholder: 'Search here...'});
    const searchInput = getSearchInput();
    
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(handleSearchMock).toHaveBeenCalledWith('test');
  });
});
