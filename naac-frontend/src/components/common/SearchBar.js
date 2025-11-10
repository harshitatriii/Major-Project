// src/components/common/SearchBar.js
import React from 'react';

const SearchBar = ({ placeholder = 'Search...', value, onChange, onClear }) => {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="btn btn-outline-secondary" type="button" onClick={onClear}>
          <i className="bi bi-x-lg"></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;

