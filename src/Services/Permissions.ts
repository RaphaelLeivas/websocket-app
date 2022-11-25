import { PermissionsAndroid, PermissionStatus, Platform } from 'react-native'

// @ts-ignore
const OSVersion = Platform.constants.Release

let translation = {
  permissionTitle: '',
  permissionMessage: '',
  cancel: '',
  ok: '',
}

const requestAllPermissions = () => {
  return new Promise(async (resolve) => {
    try {
      let granted: PermissionStatus

      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: translation.permissionTitle,
          message: translation.permissionMessage,
          buttonNegative: translation.cancel,
          buttonPositive: translation.ok,
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Approximate location permission for bluetooth scanning granted.')
      } else {
        console.warn('Approximate location permission for bluetooth scanning denied.')
      }

      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Read internal storage permission granted.')
      } else {
        console.warn('Read internal storage permission denied.')
      }

      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Write internal storage permission granted.')
      } else {
        console.warn('Write internal storage permission denied.')
      }

      if (OSVersion === '12') {
        granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN)

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Bluetooth Scan Permission for Android 12 granted.')
        } else {
          console.warn('Bluetooth Scan Permission for Android 12 denied.')
        }

        granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT)

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Bluetooth Connect Permission for Android 12 granted.')
        } else {
          console.warn('Bluetooth Connect Permission for Android 12 denied.')
        }
      }

      // granted = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE
      // )
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   console.log('Manage internal storage permission granted.')
      // } else {
      //   console.warn('Manage internal storage permission denied.')
      // }

      resolve(true)
    } catch (err) {
      console.error(err)
    }
  })
}

export default {
  requestAllPermissions,
}
