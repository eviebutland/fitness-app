import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface AxiosError {
  name: string
  message: string
}

interface ErrorProps {
  error: AxiosError
}

const ErrorSummary = (props: ErrorProps) => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faInfoCircle} style={{ color: '#F06057', marginRight: 10 }}></FontAwesomeIcon>
      <Text>
        {props.error.name}: {props.error.message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6D9D7',
    borderColor: '#F06057',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  }
})

export default ErrorSummary
