
/*
Name: Abdullah Khan
Course: CSC 372
Description: Main component for the TVmaze React Gallery.
*/

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import SearchForm from './SearchForm.jsx'
import ShowList from './ShowList.jsx'
import ShowDetail from './ShowDetail.jsx'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('Featured Shows')

  // Fetch TV shows when the user searches
  async function searchShows(term) {
    const search = term.trim()

    if (!search) {
      setShows([])
      setSearchTerm('')
      setError('')
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')
    setSearchTerm(search)

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(search)}`
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

  // Load 10 featured shows when the page first opens
  useEffect(() => {
    let cancelled = false

    async function loadFeaturedShows() {
      const showNames = [
        'Breaking Bad',
        'Stranger Things',
        'Friends',
        'Game of Thrones',
        'The Walking Dead',
        'The Office',
        'Sherlock',
        'Dark',
        'Wednesday',
        'The Last of Us'
      ]

      setLoading(true)
      setError('')

      try {
        const results = []

        for (const name of showNames) {
          const response = await fetch(
            `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(name)}`
          )

          if (!response.ok) {
            throw new Error(
              response.status === 429
                ? 'Too many requests. Please try again later.'
                : 'Failed to load featured shows.'
            )
          }

          const show = await response.json()
          results.push(show)
        }

        if (!cancelled) {
          setShows(results)
        }
      } catch (err) {
        if (!cancelled) {
          setShows([])
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadFeaturedShows()

    return () => {
      cancelled = true
    }
  }, [])

  function handleSearch() {
    searchShows(query)
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <h1>TVmaze Show Gallery</h1>
              <p>Find information about your favorite TV shows!</p>

              <SearchForm
                query={query}
                setQuery={setQuery}
                onSearch={handleSearch}
              />

              <h2>{searchTerm || 'Search Results'}</h2>

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
          }
        />

        <Route path="/shows/:id" element={<ShowDetail />} />
      </Routes>
    </Router>
  )
}

export default App
