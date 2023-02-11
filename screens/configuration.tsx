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

// ConfigurationScreen
export default function ConfigurationScreen ({navigation}: {navigation: any}) {

  return (
    <>
      <SafeAreaView style={{
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#7B4C7A',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20%',
            }}>
            <Text
              style={{
                textAlign: 'left',
                color: '#fff',
                fontWeight: '900',
                fontSize: 27,
                width: '90%',
              }}>
              Selectionnez le pays , region et la langue
            </Text>
            <View
              style={{
                marginVertical: 20,
                backgroundColor: '#fff',
                borderRadius: 11,
                padding: 20,
                width: '90%',
                marginTop: '20%',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  paddingTop:20
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 10,
                    height: 15,
                    opacity: 0.85,
                  }}>
                  Pays/Region
                </Text>
                <TextInput
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    width: '100%',
                    fontWeight:'600',
                    padding:0
                  }}></TextInput>


              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 20,
                  marginBottom: 50,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 10,
                    height: 15,
                    opacity: 0.85,
                  }}>
                  Langue
                </Text>
                <TextInput
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    fontWeight:'600',
                    width: '100%',
                    padding:0
                  }}></TextInput>
              </View>

              <View style={{alignItems:'center',
                  backgroundColor: '#7B4C7A' ,borderRadius: 30, marginBottom:30}}>
              <Pressable
              android_ripple={{color: '7B4C7A'}}
                style={{
                  
                  paddingHorizontal: 10,
                  width:'70%'
                }}
                onPress={() => navigation.navigate('identification')}>
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#fff',
                  }}>
                  Contiunez
                </Text>
              </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};