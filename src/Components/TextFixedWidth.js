import React from 'react'
import { Platform, Text } from 'react-native'

export default function TextFixedWidth ({ children }) {
  const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'

  return (
      <Text style={{fontFamily}}>{ children }</Text>
  )
}