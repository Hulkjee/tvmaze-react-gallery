function ShowCard({ show }) {
  return (
    <div className="show-card">
      <h3>{show.name}</h3>

      <p>
        Summary: {show.summary
          ? show.summary.replace(/<[^>]*>/g, '')
          : 'Not available'}
      </p>

      <p>Premiered: {show.premiered || 'Not available'}</p>

      <p>
        Genres: {show.genres?.length
          ? show.genres.join(', ')
          : 'Not available'}
      </p>

      <p>
        Rating: {show.rating?.average ?? 'Not available'}
      </p>
    </div>
  )
}

export default ShowCard
