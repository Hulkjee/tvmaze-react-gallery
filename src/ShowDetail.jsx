
/*
Description: Displays detailed information about a TV show.
*/

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { cleanSummary, formatDate } from './utils.js'

function ShowDetail() {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchShowDetails() {
      setLoading(true)
      setError('')
      setShow(null)
      setCast([])

      try {
        const showResponse = await fetch(
          `https://api.tvmaze.com/shows/${id}`
        )

        if (!showResponse.ok) {
          throw new Error('Show not found or unable to load details.')
        }

        const showData = await showResponse.json()

        const castResponse = await fetch(
          `https://api.tvmaze.com/shows/${id}/cast`
        )

        if (!castResponse.ok) {
          throw new Error('Unable to load cast information.')
        }

        const castData = await castResponse.json()

        if (!cancelled) {
          setShow(showData)
          setCast(castData.slice(0, 15))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchShowDetails()

    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <div className="show-detail">
      <Link to="/">← Back to Gallery</Link>

      {loading && <p>Loading show details...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && show && (
        <>
          <h1>{show.name}</h1>

          {show.image?.original ? (
            <img
              src={show.image.original}
              alt={`Poster for ${show.name}`}
              className="detail-poster"
            />
          ) : (
            <p>Poster not available</p>
          )}

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

          <p><strong>Status:</strong> {show.status || 'Not available'}</p>

          <p>
            <strong>Network:</strong>{' '}
            {show.network?.name || show.webChannel?.name || 'Not available'}
          </p>

          <h2>Cast</h2>

          {cast.length > 0 ? (
            <ul>
              {cast.map((item) => (
                <li key={`${item.person.id}-${item.character.id}`}>
                  {item.person.name} as {item.character.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>Cast information not available.</p>
          )}

          {show.url && (
            <p>
              <a href={show.url} target="_blank" rel="noopener noreferrer">
                View on TVmaze
              </a>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default ShowDetail
