import { Tabs, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const Layout = () => {

  const segments = useSegments();


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs screenOptions={{
        tabBarStyle: {
            backgroundColor: Colors.background,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.background,
        tabBarActiveBackgroundColor: Colors.background,
        headerStyle:{
            backgroundColor: Colors.background,
        },
        headerShadowVisible: false,
        headerTitleAlign: 'center'
      }}>
        <Tabs.Screen name='updates' options={{
          title: 'Updates',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="update" size={size} color={color} />
          ),
        }} />
        <Tabs.Screen name='calls' options={{
          title: 'Calls',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="phone-outline" size={size} color={color} />
          ),
        }} />
        <Tabs.Screen name='communities' options={{
          title: 'Communitites',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }} />
        <Tabs.Screen name='chats' options={{
          title: 'Chats',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbubble" size={size} color={color} />
          ),
          tabBarStyle:{
            display: segments[2] === '[id]' ? 'none' : 'flex',
          }
        }} />
        <Tabs.Screen name='settings' options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cog" size={size} color={color} />
          ),
        }} />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default Layout;
