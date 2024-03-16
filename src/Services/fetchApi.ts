import axios from 'axios'




export const getEpisode = async (page = 1) => {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`)

        if (response) {
            return response.data
            // console.log(response.data)
        }
    } catch (error) {
        console.log(error)
    }
}



export const getEpisodeDetail = async (id: number) => {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`)

        if (response) {
            return response.data
            // console.log(response.data)
        }
    } catch (error) {
        console.log(error)
    }
}


export const getEpisodeCharacters = async (id: number) => {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)

        if (response) {
            return response.data
            // console.log(response.data)
        }
    } catch (error) {
        console.log(error)
    }
}


