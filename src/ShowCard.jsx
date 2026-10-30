import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { cleanSummary, formatDate } from './utils.js'

function ShowCard({ show }) {
  const [cast, setCast] = useState([])
  const [castError, setCastError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchCast() {
      setCast([])
      setCastError(false)

      try {
        const response = await fetch(
          `https://api.tvmaze.com/shows/${show.id}/cast`
        )

        if (!response.ok) {
          throw new Error('Failed to load cast')
        }

        const data = await response.json()

        if (!cancelled) {
          setCast(data.slice(0, 5))
        }
      } catch {
        if (!cancelled) {
          setCastError(true)
        }
      }
    }

    fetchCast()

    return () => {
      cancelled = true
    }
  }, [show.id])

  return (
    <article className="show-card">
      {show.image?.medium ? (
        <img src={show.image.medium} alt={`Poster for ${show.name}`} />
      ) : (
        <p>Poster not available</p>
      )}

      <h3>
        <Link to={`/shows/${show.id}`}>{show.name}</Link>
      </h3>

      <p><strong>Summary:</strong> {cleanSummary(show.summary)}</p>
      <p><strong>Premiered:</strong> {show.premiered || 'Not available'}</p>
      <p><strong>Last Updated:</strong> {formatDate(show.updated)}</p>

      <p>
        <strong>Genres:</strong>{' '}
        {show.genres?.length ? show.genres.join(', ') : 'Not available'}
      </p>

      <p>
        <strong>Rating:</strong> {show.rating?.average ?? 'Not available'}
      </p>

      <p>
        <strong>Main Cast:</strong>{' '}
        {castError
          ? 'Unable to load cast'
          : cast.length
            ? cast.map((item) => item.person.name).join(', ')
            : 'Loading or not available'}
      </p>

      <a href={show.url} target="_blank" rel="noopener noreferrer">
        View on TVmaze
      </a>
    </article>
  )
}

export default ShowCard
