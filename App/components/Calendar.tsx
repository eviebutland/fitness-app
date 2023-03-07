import { View, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import dayjs from 'dayjs'

interface CalendarProps {
  initialDay: Date
  handleSelectedDate: Function
  isDisabled: Boolean
}

export const Calendar = (props: CalendarProps) => {
  const [activeDay, setActiveDay] = useState(
    props.initialDay.toLocaleString('en-gb', { weekday: 'long' }).toLowerCase()
  )

  const handleChangeDate = (day: string) => {
    setActiveDay(day)
    props.handleSelectedDate(day)
  }

  const composeDays = (index: number) => {
    const day = dayjs().add(index - 2, 'day')
    return {
      date: day.date(),
      long: day.format('dddd'),
      short: day.format('ddd')
    }
  }

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3, 4].map(index => (
        <View
          style={[
            activeDay === composeDays(index).long.toLowerCase() && props.isDisabled ? styles.disabled : null,
            activeDay === composeDays(index).long.toLowerCase() && !props.isDisabled ? styles.active : null,
            styles.pill
          ]}
          onTouchStart={() => !props.isDisabled && handleChangeDate(composeDays(index).long.toLowerCase())}
        >
          <Text style={styles.date}>{composeDays(index).date}</Text>
          <Text>{composeDays(index).short}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
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
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20
  },
  active: {
    backgroundColor: '#52B788'
  },
  disabled: {
    backgroundColor: '#D9D9D9'
  }
})
