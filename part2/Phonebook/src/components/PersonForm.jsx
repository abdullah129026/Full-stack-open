const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={(e) => onNameChange(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => onNumberChange(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
