const Person = ({ person, handleDelete }) => {
  return (
    <div>
      <p>{person.name}: {person.number}</p>
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  )
}

const Persons = ({ personMap, handleDelete }) => {
  return (
    <>
      {personMap.map(person => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </>
  )
}

export default Persons