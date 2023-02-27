import { View, Modal, StyleSheet, Pressable, Text } from 'react-native'
import React, { ReactElement, useState } from 'react'

interface TooltipProps {
  children: ReactElement
  text: string
}
const Tooltip = (props: TooltipProps) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{props.text}</Text>
          </View>
        </View>
      </Modal>

      <Pressable style={{ position: 'relative' }} onPress={() => setModalVisible(!modalVisible)}>
        {props.children}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',

    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})

export default Tooltip
