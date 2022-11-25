import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Icon, Button as IconButton } from 'react-native-elements'
import { Snackbar as PaperSnackbar } from 'react-native-paper'

import { useTheme } from '@/Hooks'
import { LAYOUT_HORIZONTAL_PADDING } from '@/Theme/Variables'
import { SnackbarType } from '@/Types'

interface SnackbarProps {
  visible: boolean
  handleClose: () => void
  type: SnackbarType
  message: string
  duration?: number
}

const Snackbar = ({ visible, handleClose, type = 'success', message, duration = 1500 }: SnackbarProps) => {
  const { Colors, FontStyle } = useTheme()

  const _getColorFromType = () => {
    switch (type) {
      case 'success':
        return Colors.success
      case 'error':
        return Colors.error
      case 'info':
        return Colors.blue
      case 'warning':
        return Colors.warning
    }
  }

  const _getIconFromType = () => {
    switch (type) {
      case 'success':
        return 'check-circle'
      case 'error':
        return 'error'
      case 'info':
        return 'info'
      case 'warning':
        return 'warning'
      default:
        return 'info'
    }
  }

  return (
    <PaperSnackbar
      visible={visible}
      onDismiss={handleClose}
      duration={duration}
      style={{
        backgroundColor: _getColorFromType(),
      }}
      onTouchEnd={handleClose}
    >
      <IconButton
        icon={
          <Icon
            name={_getIconFromType()}
            color={Colors.white}
            size={32}
            style={styles.icon}
            tvParallaxProperties // usado em iOS
          />
        }
        type="outline"
        buttonStyle={styles.snackbarContent}
        titleStyle={{ color: Colors.white, ...styles.snackbarText, fontFamily: FontStyle.regular }}
        containerStyle={{
          ...styles.snackbarContainer,
          width: Dimensions.get('window').width - 2 * LAYOUT_HORIZONTAL_PADDING,
        }}
        title={message}
        onPress={handleClose}
      />
    </PaperSnackbar>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 4,
  },
  snackbarContent: {
    borderColor: 'transparent',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '90%',
  },
  snackbarText: {
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
  },
  snackbarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})

export default Snackbar
