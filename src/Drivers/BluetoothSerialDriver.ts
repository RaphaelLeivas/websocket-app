import BluetoothSerial from 'react-native-bluetooth-serial'

const requestBluetoothEnable = async () => {
    await BluetoothSerial.requestEnable()
}

const scanUnpairedDevices = async () => {
    const devices = await BluetoothSerial.discoverUnpairedDevices()
    return devices
}

const connectToDevice = async (deviceId: string) => {
    await BluetoothSerial.connect(deviceId)
    console.log('Successfully connected to device')
}

const disconnectFromDevice = async () => {
    await BluetoothSerial.removeListener('read')
    console.log('Successfully removed READ listener')
    await BluetoothSerial.disconnect()
    console.log('Successfully disconnected from device')
}

export default {
    requestBluetoothEnable,
    scanUnpairedDevices,
    connectToDevice,
    disconnectFromDevice,
    BluetoothSerial,
}
