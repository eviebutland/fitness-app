import { useRef, useState } from 'react'
import dayjs from 'dayjs'

export function useTimer() {
  const [timeNow, setTimeNow] = useState(new Date())
  const [startTime, setStartTime] = useState({})
  const intervalRef = useRef(null)
  const [isTimerActive, setIsTimerActive] = useState(false)

  const handleInterval = (isRunning: Boolean) => {
    if (isRunning && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const newTime = dayjs(startTime).add(1, 'second')

        const difference = dayjs(newTime).toDate().getTime() - timeNow.getTime()
        setStartTime(dayjs().millisecond(difference))
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleStartTimer = () => {
    setTimeNow(new Date())
    setIsTimerActive(true)
    setStartTime(dayjs(new Date(0)))
  }

  const handleEndTimer = () => {
    setIsTimerActive(false)
    handleInterval(false)
  }

  return { handleInterval, handleStartTimer, startTime, handleEndTimer, isTimerActive }
}
