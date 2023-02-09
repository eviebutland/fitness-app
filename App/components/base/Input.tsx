import React from 'react'
import { TextInput, Text, StyleSheet, View, InputModeOptions } from 'react-native'
import { SetterOrUpdater } from 'recoil'

interface TextInputProps {
  onChangeText: SetterOrUpdater<any>
  label: string
  value: string | number | undefined | null
  inputMode: InputModeOptions
}

export const Input = ({ onChangeText, value, label, inputMode }: TextInputProps) => {
  console.log(value)
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} onChangeText={onChangeText} value={value} inputMode={inputMode}></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },

  label: {
    marginBottom: 5,
    color: '#1B4332'
  },
  input: {
    borderColor: '#1B4332',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20
  }
})
