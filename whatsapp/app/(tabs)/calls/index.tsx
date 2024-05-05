import { View, Text,Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import Colors from '@/constants/Colors'

import calls from '@/assets/data/calls.json'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { format } from 'date-fns'

const Page = () => {
  
  const [editing, setEditing] = useState(false)
  const onEdit = () => {
    setEditing(!editing)
  };
  
  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
        <Stack.Screen options={{
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

        <FlatList data={calls}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={defaultStyles.separator}></View>}
          renderItem={({ item }) => (
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