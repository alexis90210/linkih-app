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
import { couleurs } from '../components/color';
import axios from 'axios';
import ApiService from '../components/api/service';

// InscriptionProprietaire3
export default function InscriptionProprietaire4({navigation, route}: {navigation: any, route:any}) {
  
  console.log( JSON.stringify(route.params.payload) );

  const submitSaveProprietaire = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_CREATE_UTILISATEUR,
      data: JSON.stringify(route.params.payload),
      headers: {
        Accept: 'application/json',
       'Content-Type': 'application/json'
     }
    }).then((response: {data: any}) => {
      console.log(response.data);
      
      if ( response.data.code == "success") {
        // navigation.navigate('main')
      }
    }).catch( error => console.log(error) )
  }
  

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
              marginTop: '45%',
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
                onPress={() => submitSaveProprietaire()}>
                <Text
                  style={{
                    textAlign: 'center',

                    fontWeight: '500',
                    color: couleurs.secondary,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    width: 150,
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
