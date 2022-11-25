import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { useTheme } from '@/Hooks'

type ButtonProps = React.ComponentProps<typeof PaperButton>

const Button = ({ mode, children, color, ...props }: ButtonProps) => {
  const { Colors, FontStyle } = useTheme()

  return (
    <PaperButton
      style={[styles.button, { backgroundColor: color ?? Colors.primary }]}
      labelStyle={{
        ...styles.text,
        fontFamily: FontStyle.regular,
        color: Colors.button,
      }}
      mode={mode}
      {...props}
    >
      {children}
    </PaperButton>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})

export default memo(Button)
