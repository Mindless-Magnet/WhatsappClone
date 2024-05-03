import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

import { Link } from 'expo-router'

import Colors from '@/constants/Colors'

import welcomeImage from '@/assets/images/welcome.png'

const welcome_image = Image.resolveAssetSource(welcomeImage).uri

const Page = () => {

  const openLink = () => {
    Linking.openURL('https://www.whatsapp.com/legal/#privacy-policy')
  }

  return (
    <View style={styles.container}>
        <Image source={{ uri : welcome_image}} style={styles.welcome}/>
        <Text style={styles.headline}>Welcome to WhatsApp Clone</Text>
        <Text style={styles.description}>
          Read our{' '}
          <Text style={styles.link} onPress={openLink}>
            Privacy Policy
            </Text>
            . {'Tap "Agree & Continue" to accept the '}
            <Text style={styles.link} onPress={openLink}>
              Terms of Service
            </Text>
            .
        </Text>
        <Link href={'/otp'} replace asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Agree & Continue</Text>
          </TouchableOpacity>
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',

    },
    welcome: {
      width: '100%',
      height: 300,
      marginBottom: 80,
    },
    headline: {
      fontSize: 22,
      fontWeight: 'bold',
      marginVertical: 20,
    },
    description: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 80,
      color: Colors.gray,
    },
    link: {
      color: Colors.primary
    },
    button: {
      width: '100%',
      fontSize: 22,
      color: '#fff',
    },
    buttonText: {
      fontSize: 20,
      color: Colors.primary,
      fontWeight: 'bold',
      textAlign: 'center',
    }
});

export default Page

