const Person = ({name, number}) => {
  return (
    <>
    <p>{name}: {number}</p>
    </>
  )
}

const Persons = ({personMap}) => {
    return (
        <>
        {personMap.map(person => <Person key={person.id} name={person.name} number={person.number}/>)}
         </>
    )

}

export default Persons