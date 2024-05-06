import React from 'react'
import { Link, Stack } from 'expo-router'
import Colors from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { View, Image, Text } from 'react-native'

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
      <Stack.Screen 
      name='[id]'
      options={{
        title: '',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <TouchableOpacity>
              <Ionicons name="videocam-outline" color={Colors.primary} size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="call-outline" color={Colors.primary} size={25} />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: () => (
          <View style={{ flexDirection: 'row',
            gap: 10,
            paddingBottom: 4, 
            alignItems: 'center', 
            width: 220}}>
            <Image 
              source={{uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJlaeLbiuCpNj2yzXpvLwtw0_WEg7zhrOhs7HGVshTyg&s'}}
              style={{ width: 40, height: 40, borderRadius: 50}}
            />
            <Text style={{ fontSize: 14, fontWeight: '500'}}>
              Godzilla
            </Text>
          </View>
        ),
        headerStyle: {
          backgroundColor: Colors.background,
        }
      }} />
   </Stack>
  )
}

export default Layout