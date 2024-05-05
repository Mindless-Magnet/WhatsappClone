import React from 'react'
import { Stack } from 'expo-router'
import Colors from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

const Layout = () => {
  return (
   <Stack>
    <Stack.Screen name='index' options={{title: 'Calls',
        headerLargeTitle: true,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerBlurEffect:'regular',
        headerStyle:{ backgroundColor: Colors.background },
        headerSearchBarOptions: {
            placeholder: 'Search',
        },
        headerRight: () => (
          <TouchableOpacity>
            <Ionicons name='call-outline' color={Colors.primary} size={20}/>
          </TouchableOpacity>
        )
        
    }} />
   </Stack>
  )
}

export default Layout