import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'

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
    fontSize: 60,
    color: 'red'
  }
})
