import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Characters } from '../../Types'
import { Alert } from 'react-native'
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';


PushNotification.createChannel(
    {
        channelId: "channel-id",
        channelName: "Channel Name",
        channelDescription: "A brief description of the channel",
        playSound: true,
        soundName: "default",
        vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`) // Kanal oluşturulduğunda geri çağrı
);

export interface CounterState {
    value: Characters[]
}

const initialState: CounterState = {
    value: [],
}

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Characters>) => {

            if (state.value.length < 10) {
                if (state.value.find(item => item.id === action.payload.item.id)) {
                    console.log("Bu Karakter ZATEN VAR");
                } else {
                    state.value.push(action.payload.item);
                    AsyncStorage.setItem('favorites', JSON.stringify(state.value))
                }
            } else {
                PushNotification.localNotification({
                    channelId: "channel-id",
                    title: "Favori karakter ekleme sayısını aştınız.",
                    message: " Başka bir karakteri favorilerden çıkarmalısınız",
                });

            }
        },

        deleteFavorite: (state, action) => {
            const deletedItemId = action.payload.item.id;

            const newFavorites = state.value.filter((item) => item.id !== deletedItemId);
            state.value = newFavorites;
            AsyncStorage.setItem('favorites', JSON.stringify(state.value))

        }
    },
})

export const { addFavorite, deleteFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer