import React, {useRef, useState, useEffect} from 'react';
import { StackActions } from '@react-navigation/native';
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
import {CustomFont, couleurs} from '../components/color';
import storage from '../components/api/localstorage';
import translations from '../translations/translations';
import secureStorage from '../components/api/secureStorage';

// SplashScreen
export default function SplashScreen({navigation}: {navigation: any}) {


  const [preferredLangage, setPreferredLangage] = useState('fr');

  const t = (key: any, langage: any) => {
    return translations[langage][key] || key;
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      let lang = await secureStorage.getKey('defaultlang')
      if ( lang ) {
        setPreferredLangage(lang);
      }
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  secureStorage.getKey('firstusage').then(res => {
    if ( res == 1 ) {

      secureStorage.getKey('firstusage').then(etablissement =>{
        navigation.dispatch(StackActions.push('MonEtablissement', {
                vendeur_id: etablissement,
                isProprietaire: true,
              }))
      })
      
    } else {

      secureStorage.getKey('utilisateur').then(utilisateur => {
        navigation.dispatch(StackActions.push('main', {
              utilisateur_id: utilisateur,
              isProprietaire:false
            }))
      })
       
    }
  }, (err) => {
    console.log(err)
  })
    

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{backgroundColor: '#000'}}>
      <StatusBar backgroundColor={'#000'}></StatusBar>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}>
        <Image
          source={require('../assets/images/linkih-logo.jpeg')}
          style={{
            height: 170,
            width: 300,
            borderRadius: 10,
            resizeMode: 'cover',
          }}
        />

        <Text
          style={{
            textAlign: 'center',
            color: couleurs.white,
            textTransform: 'uppercase',
            fontSize: 20,
            fontFamily: CustomFont.Poppins,
          }}>
          {t('bienvenu', preferredLangage)}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: couleurs.secondary,
            fontSize: 13,
            width: '80%',
            fontFamily: CustomFont.Poppins,
          }}>
          {t('bienvenu_sous_titre', preferredLangage)}
        </Text>
        <View
          style={{
            marginVertical: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: couleurs.white,
            borderRadius: 30,
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
            }}
            onPress={() => {
              navigation.navigate('configuration');
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '500',
                color: couleurs.primary,
                padding: 10,
                paddingHorizontal: 20,
                fontSize: 13,
                width: 150,
                fontFamily: CustomFont.Poppins,
              }}>
              {t('explorez', preferredLangage)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
