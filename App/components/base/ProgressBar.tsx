import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'

interface ProgressBarProps {
  percentage: number
}

export const ProgressBar = (props: ProgressBarProps) => {
  const screenWidth = Dimensions.get('screen').width

  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer, { width: (props.percentage * screenWidth) / 100 }]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    display: 'flex',
    backgroundColor: 'transparent'
  },
  innerContainer: {
    backgroundColor: '#B7E4C7',
    borderColor: '#B7E4C7',
    height: 40
  }
})
