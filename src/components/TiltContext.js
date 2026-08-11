import { createContext, useContext } from 'react'

export const TiltContext = createContext({ x: 0, y: 0 })

export function useTilt() {
  return useContext(TiltContext)
}
