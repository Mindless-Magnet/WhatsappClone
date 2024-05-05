import { View, Text,Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import Colors from '@/constants/Colors'

import calls from '@/assets/data/calls.json'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { format } from 'date-fns'
import { SegmentedControl } from '@/components/SegmentedControl'
import Animated, { CurvedTransition, FadeInUp, FadeOutUp, FadingTransition } from 'react-native-reanimated'
import SwipeableRow from '@/components/SwipeableRow'



const Page = () => {
  
  const [editing, setEditing] = useState(false)
  const onEdit = () => {
    setEditing(!editing)
  };

  const [selectedOption, setSelectedOption] = useState('All')
  const [items, setItems] = useState(calls)
  
  useEffect(() => {
    if(selectedOption === 'All') {
    setItems(calls)
    } else {
      setItems(calls.filter((call) => call.missed))
    }
      
    }, [selectedOption])

    const removeCall = (item : any) => () => {
      setItems(items.filter((c) => c.id !== item.id))
    }


  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
        <Stack.Screen options={{
          headerTitle: () => (
            <SegmentedControl options={['All', 'Missed']} selectedOption={selectedOption}
            onOptionPress={setSelectedOption}/>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ color: Colors.primary, fontSize: 16}}>
                {editing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          )
        }} />
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
      <View style={defaultStyles.block}>

        <FlatList data={items}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={defaultStyles.separator}></View>}
          renderItem={({ item, index }) => (
            <SwipeableRow onDelete={removeCall(item)}>

            <Animated.View entering={FadeInUp.delay(index * 20)} exiting={FadeOutUp}>

            <View style={defaultStyles.item}>
              <Image source={{ uri: item.img}} style={styles.avatar}/>
              
              <View style={{flex: 1, gap: 2}}>
                <Text style={{fontSize: 16, color: item.missed? Colors.red : '#000'}}>
                  {item.name}
                  </Text>

                <View style={{flexDirection: 'row', gap: 4}}>
                  <Ionicons 
                  name={item.video ? 'videocam' : 'call'}
                  size={14}
                  color={Colors.gray}
                  />
                  <Text style={{color: Colors.gray, flex: 1}}>
                    {item.incoming ? 'Incoming' : 'Outgoing'}
                  </Text>
                </View>
                </View>

                <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}> 
                  <Text style={{ color: Colors.gray }}>{format(item.date, 'MM.dd.yy')}</Text>
                  <Ionicons name='information-circle-outline' size={20} color={Colors.primary}/>
                </View>

              
            </View>
            </Animated.View>
            </SwipeableRow>
          )} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  }
});

export default Page