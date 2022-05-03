import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  }}>
      <Text style={{
          fontFamily: "Roboto-Black",
          fontSize: 45,
          color: "#7F5DF0"
      }}>Settings</Text>
      <Text style={{
          fontFamily: "Roboto-BlackItalic",
          fontSize: 20,
          color: "#5D2DFD"
      }}>Coming Soon...</Text>
  </View>
  )
}