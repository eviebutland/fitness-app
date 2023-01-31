import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Container } from '../../components/base/Container'
import { ProgressBar } from '../../components/base/ProgressBar'

type Pricing = 'monthly' | 'quarterly' | 'annually'

const PricingScreen = ({ navigation }) => {
  const pricingMatrix = {
    monthly: {
      price: 9.99
    },
    quarterly: {
      price: 24.99
    },
    annually: {
      price: 74.99
    }
  }
  return (
    <Container footer={<ProgressBar percentage={75} />}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/ladyIcon.png')}
            accessibilityLabel="App icon"
          />
        </View>

        {Object.entries(pricingMatrix).map(matrixItem => (
          <View style={[styles.tile, styles[matrixItem[0] as Pricing]]}>
            {matrixItem[0] === 'quarterly' && (
              <View style={styles.feature}>
                <Text style={styles.text_small}>50p per workout!</Text>
              </View>
            )}
            <Text style={styles.text}>£{matrixItem[1].price}</Text>
            <Text style={styles.text_small}>{matrixItem[0]}</Text>
          </View>
        ))}
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 5,
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
    color: '#212825'
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  image: {
    height: 205,
    resizeMode: 'contain'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  text_small: {
    fontSize: 15,
    fontWeight: '400',
    color: 'inherit'
  },
  feature: {
    backgroundColor: '#56919C',
    color: '#ffffff',
    borderRadius: 22,
    padding: 10,
    position: 'absolute',
    right: -10,
    top: -20
  },
  monthly: {
    backgroundColor: '#52B788',
    borderColor: '#52B788'
  },
  quarterly: {
    backgroundColor: '#74C69D',
    borderColor: '#74C69D'
  },
  annually: {
    backgroundColor: '#95D5B2',
    borderColor: '#95D5B2',
    marginBottom: 50
  }
})

export default PricingScreen
