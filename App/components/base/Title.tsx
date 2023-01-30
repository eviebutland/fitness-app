import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface TitleProps {
  title: string
}

export const Title = (props: TitleProps) => {
  return (
    <View>
      <Text style={[styles.title]}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: '#081C15',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: 'bold'
  }
})
