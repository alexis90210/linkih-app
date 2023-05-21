import React, {useRef, useState, useEffect} from 'react';

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
  ActivityIndicator,
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import axios from 'axios';
import ApiService from '../components/api/service';
import translations from '../translations/translations';
import storage from '../components/api/localstorage';
import secureStorage from '../components/api/secureStorage';


// InscriptionProprietaire4
export default function InscriptionProprietaire4({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////////

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
 

  //////////////////////////////////////////////////////////////////////////////////////

  const [isLoading, setLoading] = useState(false);

  var [code, setCode] = useState(''); 

  const verifCompte = () => {
    if (code.length < 4) {
      Alert.alert('', 'INVALID CODE', [
        {text: t('Ressayez', preferredLangage), onPress: () => null},
      ]);
      return;
    }

    setLoading(true);
    axios({
      method: 'POST',
      url: ApiService.API_SEND_COMPTE_VERIFICATION,
      data: JSON.stringify({
        vendeur_id: route.params.api.vendeur_id,
        code: code,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setLoading(false);

        console.log(response.data);

        if (response.data.code == 'success') {
          navigation.navigate('inscription_proprietaire_5', {
            login: route.params.api.login,
            api: route.params.api,
          });
        } else {
          Alert.alert('', response.data.message, [
            {text: 'Ok', onPress: () => null},
          ]);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        Alert.alert('', t('Erreur_serveur', preferredLangage), [
          {text: t('Ressayez', preferredLangage), onPress: () => null},
        ]);
      });
  };

  const sendEmail = () => {
    setLoading(true);
    axios({
      method: 'POST',
      url: ApiService.API_SEND_MAIL_CONFIRMATION,
      data: JSON.stringify({
        vendeur_id: route.params.api.vendeur_id,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setLoading(false);

        console.log(response.data);
      })
      .catch(error => {
        console.log(error);

        setLoading(false);

        Alert.alert('', t('Erreur_serveur', preferredLangage), [
          {text: t('Ressayez', preferredLangage), onPress: () => null},
        ]);
      });
  };

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
            <Text
              style={{
                textAlign: 'center',
                color: couleurs.primary,
                fontFamily: CustomFont.Poppins,
                fontSize: 17,
                width: '80%',
              }}>
              {t('Felicitations_d_etape', preferredLangage)}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#00000090',
                opacity: 0.85,
                fontFamily: CustomFont.Poppins,
                fontSize: 13,
                marginVertical: 13,
                width: '80%',
              }}>
              {t('Votre_login_est', preferredLangage)} :{' '}
              {route.params.api.login}
            </Text>

            <Text
              style={{
                textAlign: 'center',
                color: '#00000090',
                opacity: 0.85,
                fontFamily: CustomFont.Poppins,
                fontSize: 13,
                marginVertical: 13,
                width: '80%',
              }}>
              {t(
                'Un_code_de_validation_de_compte_vous_a_ete_transmit_par_mail',
                preferredLangage,
              )}
            </Text>

            <TextInput
              placeholderTextColor={'rgba(100,100,100,.7)'}
              placeholder={t('Entrez_le_code', preferredLangage)}
              defaultValue={code}
              keyboardType='number-pad'
              onChangeText={input => {
                setCode(input)
              }}
              style={{
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
                borderBottomColor: couleurs.primary,
                color: couleurs.primary,
                fontFamily: CustomFont.Poppins,
                padding: 10,
                width: '70%',
                fontSize: 18,
                textAlign: 'center',
              }}></TextInput>

            <View
              style={{
                marginTop: 50,
                marginBottom: 30,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: couleurs.primary,
                borderRadius: 30,
              }}>
              <Pressable
                android_ripple={{color: '7B4C7A'}}
                style={{
                  paddingHorizontal: 10,
                }}
                onPress={() => verifCompte()}>
                <Text
                  style={{
                    textAlign: 'center',

                    fontWeight: '500',
                    color: couleurs.secondary,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 13,
                    width: 250,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  {t('valider', preferredLangage)}
                </Text>
              </Pressable>
            </View>

            <Text
              style={{
                textAlign: 'center',
                color: '#00000090',
                opacity: 0.85,
                fontFamily: CustomFont.Poppins,
                fontSize: 13,
                marginVertical: 5,
                width: '80%',
              }}>
              {t('Je_n_ai_pas_recu_mon_code', preferredLangage)}
            </Text>
            <Pressable onPress={() => sendEmail()}>
              <Text
                style={{
                  color: couleurs.primary,
                  textAlign: 'center',
                  opacity: 0.85,
                  fontFamily: CustomFont.Poppins,
                  fontSize: 13,
                  marginVertical: 7,
                }}>
                {t('Demander_un_autre', preferredLangage)}
              </Text>
            </Pressable>

            {isLoading && (
              <ActivityIndicator size="large" color={couleurs.primary} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
