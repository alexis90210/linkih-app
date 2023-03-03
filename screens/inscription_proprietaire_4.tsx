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
  Image,
} from 'react-native';
import { couleurs } from '../components/color';
import axios from 'axios';
import ApiService from '../components/api/service';

// InscriptionProprietaire3
export default function InscriptionProprietaire4({navigation, route}: {navigation: any, route:any}) {
  
  
 const loginNow = () => {
  console.log(route.params.api);
  
  navigation.navigate('identification_proprietaire', 
    {
      login: route.params.api.login,
      api:route.params.api
    }
    )
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
              <Image source={require('../assets/images/success.png')} style={{height:250, width:'100%'}} />
            <Text
              style={{
                textAlign: 'center',
                color: couleurs.primary,
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
                backgroundColor: couleurs.primary ,borderRadius: 30,
              }}>
              <Pressable
              android_ripple={{color: '7B4C7A'}}
                style={{
                  paddingHorizontal: 10,
                }}
                onPress={() => loginNow()}>
                <Text
                  style={{
                    textAlign: 'center',

                    fontWeight: '500',
                    color: couleurs.secondary,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    width: 250,
                  }}>
                  Se connecter
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
