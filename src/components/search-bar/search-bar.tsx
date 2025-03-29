import React from "react";
import "./search-bar.scss";

interface SearchBarProps {
  searchQuery: string;
  // eslint-disable-next-line no-unused-vars
  handleSearch: (searchValue: string) => void;
  inputPlaceholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({searchQuery, handleSearch, inputPlaceholder}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder={inputPlaceholder}
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
