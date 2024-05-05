import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export type BoxedIconsProps = {
    name: typeof Ionicons.defaultProps;
    backgroundColor: string;
}

const Page = ({name, backgroundColor}: BoxedIconsProps) => {
  return (
    <View style={{backgroundColor, padding: 4, borderRadius: 5}}>
      <Ionicons name={name} size={20} color='white'/>
    </View>
  )
}

export default Page