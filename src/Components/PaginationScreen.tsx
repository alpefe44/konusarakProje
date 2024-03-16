import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet, Pressable, Image, TextInput, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import EpisodeItem from './EpisodeItem'
import usePagination from '../Hooks/usePagination'

import Icon from 'react-native-vector-icons/Entypo'
import LottieView from 'lottie-react-native'

const PaginationScreen = () => {

    const pageSize = 5
    const { episodes, nextPage, loading, page, prevPage } = usePagination()

    const [currentSegment, setCurrentSegment] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const segmentEpisodes = () => {

        const filteredEpisodes = episodes.filter(episode => episode.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const segmentCount = Math.ceil(episodes.length / pageSize);

        const segments = [];
        for (let i = 0; i < segmentCount; i++) {
            segments.push(filteredEpisodes.slice(i * pageSize, (i + 1) * pageSize));
        }
        return segments;
    };

    const renderSegment = () => {
        const segments = segmentEpisodes();
        const currentEpisodes = segments[currentSegment];
        return currentEpisodes ? currentEpisodes.map((episode, index) => (
            <EpisodeItem key={index} item={episode} />
        )) : [];
    };

    const showPrevSegment = () => {
        if (currentSegment > 0)
            setCurrentSegment(currentSegment - 1);
    };

    const showNextSegment = () => {
        if (currentSegment < 3)
            setCurrentSegment(currentSegment + 1);
    };


    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#97ce4c' }}>
                <LottieView style={{ width: 100, height: 100, alignSelf: 'center' }} source={require('../../assets/icons/detailloading.json')} autoPlay loop />
            </View>
        )
    }
    return (

        <View style={{ flex: 1, paddingVertical: 15 }}>
            {/* <ImageBackground style={{ flex: 1 }} source={require('../../assets/icons/background.jpeg')}></ImageBackground> bunu denicez */}
            <View style={Styles.iconView}>
                <Pressable onPress={() => prevPage()}>
                    <Image style={Styles.iconsStyle} source={require('../../assets/icons/downpng.png')}></Image>
                </Pressable>
                <Pressable onPress={() => nextPage()}>
                    <Image style={Styles.iconsStyle} source={require('../../assets/icons/uppng.png')}></Image>
                </Pressable>
            </View>
            <TextInput
                style={Styles.searchBar}
                placeholder="Search by name"
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
            />
            <FlatList
                data={renderSegment()}
                renderItem={({ item }) => <View>{item}</View>}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={Styles.iconView}>
                <Icon size={50} color={'black'} name="chevron-thin-left" onPress={showPrevSegment} />
                <Text style={Styles.segmentText}>{currentSegment + 1}</Text>
                <Icon size={50} color={'black'} name='chevron-thin-right' onPress={showNextSegment} />
            </View>

        </View>
    )
}


const Styles = StyleSheet.create({
    iconView: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        gap: 45
    },
    iconsStyle: {
        width: 100,
        height: 100
    },
    segmentText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black'
    },
    searchBar: {
        // marginTop: 15,
        borderRadius: 16,
        height: 40,
        borderColor: '#2c450a',
        borderWidth: 2,
        marginBottom: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
    }
})

export default PaginationScreen