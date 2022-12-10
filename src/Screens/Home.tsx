import React, { useEffect, useRef } from 'react'

import { Logo, HeaderText, Background, Button } from '@/Components'
import { BluetoothSerialDriver } from '@/Drivers'

const WS_SERVER_IP_CASA = '192.168.0.71'
const WS_SERVER_PORT = '3001'

const Home = () => {
  // const ws = useRef(new WebSocket(`ws://${WS_SERVER_IP_CASA}:${WS_SERVER_PORT}/`)).current

  useEffect(() => {
    // ws.onopen = () => {
    //   console.log('Connection sucessfully established')
    // }
    // ws.onclose = () => {
    //   console.log('Connection sucessfully closed')
    // }
    // ws.onerror = (e) => {
    //   console.error(e.message)
    // }

    // BluetoothSerialDriver.BluetoothSerial.on('read', (data) => {
    //   console.log(data)
    // })

    BluetoothSerialDriver.BluetoothSerial.withDelimiter('\n').then(() => {
      BluetoothSerialDriver.BluetoothSerial.on('read', (data) => {
        console.log(data)
      })
    })
  }, [])

  const submitMessage = () => {
    // ws.send('teste')
  }

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

export default Home
