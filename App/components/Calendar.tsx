import { View, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'

interface CalendarProps {
  initialDay: Date
}

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export const Calendar = (props: CalendarProps) => {
  const [activeDay, setActiveDay] = useState(
    props.initialDay.toLocaleString('en-gb', { weekday: 'long' }).toLowerCase()
  )

  console.log()
  const handleChangeDate = (day: string) => {
    // This component will emit what day it is asking for
    console.log('change date')
    setActiveDay(day)
  }
  console.log(activeDay)
  console.log(new Date())
  return (
    <View style={styles.container}>
      <View style={styles.pill} onTouchStart={() => handleChangeDate('monday')}>
        <Text style={styles.date}>15</Text>
        <Text>Mon</Text>
      </View>
      <View
        style={[activeDay === 'tuesday' && styles.active, styles.pill]}
        onTouchStart={() => handleChangeDate('tuesday')}
      >
        <Text style={styles.date}>16</Text>
        <Text>Tues</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  date: {
    fontSize: 25,
    color: '#081C15',
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold'
  },
  pill: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  active: {
    backgroundColor: '#52B788',
    borderRadius: 20
  }
})
