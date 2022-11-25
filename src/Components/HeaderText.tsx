import React, { memo } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@/Hooks'

interface HeaderTextProps {
  children: React.ReactNode
}

const HeaderText = ({ children }: HeaderTextProps) => {
  const { Colors, FontStyle } = useTheme()

  return (
    <Text style={{ ...styles.header, color: Colors.primary, fontFamily: FontStyle.regular }}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 14,
    textAlign: 'center',
  },
})

export default memo(HeaderText)
