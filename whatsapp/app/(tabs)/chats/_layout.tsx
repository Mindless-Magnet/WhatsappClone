import React from 'react'
import { Link, Stack } from 'expo-router'
import Colors from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'

const Layout = () => {
  return (
   <Stack>
     <Stack.Screen
        name="index"
        options={{
          title: 'Chats',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerLeft: () => (
            <TouchableOpacity style={{ paddingRight: 30}}>
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                color={Colors.primary}
                size={25}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TouchableOpacity>
                <Ionicons name="camera-outline" color={Colors.primary} size={25} />
              </TouchableOpacity>
              <Link href='/(modals)/new-chat' asChild>
                <TouchableOpacity>
                  <Ionicons name="add-circle" color={Colors.primary} size={25} />
                </TouchableOpacity>
              </Link>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerSearchBarOptions: {
            placeholder: 'Search',
          },
        }}
      />
   </Stack>
  )
}

export default Layout