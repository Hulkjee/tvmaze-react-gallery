
/*
Name: Abdullah Khan
Course: CSC 372
Description: Main component for the TVmaze React Gallery.
*/

import { useState, useEffect } from 'react'
import SearchForm from './SearchForm.jsx'
import ShowList from './ShowList.jsx'
import './App.css'

function App() {
  const [query, setQuery] = useState('Breaking Bad')
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function searchShows(searchTerm) {
    if (!searchTerm.trim()) {
      setShows([])
      setError('')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`
      )

      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? 'Too many requests. Please try again later.'
            : 'Failed to load TV shows.'
        )
      }

      const data = await response.json()
      const results = data.slice(0, 10).map((item) => item.show)

      setShows(results)
    } catch (err) {
      setShows([])
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchShows('Breaking Bad')
  }, [])

  function handleSearch() {
    searchShows(query)
  }

  return (
    <div className="app">
      <h1>TVmaze Show Gallery</h1>
      <p>Find information about your favorite TV shows!</p>

      <SearchForm
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />

      {loading && <p>Loading shows...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <>
          <p>Results: {shows.length}</p>
          {shows.length > 0 ? (
            <ShowList shows={shows} />
          ) : (
            <p>No shows found.</p>
          )}
        </>
      )}

      <footer>
        <p>
          Show information provided by{' '}
          <a href="https://www.tvmaze.com/">TVmaze</a>.
        </p>
      </footer>
    </div>
  )
}

export default App
