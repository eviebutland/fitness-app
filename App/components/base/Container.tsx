import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native'
import React, { ReactElement } from 'react'
// import { ProgressBar } from './ProgressBar'
import { useRecoilState } from 'recoil'
import { activeModalState } from '../../state/modal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface ContainerProps {
  children: ReactElement
  hasOverlay?: Boolean
  footer?: ReactElement
}

export const Container = (props: ContainerProps) => {
  const [_, setActiveModals] = useRecoilState(activeModalState)

  const handleCloseAllModals = () => {
    setActiveModals([])
  }

  return (
    <ScrollView style={styles.container}>
      <KeyboardAwareScrollView extraScrollHeight={100}>
        <Pressable onPress={handleCloseAllModals}>
          <View>
            <View style={styles.children}>{props.children}</View>
            <View style={styles.footer}>{props.footer}</View>
          </View>
          <View style={props.hasOverlay ? styles.overlay : { display: 'none' }}></View>
        </Pressable>
      </KeyboardAwareScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  children: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    marginBottom: 30
  },
  footer: {
    position: 'absolute',
    bottom: 0
  },

  overlay: {
    backgroundColor: '#D9D9D9',
    opacity: 0.5,
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
})
