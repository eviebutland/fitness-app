import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, View, Pressable, Text } from 'react-native'
import { BaseButton } from '../base/Button'
import { Input } from '../base/Input'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeModalGetter, activeModalState } from '../../state/modal'

const RecordModal = () => {
  const [weight, setWeight] = useState(0)
  const [_, setActiveModals] = useRecoilState(activeModalState)
  const [isVisible, setIsVisible] = useState(false)
  const currentActiveModals = useRecoilValue(activeModalGetter)

  useEffect(() => {
    const active = currentActiveModals.slice()
    if (active.includes('record-weight-modal')) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isVisible, currentActiveModals])

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setIsVisible(!isVisible)} style={styles.bar}></Pressable>
            <Input label="Record weight" inputMode="text" value={weight} onChangeText={setWeight}></Input>
            <BaseButton
              text={'Save'}
              onPress={() => {
                const active = currentActiveModals.slice()
                setActiveModals(active.filter(activeModal => activeModal !== 'record-weight-modal'))
              }}
            ></BaseButton>
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
