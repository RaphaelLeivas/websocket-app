import { Vibration } from 'react-native'

const vibrate = () => {
  const VIBRATION_INTERVAL = 100

  return Vibration.vibrate(VIBRATION_INTERVAL)
}

export default vibrate
