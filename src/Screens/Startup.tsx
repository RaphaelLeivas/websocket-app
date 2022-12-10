import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { useTheme } from '@/Hooks'
import { Logo, AppText } from '@/Components'
import { setDefaultTheme } from '@/Store/Slices'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { Permissions } from '@/Services'
import { BluetoothSerialDriver } from '@/Drivers'

const Startup = () => {
  const { Layout, Gutters, Fonts, Colors } = useTheme()

  const initializeApp = async () => {
    try {
      await Permissions.requestAllPermissions()
      await BluetoothSerialDriver.requestBluetoothEnable()

      setDefaultTheme({ theme: 'default', darkMode: false })
      setTimeout(() => {
        navigateAndSimpleReset('BluetoothDevices')
      }, 1000)
    } catch (error) {
      console.error('Erro ao inicializar app: ', error)

      setDefaultTheme({ theme: 'default', darkMode: false })
      setTimeout(() => {
        navigateAndSimpleReset('BluetoothDevices')
      }, 1000)
    }
  }

  useEffect(() => {
    initializeApp()
  }, [])

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Logo />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} color={Colors.primary} />
      <AppText style={Fonts.textCenter}>{'Welcome!'}</AppText>
    </View>
  )
}

export default Startup
