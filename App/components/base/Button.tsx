import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

interface ButtonProps {
  text: string
  onPress: Function
  isTransparent?: boolean // Find a better name for this
  style?: Record<string, unknown>
  isDisabled?: Boolean
}

export const BaseButton = (props: ButtonProps) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: props.isDisabled ? '#D9D9D9' : props.isTransparent ? 'transparent' : '#52B788' },
        props.style
      ]}
    >
      <Button color={'#1E1E1E'} title={props.text} onPress={() => props.onPress()}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#52B788',
    borderColor: '#52B788',
    borderRadius: 5,
    padding: 10
  }
})
