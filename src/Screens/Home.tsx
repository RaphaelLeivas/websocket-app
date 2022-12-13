import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'

import { Background, BottomView } from '@/Components'
import { BluetoothSerialDriver } from '@/Drivers'

const WS_SERVER_IP_CASA = '192.168.0.71'
const WS_SERVER_PORT = '3001'

let ws: WebSocket | null = null


const Home = () => {
  const [number, setNumber] = useState(0)

  const submitMessage = () => {
    if (!ws) {
      return
    }

    ws.send('teste')
    setNumber(prev => prev + 1)
  }

  useEffect(() => {
    ws = new WebSocket(`ws://${WS_SERVER_IP_CASA}:${WS_SERVER_PORT}/`)

    ws.onopen = () => {
      console.log('Connection sucessfully established')
    }
    ws.onclose = () => {
      console.log('Connection sucessfully closed')
    }
    ws.onerror = (e) => {
      console.error(e.message)
    }

    BluetoothSerialDriver.BluetoothSerial.on('read', (data) => {
      console.log(data)
    })

    BluetoothSerialDriver.BluetoothSerial.withDelimiter('\n').then(() => {
      BluetoothSerialDriver.BluetoothSerial.on('read', (data) => {
        console.log(data)
        submitMessage()
      })
    })
  }, [])

  return (
    <>
      <Background>
        <Text style={{ fontSize: 200, marginTop: 64 }} >{number}</Text>
      </Background>

      <BottomView>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 32 }} >
          <Button onPress={submitMessage} title={'Simulate'} color={'#222222'} />
          <Button onPress={() => setNumber(prev => prev + 1)} title={'Increase'} color={'#4CAF50'} />
          <Button onPress={() => setNumber(0)} title={'Reset'} color={'#FF1C10'} />
        </View>
      </BottomView>
    </>
  )
}

export default Home
