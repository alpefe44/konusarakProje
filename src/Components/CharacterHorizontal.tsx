import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { memo, useState } from 'react'
import { Characters } from '../Types'
import CharacterModal from './CharacterModal'
import LottieView from 'lottie-react-native'

type Props = {
    loading: boolean,
    item: Characters
}


const CharacterHorizontal = ({ item, loading }: Props) => {

    const [isOpen, setOpen] = useState<boolean>(false)

    function closeModal() {
        setOpen(false)
    }

    if (loading) {
        return (
            <LottieView style={{ width: 50, height: 50 }} source={require('../../assets/icons/detailloading.json')} autoPlay loop />
        )
    }

    return (
        <>
            <Pressable onPress={() => setOpen(true)}>
                <View style={Styles.itemContainer}>
                    <Image style={Styles.image} source={{ uri: item.image }}></Image>
                    <Text style={Styles.text}>{item.name}</Text>
                </View>
            </Pressable>

            <CharacterModal character={item} isVisible={isOpen} onClose={closeModal}></CharacterModal>
        </>
    )
}

const Styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius: 16
    },
    text: {
        color: '#2c450a',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }

})

export default memo(CharacterHorizontal)