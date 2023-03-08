import { View, Modal, StyleSheet, Pressable, Text } from 'react-native'
import React, { ReactElement, useEffect, useState } from 'react'
import { activeModalGetter } from '../../state/modal'
import { useRecoilValue } from 'recoil'

interface TooltipProps {
  children: ReactElement
  text: string
  modal: string
}

const Tooltip = (props: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const currentActiveModals = useRecoilValue(activeModalGetter)

  useEffect(() => {
    const active = currentActiveModals.slice()
    if (active.includes(props.modal)) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isVisible, currentActiveModals])

  return (
    <View style={{ position: 'relative' }}>
      <Pressable style={{ position: 'relative' }}>
        <Modal animationType="fade" transparent={true} visible={isVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>{props.text}</Text>
            </View>
          </View>
        </Modal>

        {props.children}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',

    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3
  }
})

export default Tooltip
