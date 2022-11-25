import React from 'react'
import { View, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@/Hooks'

interface PopUpProps extends React.ComponentProps<typeof Modal> {
  showDialog: boolean
  closeDialog: () => void
  fullPopUp?: boolean
}

const PopUp = ({ children, showDialog, fullPopUp = false, closeDialog }: PopUpProps) => {
  const { Colors } = useTheme()
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showDialog}
      onRequestClose={fullPopUp ? undefined : closeDialog}
      style={{ backgroundColor: Colors.inputBackground }}
    >
      <TouchableWithoutFeedback onPress={fullPopUp ? undefined : closeDialog}>
        <View style={styles.modalBackground}>
          <View style={{ ...styles.modalBox, backgroundColor: Colors.inputBackground }}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#777777CC',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 16,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PopUp
