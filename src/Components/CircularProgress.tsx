import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

import { useTheme } from '@/Hooks'

interface CircularProgressProps {
  loading: boolean
  message: string
}

const CircularProgress = ({ loading, message, ...props }: CircularProgressProps) => {
  const { Colors, FontStyle } = useTheme()

  return (
    <Spinner
      visible={loading}
      color={Colors.primary}
      animation="fade"
      textContent={message}
      textStyle={{ color: Colors.circularProgress, fontFamily: FontStyle.regular }}
      {...props}
    />
  )
}

export default CircularProgress
