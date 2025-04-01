import React from "react";
import "./search-bar.scss";

interface SearchBarProps {
  searchQuery: string;
  handleSearch: (searchValue: string) => void;
  inputPlaceholder: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({searchQuery, handleSearch, inputPlaceholder}) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder={inputPlaceholder}
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};
