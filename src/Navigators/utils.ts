/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import { CommonActions, createNavigationContainerRef } from '@react-navigation/native'

export type RootStackParamList = {
  Startup: JSX.Element
  BluetoothDevices: JSX.Element
  Home: JSX.Element
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate(name: keyof RootStackParamList, params: any = {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export function navigateAndReset(routes = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      })
    )
  }
}

export function navigateAndSimpleReset(name: keyof RootStackParamList, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      })
    )
  }
}

export function getCurrentScreen() {
  return navigationRef.getState()
}