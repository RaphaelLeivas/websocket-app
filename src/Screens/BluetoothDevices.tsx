import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { Button as IconButton } from 'react-native-elements'
import { Icon } from 'react-native-elements'

import { useTheme } from '@/Hooks'
import { navigate } from '@/Navigators/utils'
import {
  Background,
  Logo,
  AppText,
  Button,
} from '@/Components'
import { PeripheralType } from '@/Types'
import { BluetoothSerialDriver } from '@/Drivers'

const BluetoothDevices = ({ navigation }) => {
  const [devices, setDevices] = useState<PeripheralType[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const { Colors, FontStyle } = useTheme()

  useEffect(() => {
    // callback executado toda vez que chega na página
    const unsubscribeFocus = navigation.addListener('focus', () => {
      (async () => {
        try {
          setDevices([])
          // await Communication.initialize()
          // await Communication.disconnectFromAllDevices()
          await BluetoothSerialDriver.disconnectFromDevice()
          await _startRefresh()
        } catch (err) {
          console.error('Error on initializing Bluetooth: ', err)
        }
      })()
    })

    return () => {
      unsubscribeFocus()
    }
  }, [])

  const _onDeviceSelected = async (device: PeripheralType) => {
    await BluetoothSerialDriver.connectToDevice(device.id)
    setTimeout(() => navigate('Home'), 1000)
  }

  const _startRefresh = async () => {
    setRefreshing(true)
    const discoveredDevices = await BluetoothSerialDriver.scanUnpairedDevices()
    setDevices(discoveredDevices)
    // console.log('>>LOG  ~ file: BluetoothDevices.tsx:80 ~ discoveredDevices', discoveredDevices)
    setRefreshing(false)
  }

  const _handleDisconnectDevice = async () => {
    await BluetoothSerialDriver.disconnectFromDevice()
  }

  return (
    <>
      <Background
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_startRefresh} />}
      >
        <Logo height={100} />

        {devices.length ? (
          devices.map((device) => (
            <View style={styles.listContainer} key={device.id}>
              <TouchableOpacity
                onPress={() => _onDeviceSelected(device)}
                style={{ ...styles.item, borderBottomColor: Colors.gray }}
              >
                <Icon
                  name={'bluetooth'}
                  style={styles.icon}
                  tvParallaxProperties // usado em iOS
                  color={Colors.text}
                />
                <View>
                  <AppText>{device.name}</AppText>
                  <AppText style={{ fontSize: 11 }}>Bluetooth address: {device.id}</AppText>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <AppText style={styles.notFoundText}>
            {refreshing ? 'Pesquisando...' : 'Não encontrado.'}
          </AppText>
        )}

        <IconButton
          icon={
            <Icon
              name={'sync'}
              color={Colors.searchButton}
              style={styles.icon}
              size={35}
              tvParallaxProperties // usado em iOS
            />
          }
          type="outline"
          buttonStyle={{
            borderColor: Colors.searchButton,
            marginRight: 8,
            borderRadius: 32,
            marginTop: 16,
          }}
          titleStyle={{ color: Colors.searchButton, fontFamily: FontStyle.regular }}
          title={'Buscar'}
          containerStyle={{ marginBottom: 8 }}
          onPress={_startRefresh}
          disabled={refreshing}
        />

        <Button onPress={() => navigate('Home')}>Avançar</Button>
        <Button onPress={_handleDisconnectDevice}>Desconectar</Button>

      </Background>
    </>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    minWidth: '100%',
    padding: 12,
    marginBottom: 8,
    borderBottomWidth: 2,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  notFoundText: {
    textAlign: 'center',
    fontSize: 14,

    marginBottom: 24,
  },
})

export default BluetoothDevices
