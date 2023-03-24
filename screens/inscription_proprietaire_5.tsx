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
  Alert,
  Image,
} from 'react-native';
import { couleurs } from '../components/color';
import axios from 'axios';
import ApiService from '../components/api/service';
import translations from '../translations/translations';
import storage from '../components/api/localstorage';

// InscriptionProprietaire5
export default function InscriptionProprietaire5({navigation, route}: {navigation: any, route:any}) {
  
  /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////////

  const [preferredLangage, setPreferredLangage] = useState('fr');

  const t = (key: any, langage: any) => {
    return translations[langage][key] || key;
  };

  storage
    .load({
      key: 'defaultlang', // Note: Do not use underscore("_") in key!
      id: 'defaultlang', // Note: Do not use underscore("_") in id!
    })
    .then((data: any) => {
      setPreferredLangage(data);
    });

  //////////////////////////////////////////////////////////////////////////////////////

  
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
              marginTop: '20%',
            }}>
              <Image source={require('../assets/images/success.png')} style={{height:250, width:'100%'}} />
            <Text
              style={{
                textAlign: 'center',
                color: couleurs.primary,
                fontWeight: '600',
                textTransform: 'uppercase',
                fontSize: 17,
                width:'80%',
                marginTop:20
              }}>
              {t('Felicitations_votre_compte', preferredLangage)}
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
              {t('Veuillez_completer_vos_Informations_dans_votre_profile', preferredLangage)}
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
                  {t('se_connecter', preferredLangage)}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
