import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import ApiService from '../components/api/service';
import axios from 'axios';
import storage from '../components/api/localstorage';

// IdentificationClientScreen
export default function IdentificationClientScreen({
  navigation, route
}: {
  navigation: any,
  route: any
}) {
  var data = {
    identifiant: '',
    password: '',
  };

  if( route.params?.login && route.params?.login.length > 0 ) {
    data.identifiant = route.params?.login
  }

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
        password: data.password,
        role:'ROLE_CLIENT'
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
          });

          storage.save({
            key: 'firstusage', // Note: Do not use underscore("_") in key!
            id: 'firstusage', // Note: Do not use underscore("_") in id!
            data: {
             isNew:false,
             isClient:true        
            },
          });

          axios({
            method: 'POST',
            url: ApiService.API_URL_USER_DATA,
            data: JSON.stringify({
              id:api.message.id
            }),
            headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json'
           }
          })
          .then((response: {data: any}) => {
            storage.save({
              key: 'userconnected', // Note: Do not use underscore("_") in key!
              id: 'userconnected', // Note: Do not use underscore("_") in id!
              data: {
                ...response.data,
                role:api.message.role
              },
            });

          
                navigation.navigate('main', {
                  utilisateur_id: response.data.id,
                  isProprietaire:false
                })
      
            
          })
          .catch((error) => {
            Alert.alert('Erreur', "Nous n'avons pas pu recuper vos informations", [        
              {text: 'OK', onPress: () => null},
            ]);
           })
          
         }

         if ( api.code == "error") Alert.alert('Erreur', api.message, [  {text: 'OK', onPress: () => null}, ]);
         


         
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
                    marginTop:14,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Identifiant
                </Text>
                <TextInput
                  defaultValue={data.identifiant}
                  onChangeText={input => (data.identifiant = input)}
                  placeholder='Entrez votre identifiant'
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: couleurs.primary,
                    width: '100%',
                    fontWeight: '600',
                    padding: 0,
                    fontFamily: CustomFont.Poppins,
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
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Mot de passe
                </Text>
                <TextInput
                  textContentType="password"
                  keyboardType="default"
                  secureTextEntry={true}
                  defaultValue={data.password}
                  onChangeText={input => (data.password = input)}
                  placeholder='Entrez votre mot de passe'
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: couleurs.primary,
                    fontWeight: '600',
                    width: '100%',
                    padding: 0,
                    fontFamily: CustomFont.Poppins,
                  }}></TextInput>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: couleurs.primary,
                  borderRadius: 30,
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  
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
                      fontSize: 15,
                      fontWeight: '500',
                      color: couleurs.white,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Se connecter
                  </Text>
                </TouchableOpacity>
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
                <TouchableOpacity
                  
                  style={{
                    
                  }}
                  onPress={() => null}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#000',
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Mot de passe oublie ?
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderTopWidth:1,
                  borderStyle:'dotted',
                  borderColor:couleurs.primary,
                  paddingTop:15,
                  marginTop:10
                }}>
                <TouchableOpacity
                  
                  style={{
                    marginVertical: 10,
                  }}
                  onPress={() => navigation.navigate('creation_compte_client')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#000',                      
                    fontFamily: CustomFont.Poppins,
                    }}>
                    Je cree mon compte
                  </Text>
                </TouchableOpacity>
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
              marginTop:60
            }}>
            <TouchableOpacity
              
              style={{
                paddingHorizontal: 10,
              }}
              onPress={() => null}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '500',
                  color: couleurs.primary,
                  fontFamily: CustomFont.Poppins,
                }}>
                Avez-vous besoin d'aide ?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
