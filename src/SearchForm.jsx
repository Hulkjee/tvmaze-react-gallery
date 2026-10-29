function SearchForm({ query, setQuery, onSearch }) {

  function handleSubmit(event) {
    event.preventDefault()
    onSearch()
  }

  return (
    <div className="search-form">
      <h2>Search TV Shows</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a TV show name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchForm
