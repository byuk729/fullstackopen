import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get('http://localhost:3001/persons')
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post('http://localhost:3001/persons', newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`http://localhost:3001/persons/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
    const request = axios.put(`${baseURL}/${id}`, updatedPerson)
    return request.then(response => response.data)
}
export default { getAll, create, deletePerson, updatePerson}