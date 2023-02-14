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

// IdentificationScreen
export default function IdentificationScreen({navigation}: {navigation: any}) {
  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f6f6f6f6',
        }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
            }}>
            <Text
              style={{
                textAlign: 'left',
                color: '#000',
                fontWeight: 'bold',
                fontSize: 25,
                width: '90%',
              }}>
              S'identifier en tant que
            </Text>
            <View
              style={{
                borderRadius: 11,
                padding: 10,
                width: '100%',
                marginTop: '10%',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 10,
                }}>
                <Pressable
                  android_ripple={{color: '7B4C7A'}}
                  style={{
                    borderRadius: 15,
                    paddingHorizontal: 10,
                    backgroundColor: '#7B4C7A',
                    borderWidth: 1,
                    borderColor: '#7B4C7A',
                    padding: 18,
                    width: '100%',
                    height: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.navigate('identification_client')}>
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'normal',
                        fontSize: 15,
                        opacity: 0.85,
                      }}>
                      Client
                    </Text>
                  </View>
                </Pressable>

                <Pressable
                  android_ripple={{color: '7B4C7A'}}
                  style={{
                    borderRadius: 15,
                    paddingHorizontal: 10,
                    backgroundColor: '#7B4C7A',
                    borderWidth: 1,
                    borderColor: '#7B4C7A',
                    padding: 18,
                    width: '100%',
                    height: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.navigate('identification_vendeur')}>
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'normal',
                        fontSize: 15,
                        opacity: 0.85,
                      }}>
                      Societe / Auto-entrepreneur
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
