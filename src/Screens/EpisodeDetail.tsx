import { View, Text, Image, StyleSheet, Dimensions, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getEpisodeCharacters, getEpisodeDetail } from '../Services/fetchApi'
import LottieView from 'lottie-react-native'
import { Characters, EpisodeResult } from '../Types'
import CharacterHorizontal from '../Components/CharacterHorizontal'

const { height, width } = Dimensions.get('screen')

const EpisodeDetail = ({ route, navigation }: any) => {

  const { id } = route.params

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<EpisodeResult>()

  const [characters, setCharacters] = useState<Characters[]>([])

  const [trackId, setTrackId] = useState<number>(id)


  function nextId() {
    if (trackId < 51) {
      setTrackId(trackId + 1)
    } else {
      setTrackId(1)
    }
  }

  function prevId() {
    if (trackId > 1) {
      setTrackId(trackId - 1)
    } else if (trackId === 1) {
      navigation.goBack()
    }
    console.log(trackId)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getEpisodeDetail(trackId)
        if (response) {
          setData(response)
          const characterIds = response.characters.map(url => {
            const characterId = url.substring(url.lastIndexOf("/") + 1);
            return parseInt(characterId);
          });
          const responses = await Promise.all(characterIds.map(id => getEpisodeCharacters(id)));
          setCharacters(responses.filter(Boolean));
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [trackId])

  if (loading) {
    return (
      <View style={{ flex: 1 , alignItems : 'center' , justifyContent : 'center' }}>
        <LottieView style={{ width: 100, height: 100 }} source={require('../../assets/icons/detailloading.json')} autoPlay loop duration={200} />
      </View>
    )
  }

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.titleView}>
          <Text style={Styles.title}>"{data?.name}"</Text>
        </View>

        <Text style={Styles.seasonText}>Season 1 , Episode {data?.id}</Text>

        <View style={Styles.imageView}>
          <Image style={{ flex: 1 }} source={{ uri: 'https://static.daktilo.com/sites/551/uploads/2023/09/12/rick-and-mortey.jpeg' }}></Image>
        </View>
        <View style={[Styles.titleView, { alignItems: 'flex-end', paddingHorizontal: 15 }]}>
          <Text style={Styles.subTitle}>Characters</Text>
        </View>

        <FlatList style={{ height: height * .2, marginVertical: 10 }} numColumns={2} contentContainerStyle={{ alignItems: 'center' }} data={characters} renderItem={({ item }) => <CharacterHorizontal item={item}></CharacterHorizontal>}></FlatList>


        <View style={[Styles.titleView, { alignItems: 'flex-end', paddingHorizontal: 15 }]}>
          <Text style={Styles.subTitle}>Broadcast Information</Text>
        </View>

        <View style={{ gap: 15 }}>
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: '600', color: 'black', fontSize: 14 }}>Created At : {new Date(data?.created!).toLocaleDateString('tr-TR')}</Text>
          </View>

          <View style={{ padding: 12, borderTopWidth: 1 }}>
            <Text style={{ fontWeight: '600', color: 'black', fontSize: 14 }}>Air Date : {data?.air_date}</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
        <Pressable style={Styles.arrowButton} onPress={prevId}>
          <Image style={Styles.iconsStyle} source={require('../../assets/icons/innerright.png')}></Image>
        </Pressable>
        <Pressable style={Styles.arrowButton} onPress={nextId}>
          <Image style={Styles.iconsStyle} source={require('../../assets/icons/innerleft.png')}></Image>
        </Pressable>
      </View>
    </>
  )
}




const Styles = StyleSheet.create({
  container: {
    width: width * .8,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#03afc9',
    marginVertical: 25
  },
  titleView: {
    alignItems: 'center',
    backgroundColor: '#03afc9',
    paddingVertical: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  seasonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#0092ae'
  },
  subTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18
  },
  imageView: {
    width: '100%',
    height: 150
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
})

export default EpisodeDetail