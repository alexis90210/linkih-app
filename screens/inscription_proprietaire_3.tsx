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

// InscriptionProprietaire3
export default function InscriptionProprietaire3({navigation}: {navigation: any}) {
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
                fontSize: 17,
                width:'80%'
              }}>
              Felicitations,
              votre compte a ete cree avec succes
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
              Veuillez completer vos Informations dans votre profile
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
                onPress={() => navigation.navigate('main')}>
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
                  Commencez !
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
