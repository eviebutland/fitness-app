import { WorkoutFormatted } from '../../API/src/lib/types/workouts'

export const mockWorkouts: WorkoutFormatted[] = [
  {
    id: '1',
    title: 'Upper Body Strength',
    workout: {
      warmUp: [
        {
          exercise: 'Arm Circles',
          sets: 2,
          reps: [{ type: 'time', value: 30 }],
          video: 'https://example.com/arm-circles'
        },
        {
          exercise: 'Shoulder Rolls',
          sets: 2,
          reps: [{ type: 'time', value: 30 }],
          video: 'https://example.com/shoulder-rolls'
        }
      ],
      set: [
        {
          exercise: 'Push-ups',
          sets: 3,
          reps: [{ type: 'weight', value: 12 }],
          video: 'https://example.com/pushups'
        },
        {
          exercise: 'Dumbbell Shoulder Press',
          sets: 3,
          reps: [{ type: 'weight', value: 10 }],
          video: 'https://example.com/shoulder-press'
        }
      ],
      superset: [
        {
          exercise: 'Tricep Dips',
          sets: 3,
          reps: [{ type: 'weight', value: 15 }],
          video: 'https://example.com/tricep-dips'
        },
        {
          exercise: 'Bicep Curls',
          sets: 3,
          reps: [{ type: 'weight', value: 12 }],
          video: 'https://example.com/bicep-curls'
        }
      ],
      cooldown: [
        {
          exercise: "Child's Pose",
          sets: 1,
          reps: [{ type: 'time', value: 60 }],
          video: 'https://example.com/childs-pose'
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Lower Body Power',
    workout: {
      warmUp: [
        {
          exercise: 'Jumping Jacks',
          sets: 2,
          reps: [{ type: 'time', value: 45 }],
          video: 'https://example.com/jumping-jacks'
        },
        {
          exercise: 'High Knees',
          sets: 2,
          reps: [{ type: 'time', value: 30 }],
          video: 'https://example.com/high-knees'
        }
      ],
      set: [
        {
          exercise: 'Squats',
          sets: 4,
          reps: [{ type: 'weight', value: 15 }],
          video: 'https://example.com/squats'
        },
        {
          exercise: 'Lunges',
          sets: 3,
          reps: [{ type: 'weight', value: 12 }],
          video: 'https://example.com/lunges'
        }
      ],
      finisher: [
        {
          exercise: 'Jump Squats',
          sets: 3,
          reps: [{ type: 'time', value: 45 }],
          video: 'https://example.com/jump-squats'
        }
      ],
      cooldown: [
        {
          exercise: 'Forward Fold',
          sets: 1,
          reps: [{ type: 'time', value: 60 }],
          video: 'https://example.com/forward-fold'
        }
      ]
    }
  },
  {
    id: '3',
    title: 'REST',
    workout: null
  }
]
