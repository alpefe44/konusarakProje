import { View, Text, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getEpisode } from '../Services/fetchApi'
import { EpisodeResult } from '../Types'


type Props = {
    page: number,
    nextPage: any,
    prevPage: any,
    loading: boolean,
    episodes: EpisodeResult[]
}

const usePagination = () => {

    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    const [episodes, setEpisodes] = useState<EpisodeResult[]>([]);

    function nextPage() {
        if (page < 3) {
            setPage((prev) => prev + 1)
        }
    }

    function prevPage() {
        if (page > 0) {
            setPage((prev) => prev - 1)
        }
    }


    const getData = async (page: number) => {
        setLoading(true)
        try {
            const data = await getEpisode(page)
            if (data) {
                setEpisodes(data.results)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData(page)
    }, [page])


    return { page, nextPage, prevPage, loading, episodes } as Props
}

export default usePagination