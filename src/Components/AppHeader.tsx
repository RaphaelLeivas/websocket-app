import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { StackHeaderProps } from '@react-navigation/stack'

import { useTheme, useRedux, useDispatcher } from '@/Hooks'
import { AppText, PopUp, Button, AnimatedSync, TextInput } from '@/Components'
import { updateAppStatus, updateSettings } from '@/Store/Slices'
import { TREATMENT_STATUS, INTERFACE_INTENSITY_FACTORS, INTERFACE_TYPES_LIST } from '@/Types'
import { navigate, RootStackParamList } from '@/Navigators/utils'
import { Audio, vibrate } from '@/Services'
import { formatStimulationInterfaceTypeToLanguage } from '@/Utils'

interface AppHeaderProps extends StackHeaderProps { }

const AppHeader = ({ navigation, scene }: AppHeaderProps) => {
  const { Colors, FontStyle } = useTheme()

  const dispatcher = useDispatcher()
  const internetConnection = useRedux((storeState) => storeState.connection.internet)
  const bluetoothConnection = useRedux(
    (storeState) => storeState.connection.bluetooth
  )
  const advancedWithoutBleConnection = useRedux(
    (storeState) => storeState.connection.advancedWithoutBleConnection
  )

  const isTreatmentInProgress =
    useRedux((storeState) => storeState.appStatus.treatmentStatus) !==
    TREATMENT_STATUS.NOT_STARTED

  let canGoBack = useRedux((storeState) => storeState.appStatus.canGoBack)

  const title = scene.descriptor.options.title
  const routeKey: keyof RootStackParamList = scene.descriptor.route.name

  const _openDrawer = () => {
    dispatcher(updateAppStatus({ type: 'openDrawer', status: true }))
  }

  const _handleHeaderIconPress = () => {
      navigation.goBack()
  }

  useEffect(() => {
    if (advancedWithoutBleConnection) {
      return
    }

    if (
      routeKey !== 'BluetoothDevices' &&
      routeKey !== 'Home' &&
      !bluetoothConnection
    ) {
      setOpenBlePopUp(true)
      Audio.conectionBleErrorAudio()
      vibrate()
    }
  }, [bluetoothConnection])


  const _shouldShowGoBack = () => {
    return true
  }

  useEffect(() => {
    // callback executado toda vez que chega na página
    const unsubscribeFocus = navigation.addListener('focus', () => {
      dispatcher(updateAppStatus({ type: 'canGoBack', status: _shouldShowGoBack() }))
    })

    const unsubscribeBlur = navigation.addListener('blur', () => {
      dispatcher(updateAppStatus({ type: 'canGoBack', status: _shouldShowGoBack() }))
    })

    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [])

  // atualiza o shouldShowGoBack() toda vez que muda de tela (muda routeKey)
  // ou muda status do tratamento
  useEffect(() => {
    dispatcher(updateAppStatus({ type: 'canGoBack', status: _shouldShowGoBack() }))
  }, [isTreatmentInProgress, routeKey])

  canGoBack = _shouldShowGoBack()

  return (
    <>
      <View style={{ ...styles.header, backgroundColor: Colors.inputBackground }}>
        {canGoBack ? (
          <TouchableOpacity onPress={_handleHeaderIconPress} style={styles.iconContainer}>
            <Icon
              name={'arrow-back'}
              color={Colors.error}
              containerStyle={styles.icon}
              size={24}
              tvParallaxProperties // usado em iOS
            />
          </TouchableOpacity>

        ) : null}

        <AppText
          style={{
            color: Colors.primary,
            fontFamily: FontStyle.regular,
            fontSize: 20,
            flex: 6,
          }}
        >
          {title}
        </AppText>

      </View>
      {!internetConnection ? (
        <View style={{ ...styles.noConnectionHeader, backgroundColor: Colors.black }}>
          <AppText
            style={{
              fontFamily: FontStyle.regular,
              color: Colors.error,
              fontWeight: 'bold',
              textAlign: 'center',
              flex: 4,
            }}
          >
            {'nao conectado'}
          </AppText>
        </View>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 16,
  },
  iconLogout: {
    marginRight: 8,
  },
  header: {
    width: '100%',
    height: 60,
    padding: 12,
    elevation: 8,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noConnectionHeader: {
    width: '100%',
    padding: 12,
    elevation: 8,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    borderRadius: 32,
    flex: 2,
  },
  paperButton: {
    width: '50%',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  popUpText: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 20,
  },
  atentionPopUp: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 20,
  },
  iconContainer: {
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullInfoContainer: {
    width: '100%',
  },
  infoText: {
    fontSize: 11,
  },
  infoHeader: {
    fontWeight: '600',
  },
  channelsWrapper: {
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 8,
  },
  channelInfo: {
    flex: 1,

    marginHorizontal: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  channelHeader: {
    fontSize: 11,
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center',
    marginBottom: 8,
  },
  distanceInfoContainer: {
    width: '100%',
    marginBottom: 4,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSide: {
    flex: 1,
    textAlign: 'left',
  },
  rightSide: {
    flex: 1,
    textAlign: 'right',
  },
})

export default AppHeader
