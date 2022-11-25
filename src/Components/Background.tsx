import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, ScrollViewProps } from 'react-native'

import {
  LAYOUT_MAXIMUM_WIDTH,
  LAYOUT_HORIZONTAL_PADDING,
  LAYOUT_VERTICAL_PADDING,
} from '@/Theme/Variables'
import { useTheme } from '@/Hooks'

interface BackgroundProps extends ScrollViewProps {
  children: React.ReactNode
  refreshControl?: JSX.Element
}

const Background = ({ children, refreshControl, ...props }: BackgroundProps) => {
  const { Colors } = useTheme()

  return (
    <ScrollView
      style={{ backgroundColor: Colors.inputBackground }}
      refreshControl={refreshControl ? refreshControl : undefined}
      {...props}
    >
      <View style={{ ...styles.background, backgroundColor: Colors.inputBackground }}>
        <KeyboardAvoidingView style={styles.container}>{children}</KeyboardAvoidingView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: LAYOUT_HORIZONTAL_PADDING,
    paddingVertical: LAYOUT_VERTICAL_PADDING,
    width: '100%',
    maxWidth: LAYOUT_MAXIMUM_WIDTH,
    alignSelf: 'center',
    alignItems: 'center',
  },
})

export default Background
