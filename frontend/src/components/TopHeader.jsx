function SearchBar() {
  return (
    <div className='search'>
      <h5 className='search-title'>ANIMO</h5>

      <div className='search-bar'>
        <input
          className='search-input'
          type='text'
          placeholder='What are you looking for?'
        />
      </div>
    </div>
  );
}

export default SearchBar;
