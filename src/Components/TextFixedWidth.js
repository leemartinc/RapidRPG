import React from 'react'
import { Platform, Text, Dimensions } from 'react-native'

export default function TextFixedWidth ({ children }) {
  const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'
  var windowHeight = Dimensions.get('window').height;
  var fontSize = windowHeight * .015

  return (
      <Text style={{fontFamily: fontFamily,
        fontSize: fontSize,
      }}>{ children }</Text>
  )
}