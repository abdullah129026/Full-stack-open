const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={(e) => onFilterChange(e.target.value)} />
    </div>
  )
}

export default Filter
