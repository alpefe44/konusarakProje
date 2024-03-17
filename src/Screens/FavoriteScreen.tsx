import { View, Text, FlatList, Image, Dimensions, Pressable, AppState } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../utils/store'
import CharacterHorizontal from '../Components/CharacterHorizontal'
import { Characters } from '../Types'

import Icon from 'react-native-vector-icons/FontAwesome'
import FavoriteItem from '../Components/FavoriteItem'
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const { height, width } = Dimensions.get('screen')

const FavoriteScreen = () => {

  const [favorites, setFavorites] = useState([])

  const stateFavorites = useSelector((state: RootState) => state.favorite.value)

  const getFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('favorites');
      if (value) {
        setFavorites(JSON.parse(value));
      }
    } catch (error) {
      console.log("Hata:", error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, [stateFavorites])


  if (favorites.length < 1) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView style={{ width: 100, height: 100 }} source={require('../../assets/icons/emptyanim.json')} autoPlay loop />
      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      {
        <FlatList data={favorites} renderItem={({ item }) => <FavoriteItem item={item}></FavoriteItem>}></FlatList>
      }
    </View>
  )
}

export default FavoriteScreen