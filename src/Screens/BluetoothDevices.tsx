import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  EmitterSubscription,
  RefreshControl,
  BackHandler,
  NativeEventSubscription,
} from 'react-native'
import { Button as IconButton } from 'react-native-elements'
import { Icon } from 'react-native-elements'

import { useTheme, useDispatcher, useRedux } from '@/Hooks'
import { navigate } from '@/Navigators/utils'
import {
  Snackbar,
  Background,
  Logo,
  AppText,
  Button,
  CircularProgress,
  BottomView,
} from '@/Components'
import { api, Communication } from '@/Services'
import { SnackbarType, PeripheralType, EXAMPLE_DEVICE, Equipment } from '@/Types'
import { setConnectionStatus, updateDevice } from '@/Store/Slices'

const SHOULD_SHOW_SIMULATE_CONNECTION = true

const BluetoothDevices = ({ navigation }) => {

  // useEffect(() => {
  //   let backHandler: NativeEventSubscription | null = null
  //   let sendPeripheralListSubscription: EmitterSubscription | null = null

  //   // callback executado toda vez que chega na página
  //   const unsubscribeFocus = navigation.addListener('focus', () => {
  //     (async () => {
  //       try {
  //         setDevices([])
  //         dispatcher(setConnectionStatus({ type: 'bluetooth', status: false }))
  //         dispatcher(
  //           setConnectionStatus({ type: 'advancedWithoutBleConnection', status: false })
  //         )
  //         dispatcher(
  //           setConnectionStatus({ type: 'simulatingConnection', status: false })
  //         )
  //         await Communication.initialize()
  //         await Communication.disconnectFromAllDevices()
  //         await _startRefresh()
  //         console.log('Successfuly initialized Bluetooth.')
  //       } catch (err) {
  //         console.error('Error on initializing Bluetooth: ', err)
  //       }
  //     })()

  //     const backAction = () => true
  //     backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

  //     // executada quando o serviço de Ble envia o evento 'sendPeripheralList' para as telas
  //     // esse evento é enviado quando finaliza um scan
  //     const handleDiscoveredPeripheralList = (peripheralList: PeripheralType[]) => {
  //       setDevices(peripheralList)

  //       setRefreshing(false)
  //     }

  //     sendPeripheralListSubscription = Communication.bleEmitter.addListener(
  //       'sendPeripheralList',
  //       handleDiscoveredPeripheralList
  //     )
  //   })

  //   const unsubscribeBlur = navigation.addListener('blur', () => {
  //     if (backHandler) {
  //       backHandler.remove()
  //     }

  //     Communication.remove()
  //     if (sendPeripheralListSubscription) {
  //       sendPeripheralListSubscription.remove()
  //     }
  //   })

  //   return () => {
  //     unsubscribeFocus()
  //     unsubscribeBlur()
  //     if (backHandler) {
  //       backHandler.remove()
  //     }
  //   }
  // }, [])

  return (
    <>
      <Background
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_startRefresh} />}
      >
        <Logo height={100} />
        <AppText>
          Hello World!
        </AppText>

      </Background>

    </>
  )
}

const styles = StyleSheet.create({
})

export default BluetoothDevices
