import React, { useState } from 'react';

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
import ArrowLeftIcon from '../components/ArrowLeft';
import EyeSlashIcon from '../components/eye_slash';
import EyeIcon from '../components/eye';

// IdentificationProprietaireScreen
export default function IdentificationProprietaireScreen({
  navigation,
}: {
  navigation: any;
}) {

  var [isVisible , setVisible] = useState(false)

  const _setVisible = () => {
   if ( isVisible )  setVisible(false);
   if ( !isVisible )  setVisible(true);
  }
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
              marginTop: 10,
            }}>
            <View
              style={{
                marginVertical: 10,
                backgroundColor: '#fff',
                borderRadius: 11,
                padding: 20,
                width: '90%',
                marginTop: 10,
              }}>
             <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 15,
                    height: 30,
                    opacity: 0.85,
                  }}>
                  Identifiant
                </Text>
                <TextInput
                placeholderTextColor={'rgba(100,100,100,.7)'}
                placeholder="Identifiant ..."
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    width: '100%',
                    fontWeight: '600',
                    padding:10
                  }}></TextInput>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 20,
                  marginBottom: 40,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 15,
                    height: 30,
                    opacity: 0.85,
                  }}>
                  Password
                </Text>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'100%' , flexWrap:'nowrap'}}>
                <TextInput
                textContentType='password'
                keyboardType='default'
                secureTextEntry={!isVisible} 
                placeholderTextColor={'rgba(100,100,100,.7)'}
                placeholder="Mot de Passe..."
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    fontWeight: '600',
                    width: '93%',
                    padding:10
                  }}></TextInput>
                  <Pressable style={{padding:15}} onPress={_setVisible}>
                    { isVisible && <EyeSlashIcon/>}
                    { !isVisible && <EyeIcon/>}
                  </Pressable>
                </View>
              </View>


              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#7B4C7A',
                  borderRadius: 30,
                  marginBottom: 20,
                }}>
                <Pressable
                  android_ripple={{color: '7B4C7A'}}
                  style={{
                    paddingHorizontal: 10,
                    width: '70%',
                  }}
                  onPress={() => navigation.navigate('main')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#fff',
                    }}>
                    Se connecter
                  </Text>
                </Pressable>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  borderRadius: 30,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginVertical:10
                }}>
                <Pressable
                  android_ripple={{color: '7B4C7A'}}
                  style={{
                    paddingHorizontal: 10,
                  }}
                  onPress={() => navigation.navigate('inscription_proprietaire_1')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#841584',
                    }}>
                    Je n'ai pas encore un compte 
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
