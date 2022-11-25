import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'

import {
  LAYOUT_MAXIMUM_WIDTH,
  LAYOUT_HORIZONTAL_PADDING,
  LAYOUT_VERTICAL_PADDING,
} from '@/Theme/Variables'

interface BottomViewProps {
  children: React.ReactNode
}

const BottomView = ({ children }: BottomViewProps) => {
  const { Colors } = useTheme()

  return (
    <View style={{ ...styles.bottomViewContainer, backgroundColor: Colors.inputBackground }}>
      <View style={{ maxWidth: LAYOUT_MAXIMUM_WIDTH, width: '100%' }}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomViewContainer: {
    paddingHorizontal: LAYOUT_HORIZONTAL_PADDING,
    paddingVertical: LAYOUT_VERTICAL_PADDING,
    width: '100%',

    alignSelf: 'center',
    alignItems: 'center',
  },
})

export default BottomView
