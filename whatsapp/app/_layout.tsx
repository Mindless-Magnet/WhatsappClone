import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { View } from 'react-native'

import { ClerkProvider, SignedIn, useAuth } from '@clerk/clerk-expo';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    
    try{
      return SecureStore.getItemAsync(key);
    }catch (err) {
      return null;
    }
  },
async saveToken(key:string, value:string) {
  try {
    return SecureStore.setItemAsync(key, value);
  } catch (err) {
    return null;
  }
}
}


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {

  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() =>
 {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {

    if(!isLoaded) return;

    const isTabsGroup = segments[0] === '(tabs)';

    if(isSignedIn && !isTabsGroup) {
      router.replace('/(tabs)/calls');
    } else if(!SignedIn){
      router.replace('/');
    }


  }, [isSignedIn])

  if (!loaded || !isLoaded) {
    return <View/>;
  }

  return (<Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="otp" options={{ headerTitle: 'Enter Your Phone Number', headerTitleAlign: 'center' }} />
        <Stack.Screen name="verify/[phone]" options={{ headerTitleAlign: 'center', headerBackTitle: 'Edit' }} />
        <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
      </Stack>)
}

function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
}


export default RootLayoutNav;