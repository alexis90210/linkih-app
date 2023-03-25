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
import storage from '../components/api/localstorage';
import translations from '../translations/translations';

// SplashScreen
export default function SplashScreen({navigation}: {navigation: any}) {


  storage.save({
    key: 'defaultlang', // Note: Do not use underscore("_") in key!
    id: 'defaultlang', // Note: Do not use underscore("_") in id!
    data: 'fr',
  });

  const [preferredLangage , setPreferredLangage] = useState('fr');

  const t = (key:any , langage:any) => {
    return translations[langage][key] || key
  }

  storage.load({
    key: 'defaultlang', // Note: Do not use underscore("_") in key!
    id: 'defaultlang' // Note: Do not use underscore("_") in id!
  }).then( ( data:any) => {
    setPreferredLangage(data)
  })

  return (   

        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor:couleurs.primary}}>
          <StatusBar backgroundColor={couleurs.primary}></StatusBar>
          <View
            style={{
              flex:1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '40%',
            }}>
              <Image source={require('../assets/images/linkih-logo.jpeg')} style={{
                height:90, width:160, marginBottom:20, borderRadius:10
                }} />
          
            <Text
              style={{
                marginVertical:20,
                textAlign: 'center',
                color: couleurs.white,
                textTransform: 'uppercase',
                fontSize: 20,
                fontFamily:CustomFont.Poppins
              }}>
              {t('bienvenu', preferredLangage)}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: couleurs.secondary,
                fontSize: 14,
                width:'80%',
                fontFamily:CustomFont.Poppins
              }}>
              {t('bienvenu_sous_titre', preferredLangage)}
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
                  { t('explorez', preferredLangage)}
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>

  );
}
