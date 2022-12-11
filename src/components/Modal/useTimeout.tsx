import { useEffect, useState } from 'react'

const useTimeout = (callback: any, delay: any) => {
  const [paused, setPaused] = useState(false)
  const [remainingTime, setRemainingTime] = useState(delay)

  //   useEffect(() => {
  //     let timeoutId = null

  //     if (paused) {
  //       clearTimeout(timeoutId)
  //     } else {
  //       timeoutId = setTimeout(() => {
  //         setRemainingTime(remainingTime - delay)
  //         if (remainingTime <= 0) {
  //           callback()
  //         }
  //       }, delay)
  //     }

  //     return () => {
  //       clearTimeout(timeoutId)
  //     }
  //   }, [callback, delay, paused, remainingTime])

  const pause = () => {
    setPaused(true)
    setRemainingTime(remainingTime)
  }

  const resume = () => {
    setPaused(false)
  }

  return { pause, resume }
}

export default useTimeout

// 遞迴
//   const startTimer = (remainingTime: number) => {
//     console.log(remainingTime)

//     timerRef.current = setTimeout(
//       () => {
//         nextHandler()
//         startTimer(remainingTime)
//       },
//       remainingTime < 0 ? 0 : remainingTime
//     )
//   }

//   const clearTimer = () => {
//     if (timerRef.current) clearTimeout(timerRef.current)
//   }

//   useEffect(() => {
//     console.log('start')
//     // setRemainingTime(Date.now())
//     if (status) {
//       timerRef.current = setTimeout(() => {
//         nextHandler()
//       }, remainingTime)
//       // setTimeoutId(timerRef.current)
//       console.log('timeoutId.current :>> ', timerRef)
//     }
//     // const timeoutId = setTimeout(() => {
//     //   nextHandler()
//     // }, remainingTime)

//     return () => clearTimeout(timerRef.current)
//   }, [nextHandler, remainingTime, status])

//   const handlePause = () => {
//     clearTimer()

//     setRemainingTime(5000 - (Date.now() - remainingTime))

//     console.log('pause :>> ', 5000 - (Date.now() - remainingTime))
//     setStatus(false)
//   }
//   //
//   const handleResume = () => {
//     const remainTime = remainingTime - Date.now()

//     console.log('remainingTime :>> ', remainTime)
//     startTimer(remainTime)
//     setStatus(true)

//     // setRemainingTime(remainTime)
//   }
