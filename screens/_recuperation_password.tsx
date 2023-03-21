

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    PixelRatio,
    TextInput,
    Alert,
    Modal,
    ActivityIndicator,
  } from 'react-native';
  import { CustomFont, couleurs } from '../components/color';
  import storage from '../components/api/localstorage';
  import ApiService from '../components/api/service';
  import axios from 'axios';
  import UserPosition from '../components/api/user_position';
  import Geolocation from '@react-native-community/geolocation';
  import { useState } from 'react';
  
  // RecuperationPassword
  export default function RecuperationPassword({
    navigation,
  }: {
    navigation: any;
  }) {
  
    var client:any = {
      login:'',
      password:''
    }
  
 
    const [isProccessing,  setProcessing] = useState(false)
  
    const onSubmit = () => {
      console.log(client);
  
      if(client.password.length < 4)
      {
        Alert.alert('', "Mot de passe trop court", [        
          {text: 'OK', onPress: () => null},
        ]);
        return;
      }
      setProcessing(true)
      axios({
        method: 'POST',
        url: ApiService.API_URL_EDIT_UTILISATEUR,
        data: JSON.stringify(client),
        headers: {
          Accept: 'application/json',
         'Content-Type': 'application/json'
       }
      })
        .then((response: {data: any}) => {        
           var api = response.data;
           console.log( api );
           setProcessing(false)
           
           if ( api.code == "success") {
            Alert.alert('SUCCES', `Mot de passe change avec success`, [   
              {text: 'Se connecter', onPress: () => navigation.goBack()},
            ]);        
           }
           if ( api.code == "error") {
            Alert.alert('Erreur', api.message, [        
              {text: 'OK', onPress: () => null},
            ]);
           }         
        })
        .catch((error: any) => {
          setProcessing(false)
          console.log(error);
          Alert.alert('Erreur', "Erreur survenue", [        
            {text: 'OK', onPress: () => null},
          ]);       
        });
    }
    
    return (
      <>
       <SafeAreaView
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f6f6f6f6',
          }}>
  
  
            {/* LOADING MODAL */}
  
          <Modal transparent={true} visible={isProccessing}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: 'rgba(200,200,200,.5)',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <ActivityIndicator
                color={couleurs.primary}
                style={{alignSelf: 'center'}}
                size={'large'}></ActivityIndicator>
            </View>
          </Modal>
  
          {/* END LOADING */}
  
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
                    marginTop:20,
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
                      fontFamily:CustomFont.Poppins
                    }}>
                    Login
                  </Text>
                  <TextInput
                  onChangeText={ (input) => client.login = input}
                  placeholder='Entrez votre identifiant'
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: couleurs.primary,
                      color: couleurs.primary,
                      width: '100%',
                      fontFamily:CustomFont.Poppins,
                      fontSize:15
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
                      fontFamily:CustomFont.Poppins
                    }}>
                    Mot de passe
                  </Text>
                  <TextInput
                  onChangeText={ (input) => client.password = input}
                  textContentType='password'
                  keyboardType='default'
                  placeholder='Entrez votre mot de passe'
                  secureTextEntry={true} 
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: couleurs.primary,
                      color: couleurs.primary,
                      fontSize:15,
                      width: '100%',
                      fontFamily:CustomFont.Poppins
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
                    onPress={() => onSubmit()}>
                    <Text
                      style={{
                        textAlign: 'center',
                        padding: 10,
                        paddingHorizontal: 20,
                        fontSize: 15,
                        fontFamily:CustomFont.Poppins,
                        color: couleurs.secondary,
                      }}>
                      Modifier
                    </Text>
                  </TouchableOpacity>
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
                  marginTop: 70,
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
                      fontFamily:CustomFont.Poppins,
                      color: couleurs.primary,
                    }}>
                    Besoin d'aide ?
                  </Text>
                </TouchableOpacity>
              </View>
  
              
            </View>
  
       
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
  