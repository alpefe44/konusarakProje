import { View, Text, Pressable, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Characters } from '../Types'

import Icon from 'react-native-vector-icons/FontAwesome'
import ConfirmModal from './ConfirmModal'
import { useDispatch } from 'react-redux'
import { deleteFavorite } from '../utils/slice/favoriteSlice'

type Props = {
    item: Characters
}

const { height, width } = Dimensions.get('screen')


const FavoriteItem = ({ item }: Props) => {

    const dispatch = useDispatch()

    const [isOpen, setOpen] = useState<boolean>(false)

    function onClose() {
        setOpen(false)
    }

    return (

        <View style={Styles.itemContainer}>
            <Pressable onPress={() => setOpen(true)} style={Styles.iconStyle}>
                <Icon name='heart' color={'#4c6925'} size={28}></Icon>
            </Pressable>
            <View style={Styles.innerContainer}>
                <Image style={Styles.imageStyle} source={{ uri: item.image }}></Image>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={Styles.text}>{item.name}</Text>
                    <View>
                        <Text style={Styles.text}>{item.species}</Text>
                        <Text style={Styles.text}>{item.location.name}</Text>
                    </View>
                </View>
            </View>

            <ConfirmModal isVisible={isOpen} onCancel={onClose} onConfirm={() => dispatch(deleteFavorite({ item: item }))} ></ConfirmModal>
        </View>
    )
}

const Styles = StyleSheet.create({
    itemContainer: {
        width: width * .8,
        alignSelf: 'center',
        marginVertical: 25,
        backgroundColor: '#f7efcb',
        paddingVertical: 15,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Android'de gölge efekti için elevation kullanılır
    },
    iconStyle: {
        position: 'absolute',
        right: 13,
        top: 8
    },
    innerContainer: {
        flexDirection: 'row',
        paddingLeft : 15,
        gap: 15,
        width: '100%'
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 16
    },
    text: {
        color: '#45400a',
        fontSize: 14,
        width: 100,
        fontWeight: 'bold'
    },

})


export default FavoriteItem