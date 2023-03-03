import React from 'react';

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
} from 'react-native';
import { CustomFont, couleurs } from '../components/color';
import storage from '../components/api/localstorage';
import ApiService from '../components/api/service';
import axios from 'axios';
import UserPosition from '../components/api/user_position';
import Geolocation from '@react-native-community/geolocation';

// InscriptionClientScreen
export default function InscriptionClientScreen({
  navigation,
}: {
  navigation: any;
}) {

  var client:any = {
    nom:'',
    email:'',
    password:'',
    role:'ROLE_CLIENT',
    longitude:'',
    latitude: '',
    adresse:'',
    mobile:'',
    pays:'',
    langue:'',
  }

  Geolocation.getCurrentPosition(
    info => {
      client.longitude = info.coords.longitude
      client.latitude = info.coords.latitude      
    }
  );

  storage.load({
    key: 'configuration', // Note: Do not use underscore("_") in key!
    id: 'configuration', // Note: Do not use underscore("_") in id!
  }).then( data => {
    client.langue = data.langage.name
    client.pays = data.pays.name
  });

  const onSubmit = () => {
    console.log(client);


    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!client.email.match(mailformat))
    {
      Alert.alert('', "Email invalide", [        
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }

    if(client.password.length < 4)
    {
      Alert.alert('', "Mot de passe trop court", [        
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }
    
    axios({
      method: 'POST',
      url: ApiService.API_URL_CREATE_UTILISATEUR,
      data: JSON.stringify(client),
      headers: {
        Accept: 'application/json',
       'Content-Type': 'application/json'
     }
    })
      .then((response: {data: any}) => {        
         var api = response.data;
         console.log( api );
         
         if ( api.code == "success") {
          Alert.alert('SUCCES', `Votre compte a bien ete cree, veuillez vous connecter . \nVotre login est : ${api.login}`, [   
            {text: 'Se connecter', onPress: () => navigation.navigate('identification_client', {login : api.login})},
          ]);        
         }
         if ( api.code == "error") {
          Alert.alert('Erreur', api.message, [        
            {text: 'OK', onPress: () => null},
          ]);
         }         
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('Erreur', "Erreur survenue, il se pourrait que les informations fournis soit incorrects ou deja utilise pour un autre compte", [        
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
                    fontFamily:CustomFont.Poppins
                  }}>
                  Noms & Prenoms
                </Text>
                <TextInput
                onChangeText={ (input) => client.nom = input}
                placeholder='Entrez votre nom et prenom complet '
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
                  Email
                </Text>
                <TextInput
                onChangeText={ (input) => client.email = input}
                placeholder='Entrez votre email'
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
                    valider
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
