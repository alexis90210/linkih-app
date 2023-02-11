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
          backgroundColor: '#fff',
        }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#fff',
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
                color: '#000',
                fontWeight: '900',
                fontSize: 27,
                width: '90%',
              }}>
              Veuillez-vous identifier, pour continuer
            </Text>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 11,
                padding: 20,
                width: '100%',
                marginTop: '10%',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 5,
                }}>
                <Pressable
                android_ripple={{color: '7B4C7A'}}
                  style={{
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: '#7B4C7A',
                    padding: 18,
                    width: '48%',
                    height: 125,
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
                        color: '#7B4C7A',
                        fontWeight: '700',
                        fontSize: 13,
                        opacity: 0.85,
                      }}>
                      Je suis un client
                    </Text>
                  </View>
                </Pressable>

                <Pressable
                android_ripple={{color: '7B4C7A'}}
                  style={{
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#7B4C7A',
                    padding: 18,
                    width: '48%',
                    height: 125,
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
                        fontWeight: '700',
                        fontSize: 13,
                        opacity: 0.85,
                      }}>
                      Je suis une societe
                    </Text>
                  </View>
                </Pressable>

                <Pressable
                android_ripple={{color: '7B4C7A'}}
                  style={{
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#7B4C7A',
                    padding: 18,
                    width: '48%',
                    height: 125,
                    marginTop: 10,

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
                        fontWeight: '700',
                        fontSize: 13,
                        opacity: 0.85,
                      }}>
                      Je suis un auto-entrepreneur
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
