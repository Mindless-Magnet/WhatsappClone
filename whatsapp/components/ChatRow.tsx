import { View,Image, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { format } from 'date-fns';
import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';

export interface ChatRowProps {
     id: string;
     from: string;
     date: string;
     img: string;
     msg: string;
     read: string;
     unreadCount: string;
}


const Page = ({ id, from, date, img, msg, read, unreadCount}: ChatRowProps) => {
  return (
    <AppleStyleSwipeableRow>

    <Link href='/' asChild>
        <TouchableHighlight activeOpacity={0.8} underlayColor={Colors.lightGray}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
              paddingLeft: 10,
              paddingVertical: 10,
            }}>
            <Image source={{ uri: img }} style={{ width: 50, height: 50, borderRadius: 50 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{from}</Text>
              <Text style={{ fontSize: 14, color: Colors.gray }}>
                {msg.length > 40 ? `${msg.substring(0, 40)}...` : msg}
              </Text>
            </View>
            <Text style={{ color: Colors.gray, paddingRight: 20, alignSelf: 'flex-start' }}>
              {format(date, 'MM.dd.yy')}
            </Text>
          </View>
        </TouchableHighlight>
      </Link>
    </AppleStyleSwipeableRow>
  )
}

export default Page