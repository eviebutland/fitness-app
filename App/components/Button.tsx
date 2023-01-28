import React from 'react'
import { Button } from 'react-native'

interface ButtonProps {
  title: string
  onPress: Function
}

export const BaseButton = (props: ButtonProps) => {
  return <Button title={props.title} onPress={() => props.onPress()}></Button>
}
