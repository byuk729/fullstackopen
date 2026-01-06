const PersonForm = ({nameInput, numberInput, nameInputAction, numberInputAction, submitAction}) => {
    return (
        <form onSubmit={submitAction}>
        <div>
          name: <input value={nameInput} onChange={nameInputAction}/>
        </div>
          <div>
          number: <input value={numberInput} onChange={numberInputAction}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm