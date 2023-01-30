import React from 'react'
import { StyleSheet, View } from 'react-native'

interface ProgressBarProps {
  percentage: number
}

export const ProgressBar = (props: ProgressBarProps) => {
  return (
    <View style={styles.container}>
      <View style={(styles.innerContainer, { width: props.percentage })}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    display: 'flex'
  },
  innerContainer: {
    backgroundColor: '#B7E4C7',
    borderColor: '#B7E4C7',
    height: 40
  }
})
