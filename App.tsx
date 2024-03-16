import { SafeAreaView, View } from 'react-native'
import React from 'react'
import RootNavigator from './src/Navigation'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { store } from './src/utils/store'


const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1  }}>
          <RootNavigator></RootNavigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>

  )
}

export default App