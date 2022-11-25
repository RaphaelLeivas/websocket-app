import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  NativeEventSubscription,
} from 'react-native'
import { Icon } from 'react-native-elements'

import { useTheme, useRedux, useDispatcher } from '@/Hooks'
import { navigate } from '@/Navigators/utils'
import { Logo, HeaderText, Background, AppText, PopUp, Button, Snackbar } from '@/Components'
import { TREATMENT_STATUS, SnackbarType } from '@/Types'
import { updateAppStatus, clearProtocol, clearTreatment, clearSelection } from '@/Store/Slices'
import { store } from '@/Store'

const WS_SERVER_IP_CASA = '192.168.0.71'
const WS_SERVER_PORT = '3001'

const Home = () => {
  const ws = useRef(new WebSocket(`ws://${WS_SERVER_IP_CASA}:${WS_SERVER_PORT}/`)).current

  React.useEffect(() => {
    ws.onopen = () => {
      console.log('Connection sucessfully established')
    }
    ws.onclose = () => {
      console.log('Connection sucessfully closed')
    }
    ws.onerror = (e) => {
      console.error(e.message)
    }
  }, [])

  const submitMessage = () => {
    ws.send('teste')
  }

  // useEffect(() => {
  //   let backHandler: NativeEventSubscription | null = null

  //   // callback executado toda vez que chega na página
  //   const unsubscribeFocus = navigation.addListener('focus', async () => {
  //     KeepAwake.deactivate()

  //     // limpa informações do reducer que podem ter sobrado
  //     dispatcher(clearProtocol())
  //     dispatcher(clearSelection())
  //     dispatcher(clearTreatment())

  //     // Log.logStoreState()

  //     if (internetConnection) {
  //       try {
  //         if (role === 'patient') {
  //           await PatientController.updateLastOnline(userId)
  //         } else {
  //           await ProfessionalController.updateLastOnline(userId)
  //         }
  //       } catch (err) {
  //         console.error('Erro ao atualizar lastOnline: ', err)
  //       }
  //     }

  //     const backAction = () => true

  //     backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

  //     dispatcher(
  //       updateAppStatus({
  //         type: 'treatmentStatus',
  //         status: TREATMENT_STATUS.NOT_STARTED,
  //       })
  //     )

  //     const lastSync = store.getState().appStatus.lastSync
  //     const shouldGeneralSync = store.getState().settings.shouldGeneralSync

  //     // sem internet, ou com menos de 1 minuto, não tenta sincronizar ao vision
  //     if (!internetConnection || Date.now() - lastSync < 60 * 1000) {
  //       return
  //     }

  //     // se a configuração pede para não sincronizar
  //     if (!shouldGeneralSync) {
  //       return
  //     }

  //     try {
  //       dispatcher(
  //         updateAppStatus({
  //           type: 'synchronizing',
  //           status: true,
  //         })
  //       )

  //       // primeiro envia tudo que estava com o sync = 0 pro Vision
  //       await SyncController.syncPatients()
  //       await SyncController.syncUserRelations()
  //       await SyncController.syncPatientHospitals()
  //       await SyncController.syncProtocols()
  //       await SyncController.syncChannels()
  //       await SyncController.syncElectrodes()
  //       await SyncController.syncTreatments()
  //       await SyncController.syncPreTreatmentEvals()
  //       await SyncController.syncPostTreatmentEvals()
  //       await SyncController.syncStimulus()
  //       await SyncController.syncExams()
  //       await SyncController.syncExamsData()

  //       // agora puxa e insere tudo do vision que foi criado após o lastSync
  //       await SyncController.getAndInsertUnsyncPatientsFromVision()
  //       await SyncController.getAndInsertUnsyncProtocolsFromVision()
  //       await SyncController.getAndInsertUnsyncTreatmentsFromVision()
  //       await SyncController.getAndInsertUnsyncExamsFromVision()

  //       dispatcher(
  //         updateAppStatus({
  //           type: 'lastSync',
  //           status: Date.now(),
  //         })
  //       )
  //       dispatcher(
  //         updateAppStatus({
  //           type: 'synchronizing',
  //           status: false,
  //         })
  //       )
  //     } catch (err: any) {
  //       console.error(JSON.stringify(err.data))

  //       setSnackbarVisible(true)
  //       setSnackbarMessage(t('home.syncError'))
  //       setSnackbarType('error')

  //       dispatcher(
  //         updateAppStatus({
  //           type: 'synchronizing',
  //           status: false,
  //         })
  //       )
  //     }
  //   })

  //   // callback executado toda vez que sai da página
  //   const unsubscribeBlur = navigation.addListener('blur', () => {
  //     if (backHandler) {
  //       backHandler.remove()
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
      <Background>
        <Logo height={100} />
        <HeaderText>{'Hello World!'}</HeaderText>
        <Button onPress={submitMessage} > Teste WS </Button>
      </Background>
    </>
  )
}

const styles = StyleSheet.create({

})

export default Home
