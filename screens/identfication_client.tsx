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
  Alert,
} from 'react-native';
import {couleurs} from '../components/color';
import ApiService from '../components/api/service';
import axios from 'axios';
import storage from '../components/api/localstorage';

// IdentificationClientScreen
export default function IdentificationClientScreen({
  navigation,
}: {
  navigation: any;
}) {
  var data = {
    identifiant: '',
    password: '',
  };

  const logUser = async () => {
    console.log(data);

    if (!data.identifiant) {
      Alert.alert('Erreur', 'Veuillez entrer un identifiant', [        
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }

    if (!data.password) {
      Alert.alert('Erreur', 'Veuillez entrer un mot de passe valide', [        
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }

    axios({
      method: 'POST',
      url: ApiService.API_URL_LOGIN,
      data: JSON.stringify({
        login: data.identifiant,
        password: data.password
      }),
      headers: {
        Accept: 'application/json',
       'Content-Type': 'application/json'
     }
    })
      .then((response: {data: any}) => {
        
         var api = response.data;

         if ( api.code == "success") {
          storage.save({
            key: 'credentials', // Note: Do not use underscore("_") in key!
            id: 'credentials', // Note: Do not use underscore("_") in id!
            data: {
              pays: api.message
            },
            expires: 1000 * 60 * 60 
          });

          navigation.navigate('main')
          
         }

         if ( api.code == "error") {
          Alert.alert('Erreur', api.message, [        
            {text: 'OK', onPress: () => null},
          ]);
         }


         
      })
      .catch((error: any) => {
       console.log(error);
       Alert.alert('Erreur', error, [        
        {text: 'OK', onPress: () => null},
      ]);
       
      });

  };

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
                marginTop: 20,
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
                  onChangeText={input => (data.identifiant = input)}
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    width: '100%',
                    fontWeight: '600',
                    padding: 0,
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
                <TextInput
                  textContentType="password"
                  keyboardType="default"
                  secureTextEntry={true}
                  onChangeText={input => (data.password = input)}
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    fontWeight: '600',
                    width: '100%',
                    padding: 0,
                  }}></TextInput>
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
                  onPress={() => logUser()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 14,
                      fontWeight: '500',
                      color: couleurs.secondary,
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
                }}>
                <Pressable
                  android_ripple={{color: '7B4C7A'}}
                  style={{
                    paddingHorizontal: 10,
                  }}
                  onPress={() => navigation.navigate('creation_compte_client')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 13,
                      fontWeight: '500',
                      color: '#841584',
                    }}>
                    Je n'ai pas encore un compte
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
                  marginVertical: 10,
                }}>
                <Pressable
                  android_ripple={{color: '7B4C7A'}}
                  style={{
                    paddingHorizontal: 10,
                  }}
                  onPress={() => null}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#000',
                    }}>
                    Mot de passe oublie ?
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'transparent',
              borderRadius: 30,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                paddingHorizontal: 10,
              }}
              onPress={() => null}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#841584',
                }}>
                Avez-vous besoin d'aide ?
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
