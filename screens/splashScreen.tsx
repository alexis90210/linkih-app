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
  Image,
} from 'react-native';
import ShopIcon from '../components/shop';
import { CustomFont, couleurs } from '../components/color';

// SplashScreen
export default function SplashScreen({navigation}: {navigation: any}) {
  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: couleurs.dark,
        }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              flex:1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '40%',
            }}>


              <Image source={require('../assets/images/logo.png')} style={{height:70, width:180}} />
          
            <Text
              style={{
                marginTop:30,
                textAlign: 'center',
                color: couleurs.white,
                fontWeight: '800',
                textTransform: 'uppercase',
                fontSize: 24,
                fontFamily:CustomFont.Poppins
              }}>
              Welcome on Linkih
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: couleurs.secondary,
                opacity: 0.85,
                fontWeight: '600',
                fontSize: 14,
                marginVertical: 13,
                width:'80%',
                fontFamily:CustomFont.Poppins
              }}>
              Gérer votre fiche d'établissement directement sur l'application
              mobile
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
                onPress={() => navigation.navigate('configuration')}>
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
      </SafeAreaView>
    </>
  );
}
