import React from 'react'
import { Text } from 'react-native'

import { useTheme } from '@/Hooks'

interface AppTextProps {
  children: React.ReactNode
  style?: Object
  onPress?: () => void
}

const AppText = ({ children, style, onPress }: AppTextProps) => {
  const { Colors, FontStyle } = useTheme()

  return (
    <Text
      style={{
        fontFamily: FontStyle.regular,
        color: Colors.text,
        ...style,
      }}
      onPress={onPress}
    >
      {children}
    </Text>
  )
}

export default AppText
