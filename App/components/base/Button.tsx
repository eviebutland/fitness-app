import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

interface ButtonProps {
  title: string
  onPress: Function
  isTransparent?: boolean // Find a better name for this
}

export const BaseButton = (props: ButtonProps) => {
  return (
    <View style={[styles.container, { backgroundColor: props.isTransparent ? 'transparent' : '#52B788' }]}>
      <Button color={'#1E1E1E'} title={props.title} onPress={() => props.onPress()}></Button>
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
