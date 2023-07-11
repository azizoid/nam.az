import { useEffect } from 'react'

export const useInterval = (callback: () => void, delay: number) => {
  useEffect(() => {
    const timerID = setInterval(callback, delay)

    return () => {
      clearInterval(timerID)
    }
  }, [callback, delay])
}