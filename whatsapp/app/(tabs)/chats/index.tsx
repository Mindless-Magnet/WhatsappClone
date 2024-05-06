import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'

import chats from '@/assets/data/chats.json'
import { defaultStyles } from '@/constants/Styles'
import ChatRow from '@/components/ChatRow'
import { SafeAreaView } from 'react-native-safe-area-context'

const Page = () => {
  return (
    
    <SafeAreaView style={{ paddingTop: 50, backgroundColor: '#fff'}}
    >
      <FlatList 
      data={chats}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (<View style={[defaultStyles.separator, { marginLeft: 90}]}/>)}
      renderItem={({item}) => 
      <ChatRow {...item}/>
      }
      />
    </SafeAreaView>
  )
}

export default Page