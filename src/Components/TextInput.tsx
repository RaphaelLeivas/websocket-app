import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { useTheme } from '@/Hooks'

type TextInputProps = React.ComponentProps<typeof Input> & { errorText?: string }

const TextInput = ({ errorText, ...props }: TextInputProps) => {
  const { Colors, FontStyle } = useTheme()

  return (
    <View style={styles.container}>
      <Input
        style={{ backgroundColor: Colors.textInputs }}
        placeholderTextColor={Colors.gray}
        selectionColor={Colors.primary}
        underlineColor="transparent"
        mode="outlined"
        theme={{
          colors: { primary: Colors.primary, text: Colors.input },
          fonts: { regular: { fontFamily: FontStyle.regular } },
        }}
        {...props}
      />
      {errorText ? (
        <Text style={{ ...styles.error, color: Colors.error, fontFamily: FontStyle.regular }}>
          {errorText}
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  error: {
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
})

export default TextInput
