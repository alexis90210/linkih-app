import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import axios from 'axios';
import ApiService from '../components/api/service';
import translations from '../translations/translations';
import storage from '../components/api/localstorage';

// confirmationCompteScreenClient
export default function ConfirmationCompteScreenClient({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  /////////////////////////////////// LANGUAGE HANDLER //////////////////////////////////

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

  const [isLoading, setLoading] = useState(false);
  const [isLoadingScreen, setLoadingScreen] = useState(false);
  const [codeVal, setCodeVal] = useState('');

  const verifCompte = () => {
    if (codeVal.length < 4) {
      Alert.alert(
        '',
        t('Veuillez_renseignez_le_code_recu_par_mail', preferredLangage),
        [{text: t('Ressayez', preferredLangage), onPress: () => null}],
      );
      return;
    }

    setLoading(true);
    axios({
      method: 'POST',
      url: ApiService.API_SEND_COMPTE_VERIFICATION_CLIENT,
      data: JSON.stringify({
        client_id: route.params.id,
        code: codeVal,
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
          navigation.navigate('identification_client');
        } else {
          Alert.alert('', response.data.message, [
            {text: 'Ok', onPress: () => null},
          ]);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const sendEmail = () => {
    setLoading(true);
    axios({
      method: 'POST',
      url: ApiService.API_SEND_MAIL_CONFIRMATION_CLIENT,
      data: JSON.stringify({
        client_id: route.params.id,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setLoading(false);
        setLoadingScreen(false);

        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        setLoadingScreen(false);
        setLoading(false);

        // Alert.alert('', t("erreur_survenue", preferredLangage), [
        //   {text: t("Ressayez", preferredLangage), onPress: () => null},
        // ]);
      });
  };

  // loading screen

  if (!isLoadingScreen) {
    setLoadingScreen(true);
    sendEmail();
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
            <Text
              style={{
                textAlign: 'center',
                color: couleurs.primary,
                fontFamily: CustomFont.Poppins,
                fontSize: 17,
                width: '80%',
              }}>
              {t('Confirmation_de_compte', preferredLangage)}
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
              placeholder="Entrez le code"
              defaultValue={codeVal}
              onChangeText={input => setCodeVal(input)}
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
                  {t('Valider', preferredLangage)}
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
