import React from 'react'
import { View, Text, StyleSheet, Image, Button, Pressable } from 'react-native'
import { Container } from '../../components/base/Container'
import { ProgressBar } from '../../components/base/ProgressBar'
import { BaseButton } from '../../components/base/Button'

type Pricing = 'monthly' | 'quarterly' | 'annually'

interface PricingMatrix {
  [key: Pricing]: {
    price: number
  }
}

const PricingScreen = ({ navigation }) => {
  const pricingMatrix: PricingMatrix = {
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

  const handleSelectPricing = (selectedPrice: PricingMatrix) => {
    console.log('selected:', selectedPrice)
    // set this to state and move to next step
    navigation.navigate('WorkoutPreference')
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
          <Pressable
            style={[styles.tiles, styles[matrixItem[0] as Pricing]]}
            onPress={() => handleSelectPricing(matrixItem[0])}
          >
            {matrixItem[0] === 'quarterly' && (
              <View style={styles.feature}>
                <Text style={styles.text_small}>50p per workout!</Text>
              </View>
            )}
            <View style={styles.tile}>
              <Text style={styles.text}>£{matrixItem[1].price}</Text>
              <Text style={styles.text_small}>{matrixItem[0]}</Text>
            </View>
          </Pressable>
        ))}

        {/* Do we show this button as soon as state is selected? */}
        {/* <BaseButton text="Next step" onPress={() => navigation.navigate('WorkoutPreference')} /> */}
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 5,
    padding: 30,
    alignItems: 'center',
    color: '#212825'
  },
  tiles: {
    marginBottom: 30
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
    fontWeight: '400'
  },
  feature: {
    backgroundColor: '#56919C',
    color: 'white',
    padding: 5,
    alignItems: 'center'
  },
  monthly: {
    backgroundColor: '#52B788',
    borderColor: '#52B788'
  },
  quarterly: {
    backgroundColor: '#D8F3DC',
    borderColor: '#74C69D'
  },
  annually: {
    backgroundColor: '#95D5B2',
    borderColor: '#95D5B2',
    marginBottom: 50
  }
})

export default PricingScreen
