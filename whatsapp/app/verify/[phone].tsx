import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {

    const { phone } = useLocalSearchParams<{phone: string, signin: string}>();
    const [code, setCode] = useState('')

  return (
    <View>
      <Text>Page</Text>
    </View>
  )
}

export default Page