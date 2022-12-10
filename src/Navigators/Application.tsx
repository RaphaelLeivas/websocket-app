import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar, LogBox } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useNetInfo } from '@react-native-community/netinfo'

import {
  Startup,
  BluetoothDevices,
  Home,
} from '@/Screens'
import { useTheme, useDispatcher } from '@/Hooks'
import { navigationRef } from './utils'
import { AppHeader } from '@/Components'
import { setConnectionStatus } from '@/Store/Slices'

const Stack = createStackNavigator()

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside',
  '`new NativeEventEmitter()` was called',
  'Using Math.random is not cryptographically secure!',
  'EventEmitter.removeListener',
])

const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const dispatcher = useDispatcher()
  const netInfo = useNetInfo()

  useEffect(() => {
    dispatcher(
      setConnectionStatus({ type: 'internet', status: netInfo.isInternetReachable })
    )
  }, [netInfo.isInternetReachable])

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card, flex: 1 }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            header: (args) => <AppHeader {...args} />,
          }}
        >
          {/* não logado */}
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Startup" component={Startup} />
          </Stack.Group>

          {/* logado */}
          <Stack.Group>
            <Stack.Screen
              name="BluetoothDevices"
              component={BluetoothDevices}
              options={{ title: 'Conexão Bluetooth' }}
            />
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
