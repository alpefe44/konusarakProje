import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParams, TabParams } from '../Types'
import PaginationScreen from '../Components/PaginationScreen'
import EpisodeDetail from '../Screens/EpisodeDetail'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteScreen from '../Screens/FavoriteScreen'

import Icon from 'react-native-vector-icons/Ionicons'




const Stack = createNativeStackNavigator<RootStackParams>()

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='StackHome' component={PaginationScreen}></Stack.Screen>
            <Stack.Screen name='DetailScreen' component={EpisodeDetail}></Stack.Screen>
        </Stack.Navigator>

    )
}



const Tab = createBottomTabNavigator<TabParams>();

function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{tabBarStyle : {backgroundColor : '#f7efcb'}}}>
            <Tab.Screen options={{
                headerShown: false, tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon name="home" color={focused ? '#4c6925' : 'gray'} size={size} />
                ),
            }} name="Home" component={StackNavigator} />
            <Tab.Screen options={{
                headerShown: false, tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon name="heart" color={focused ? '#4c6925' : 'gray'} size={size} />
                ),
            }} name="Favorite" component={FavoriteScreen} />
        </Tab.Navigator >
    );
}



const RootStack = createNativeStackNavigator()

const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name='TabHome' component={MyTabs}></RootStack.Screen>
        </RootStack.Navigator>

    )
}


export default RootNavigator