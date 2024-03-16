import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { Characters, EpisodeResult, RootStackParams } from '../Types'
import { getEpisodeCharacters } from '../Services/fetchApi'
import CharacterHorizontal from './CharacterHorizontal'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import LottieView from 'lottie-react-native'

type Props = {
    item: EpisodeResult
}


const EpisodeItem = ({ item }: Props) => {


    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(false)

    const [currentIndex, setCurrentIndex] = useState(0);

    // const getCharactersData = async (id: number) => {
    //     try {
    //         setLoading(true)
    //         const response = await getEpisodeCharacters(id);
    //         if (response) {
    //             setCharacters((prev) => [...prev, response])
    //             setLoading(false)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        const getCharactersData = async () => {
            try {
                setLoading(true)
                const characterIds = item.characters.map(url => {
                    const characterId = url.substring(url.lastIndexOf("/") + 1);
                    return parseInt(characterId);
                });
                const responses = await Promise.all(characterIds.map(id => getEpisodeCharacters(id)));
                setCharacters(responses.filter(Boolean));
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        };

        getCharactersData();
        setCurrentIndex(0)
    }, [item])

    const renderNext = () => {
        if (currentIndex < characters.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const renderPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const handleNextPage = () => {
        setCurrentIndex(currentIndex + 3);
    };

    const handlePrevPage = () => {
        setCurrentIndex(Math.max(currentIndex - 3, 0));
    };


    return (
        <Pressable onPress={() => navigate('DetailScreen', { id: item.id })}>
            <View style={Styles.itemCard}>
                <View style={Styles.textView}>
                    <Text style={Styles.title}>Name : </Text>
                    <Text style={Styles.subText}>{item.name}</Text>
                </View>

                <View style={Styles.textView}>
                    <Text style={Styles.title}>Episode : </Text>
                    <Text style={Styles.subText}>{item.episode}</Text>
                </View>

                <View style={Styles.buttonsContainer}>
                    <Pressable style={Styles.arrowButton} onPress={renderPrevious}>
                        <Image style={Styles.iconsStyle} source={require('../../assets/icons/innerleft.png')}></Image>
                    </Pressable>
                    <FlatList
                        style={{ marginTop: 15 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={characters.slice(currentIndex, currentIndex + 3)}
                        renderItem={({ item }) => <CharacterHorizontal loading={loading} item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                    />

                    <Pressable style={Styles.arrowButton} onPress={renderNext}>
                        <Image style={Styles.iconsStyle} source={require('../../assets/icons/innerright.png')}></Image>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )

}




const Styles = StyleSheet.create({
    itemCard: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#97ce4c',
        marginHorizontal: 15,
        borderRadius: 16,
        height: 200,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#2c450a',

    },
    subText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#f7f086',
        fontFamily: 'sans-serif-medium'
    },
    textView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    arrowButton: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconsStyle: {
        width: 40,
        height: 40
    }
}
)

export default memo(EpisodeItem)