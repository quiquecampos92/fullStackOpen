import axios from 'axios'
const basedUrl = 'https://studies.cs.helsinki.fi/restcountries/'


const getAllCountries = () => {
    return axios.get(`${basedUrl}/api/all`)
}

const getOneCountry = (name) => {
    return axios.get(`${basedUrl}/api/name/${name}`)
}

export default {
    getAllCountries,
    getOneCountry
}