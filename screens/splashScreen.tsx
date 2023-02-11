import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  PixelRatio,
  TextInput,
} from 'react-native';

// SplashScreen
export default function SplashScreen({navigation}: {navigation: any}) {
  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
        }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '70%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#7B4C7A',
                fontWeight: '600',
                textTransform: 'uppercase',
                fontSize: 24,
              }}>
              Welcome on Linkih
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#00000090',
                opacity: 0.85,
                fontWeight: '600',
                fontSize: 14,
                marginVertical: 13,
                width:'80%'
              }}>
              Gérer votre fiche d'établissement directement sur l'application
              mobile
            </Text>
            <View
              style={{
                marginVertical: 70,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#7B4C7A' ,borderRadius: 30,
              }}>
              <Pressable
              android_ripple={{color: '7B4C7A'}}
                style={{
                  paddingHorizontal: 10,
                }}
                onPress={() => navigation.navigate('configuration')}>
                <Text
                  style={{
                    textAlign: 'center',

                    fontWeight: '500',
                    color: '#fff',
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    width: PixelRatio.getPixelSizeForLayoutSize(70),
                  }}>
                  EXPLOREZ
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
