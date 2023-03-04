import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeModalState } from '../../state/modal'
import { completedSetsGetter, completedSetsState } from '../../state/workouts'
import Tooltip from '../base/Tooltip'
import RecordModal from './RecordModal'

interface Rep {
  type: 'weight' | 'time'
  value: number
}

interface Exercise {
  exercise: string
  sets: string
  video: string
  reps: Rep[]
}

interface ExerciseProps {
  exercise: Exercise
  set: string
  groupIndex: number
}

const Exercise = (props: ExerciseProps) => {
  const [completedSets, setCompletedSets] = useRecoilState(completedSetsState)
  const [activeModals, setActiveModals] = useRecoilState(activeModalState)

  console.log(props.exercise.reps)
  const setGetter = useRecoilValue(completedSetsGetter)

  const handleClickTooltip = () => {
    console.log('show description')
  }

  const handleCompleteSet = (reps: number, set: string, index: number, shouldDisplayModal: boolean) => {
    const sets = { [index]: { reps, weight: 10 } }

    shouldDisplayModal && handleOpenModal()

    setCompletedSets({
      ...completedSets,
      [set]: {
        ...completedSets[set],
        [props.groupIndex]: { ...completedSets[set]?.[props.groupIndex], ...sets }
      }
    })
  }

  const handleOpenModal = () => {
    const newActiveModal = activeModals.slice()
    newActiveModal.push('record-weight-modal')

    setActiveModals(newActiveModal)
  }

  const handlePressReps = (rep, index) => {
    const repsInState = setGetter?.[props.set]?.[props.groupIndex]?.[index]?.reps

    if (rep.type === 'weight') {
      repsInState ? handleOpenModal() : handleCompleteSet(rep, props.set, index, true)
    } else {
      handleCompleteSet(rep, props.set, index, false)
    }
  }

  return (
    <View>
      <View style={styles.workoutContainer}>
        <View style={styles.video}>
          <Text>{props.exercise?.video}</Text>
        </View>

        <View style={styles.description}>
          <View style={{ flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>
            <Text style={{ fontWeight: '500', paddingRight: 10, fontSize: 20 }}>{props.exercise?.exercise}</Text>

            <View onTouchStart={handleClickTooltip}>
              <Tooltip text="open">
                <FontAwesomeIcon icon={faInfoCircle} color={'#2D6A4F'} size={20} />
              </Tooltip>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>
        {props.exercise.reps.map((rep, index: number) => (
          <Pressable
            style={styles.completed}
            onPress={() => {
              handlePressReps(rep, index)
            }}
          >
            {setGetter?.[props.set]?.[props.groupIndex]?.[index]?.reps ? (
              <FontAwesomeIcon icon={faCheckCircle} color={'#52B788'} />
            ) : (
              <Text>{rep.value}</Text>
            )}
          </Pressable>
        ))}
      </View>

      <RecordModal />
    </View>
  )
}

const styles = StyleSheet.create({
  video: {
    width: 130,
    height: 80,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    paddingLeft: 10,
    width: 230,
    justifyContent: 'space-between'
  },
  workoutContainer: {
    flexDirection: 'row'
  },
  completed: {
    backgroundColor: '#B7E4C7',
    marginRight: 10,
    marginBottom: 10,
    borderColor: '#52B788',
    borderRadius: 5,
    padding: 10,
    minWidth: 55,
    minHeight: 55,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default Exercise
