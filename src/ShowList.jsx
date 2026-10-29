import ShowCard from './ShowCard.jsx'

function ShowList({ shows }) {
  return (
    <div className="show-list">
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  )
}

export default ShowList
