

import { useState } from 'react'
import { useRouter } from 'expo-router';

import { View, Text, KeyboardAvoidingView, Platform, Linking, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MaskInput from 'react-native-mask-input';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';


const Page = () => {

    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter();
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
    const { bottom } = useSafeAreaInsets();

    const {signUp, setActive} = useSignUp();
    const {signIn} = useSignIn();

    const openLink = () => {
    Linking.openURL('https://www.whatsapp.com/legal/#privacy-policy')
    }

    const sendOTP = async () => {
        setLoading(true);
        try{
            await signUp!.create({phoneNumber});

            signUp!.preparePhoneNumberVerification();

            router.push(`/verify/${phoneNumber}`);
            setLoading(false);

        } catch (err) {
            console.error(err);
            if(isClerkAPIResponseError(err)){
                if(err.errors[0].code === 'form_identifier_exists'){
                    console.log('user exists');
                    await trySignIn();
                }else {
                    setLoading(false);
                    console.log(err);
                }
            }
        }
        
    };

    const trySignIn = async () => {
        const { supportedFirstFactors } = await signIn!.create({
            identifier: phoneNumber,
        })

        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
            return factor.strategy === 'phone_code'
        });

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId,
        });

        router.push(`/verify/${phoneNumber}?signin=true`);
        setLoading(false);
    };

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset} style={{flex: 1}}>
        <View style={styles.container}>
            {loading && (
                <View style={[StyleSheet.absoluteFill, styles.loading]}>
                    <ActivityIndicator size='large' color={Colors.primary}/>
                    <Text style={{ fontSize: 18, padding: 10}}>Sending code...</Text>
                </View>
            )}
            <Text style={styles.description}>
                WhatsApp will need to verify your Account. Carrier charges may apply.
            </Text>

            <View style={styles.list}>
                <View style={styles.listItem}>
                    <Text>India</Text>
                    <Ionicons name='chevron-forward' size={20} color={Colors.gray}/>
                </View>
                <View style={styles.separator} />

                <MaskInput
                    style={styles.input}
                    keyboardType='numeric'
                    autoFocus
                    placeholder='+91 Your phone number'
                    value={phoneNumber}
                    onChangeText={(masked, unmasked) => {
                        setPhoneNumber(unmasked); // you can use the unmasked value as well

                    
                }}
                mask={['(+', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]}
                />

            </View>

            <Text style={styles.legal}>
                You must be{' '}
                <Text style={styles.link} onPress={openLink}>
                    at least 16 years old
                </Text>
                {' '}to register. Learn how WhatsApp works with the{' '}
                <Text style={styles.link} onPress={openLink}>
                    Meta Companies
                </Text>
                .
            </Text>

            <TouchableOpacity style={[styles.button, phoneNumber !== '' ? styles.enabled : null, { marginBottom: bottom }]} 
                onPress={sendOTP} disabled={phoneNumber === ''}>
                <Text style={[styles.buttonText, phoneNumber !== '' ? styles.enabledText : null]}>Next</Text>
            </TouchableOpacity>

        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: Colors.background,
        gap: 20,
    },
    description: {
        fontSize: 14,
        color: Colors.gray,
    },
    list: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 6,
        marginBottom: 10,
    },
    separator: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.gray,
        opacity: 0.3,
    },
    legal: {
        fontSize: 12,
        textAlign: 'center',
        color: '#000',
    },
    link: {
        color: Colors.primary,
    },
    button:{
        marginTop: 'auto',
        width: '100%',
        backgroundColor: Colors.lightGray,
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
    },
    enabled: {
        backgroundColor: Colors.primary,
    },
    enabledText: {
        color: '#fff',
    },
    buttonText: {
        color: Colors.gray,
        fontSize: 18,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        fontSize: 16,
        padding: 6,
        marginTop: 10,
    },
    loading: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
}   
);

export default Page