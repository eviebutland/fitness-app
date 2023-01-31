import { View, StyleSheet, ScrollView } from 'react-native'
import React, { ReactElement } from 'react'
import { ProgressBar } from './ProgressBar'

interface ContainerProps {
  children: ReactElement
  footer: ReactElement
}

export const Container = (props: ContainerProps) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.children}>{props.children}</View>
        <View style={styles.footer}>{props.footer}</View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  children: {
    padding: 30
  },
  container: {},
  footer: {
    position: 'absolute',
    bottom: 0
  }
})
