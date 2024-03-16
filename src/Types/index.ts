export type EpisodeResult = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string
    created: Date
}



export type Characters = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: string[]
}



export type RootStackParams = {
    StackHome: undefined,
    DetailScreen: { id: number }
}

export type TabParams = {
    Home: undefined,
    Favorite: undefined
}