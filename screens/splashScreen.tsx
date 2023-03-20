import React, { useState } from 'react';

import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  StatusBar,
} from 'react-native';
import { CustomFont, couleurs } from '../components/color';

// SplashScreen
export default function SplashScreen({navigation}: {navigation: any}) {

  return (   

        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor:couleurs.dark}}>
          <StatusBar backgroundColor={couleurs.dark}></StatusBar>
          <View
            style={{
              flex:1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '40%',
            }}>


              <Image source={require('../assets/images/logo.png')} style={{height:65, width:160, marginBottom:20}} />
          
            <Text
              style={{
                marginVertical:20,
                textAlign: 'center',
                color: couleurs.white,
                textTransform: 'uppercase',
                fontSize: 20,
                fontFamily:CustomFont.Poppins
              }}>
              Bienvenu sur Linkih
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: couleurs.secondary,
                fontSize: 14,
                width:'80%',
                fontFamily:CustomFont.Poppins
              }}>
              {"Gérer votre fiche d'établissement directement\nsur l'application mobile"}
            </Text>
            <View
              style={{
                marginVertical: 70,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: couleurs.white ,borderRadius: 30,
              }}>
              <TouchableOpacity              
                style={{
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  navigation.navigate('configuration')
                }}>
                <Text
                  style={{
                    textAlign: 'center',                    
                    fontWeight: '500',
                    color:couleurs.primary,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    width: 150,
                    fontFamily:CustomFont.Poppins
                  }}>
                  EXPLOREZ
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>

  );
}
