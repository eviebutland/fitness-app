import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, View, Pressable, Text } from 'react-native'
import { BaseButton } from '../base/Button'
import { Input } from '../base/Input'
import { useRecoilState } from 'recoil'
import { activeModalState } from '../../state/modal'
interface RecordModalProps {
  isModalVisible: Boolean
  setIsModalVisible: Function
}

const RecordModal = (props: RecordModalProps) => {
  const [weight, setWeight] = useState(0)
  const [activeModals, setActiveModals] = useRecoilState(activeModalState)

  useEffect(() => {
    const active = activeModals.slice()
    if (props.isModalVisible) {
      active.push('record-weight-modal')
      setActiveModals(active)
    } else {
      setActiveModals(active.filter(activeModal => activeModal !== 'record-weight-modal'))
    }
  }, [props.isModalVisible])

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible}
        onRequestClose={() => {
          props.setIsModalVisible(!props.isModalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => props.setIsModalVisible(!props.isModalVisible)}
              style={styles.bar}
            ></Pressable>
            <Input label="Record weight" inputMode="text" value={weight} onChangeText={setWeight}></Input>
            <BaseButton text={'Save'} onPress={() => props.setIsModalVisible(!props.isModalVisible)}></BaseButton>
          </View>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: 'white',
    padding: 35,
    width: '100%',
    opacity: 1,
    zIndex: 100
  },
  bar: {
    alignSelf: 'center',
    width: 110,
    height: 5,
    backgroundColor: '#D9D9D9'
  },
  overlay: {
    backgroundColor: '#D9D9D9',
    opacity: 0.5,
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
})
export default RecordModal
