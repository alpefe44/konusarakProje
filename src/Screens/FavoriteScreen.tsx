import { View, Text, FlatList, Image, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../utils/store'
import CharacterHorizontal from '../Components/CharacterHorizontal'
import { Characters } from '../Types'

import Icon from 'react-native-vector-icons/FontAwesome'
import FavoriteItem from '../Components/FavoriteItem'
import LottieView from 'lottie-react-native'


const { height, width } = Dimensions.get('screen')


const FavoriteScreen = () => {

  const favorites = useSelector((state: RootState) => state.favorite.value)




  return (
    <View style={{ flex: 1 }}>
      {
        favorites.length < 1 ? <LottieView style={{ width: 100, height: 100 }} source={require('../../assets/icons/emptyanim.json')} autoPlay loop /> : <FlatList data={favorites} renderItem={({ item }) => <FavoriteItem item={item}></FavoriteItem>}></FlatList>
      }
    </View>
  )
}

export default FavoriteScreen