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
  Modal,
  ActivityIndicator,
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import storage from '../components/api/localstorage';
import ApiService from '../components/api/service';
import axios from 'axios';
import UserPosition from '../components/api/user_position';
import Geolocation from '@react-native-community/geolocation';
import {useState} from 'react';
import translations from '../translations/translations';

// InscriptionClientScreen
export default function InscriptionClientScreen({
  navigation,
}: {
  navigation: any;
}) {
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

  var client: any = {
    nom: '',
    email: '',
    password: '',
    role: 'ROLE_CLIENT',
    longitude: '',
    latitude: '',
    adresse: '',
    mobile: '',
    pays: '',
    langue: '',
  };

  Geolocation.getCurrentPosition(info => {
    client.longitude = info.coords.longitude;
    client.latitude = info.coords.latitude;
  });

  const [isProccessing, setProcessing] = useState(false);

  storage
    .load({
      key: 'configuration', // Note: Do not use underscore("_") in key!
      id: 'configuration', // Note: Do not use underscore("_") in id!
    })
    .then(data => {
      client.langue = data.langage.name;
      client.pays = data.pays.name;
    });

  const onSubmit = () => {
    console.log(client);

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!client.email.match(mailformat)) {
      Alert.alert('', t('email_invalide', preferredLangage), [
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }

    if (client.password.length < 4) {
      Alert.alert('', t('mot_de_passe_court', preferredLangage), [
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }
    setProcessing(true);
    axios({
      method: 'POST',
      url: ApiService.API_URL_CREATE_UTILISATEUR,
      data: JSON.stringify(client),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        console.log(api);
        setProcessing(false);

        if (api.code == 'success') {
          Alert.alert(
            'SUCCES',
            t('Votre_compte_a_bien_ete_cree', preferredLangage) +
              ` ${api.login}`,
            [
              {
                text: t('se_connecter', preferredLangage),
                onPress: () =>
                  navigation.navigate('identification_client', {
                    login: api.login,
                  }),
              },
            ],
          );
        }
        if (api.code == 'error') {
          Alert.alert(t('erreur_survenue', preferredLangage), api.message, [
            {text: 'OK', onPress: () => null},
          ]);
        }
      })
      .catch((error: any) => {
        setProcessing(false);
        console.log(error);
        Alert.alert(
          t('erreur_survenue', preferredLangage),
          t('Erreur_survenue_il_se_pourrait', preferredLangage),
          [{text: 'OK', onPress: () => null}],
        );
      });
  };

  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f6f6f6f6',
        }}>
        {/* LOADING MODAL */}

        <Modal transparent={true} visible={isProccessing}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'column',
              backgroundColor: 'rgba(200,200,200,.5)',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <ActivityIndicator
              color={couleurs.primary}
              style={{alignSelf: 'center'}}
              size={'large'}></ActivityIndicator>
          </View>
        </Modal>

        {/* END LOADING */}

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
                    color: couleurs.dark,
                    fontSize: 13,
                    height: 30,
                    opacity: 0.85,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  {t('Noms_Prenoms', preferredLangage)}
                </Text>
                <TextInput
                  onChangeText={input => (client.nom = input)}
                  placeholder={t(
                    'Entrez_votre_nom_et_prenom_complet',
                    preferredLangage,
                  )}
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: couleurs.primary,
                    color: couleurs.primary,
                    width: '100%',
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                  }}></TextInput>
              </View>

              <View
                style={{
                  marginTop: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: couleurs.dark,
                    fontSize: 13,
                    height: 30,
                    opacity: 0.85,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  {t('Entrez_votre_email', preferredLangage)}
                </Text>
                <TextInput
                  onChangeText={input => (client.email = input)}
                  placeholder={t('Entrez_votre_email', preferredLangage)}
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: couleurs.primary,
                    color: couleurs.primary,
                    width: '100%',
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
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
                    color: couleurs.dark,
                    fontSize: 13,
                    height: 30,
                    opacity: 0.85,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  {t('mot_de_passe', preferredLangage)}
                </Text>
                <TextInput
                  onChangeText={input => (client.password = input)}
                  textContentType="password"
                  keyboardType="default"
                  placeholder={t('entrez_votre_mot_de_passe', preferredLangage)}
                  secureTextEntry={true}
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: couleurs.primary,
                    color: couleurs.primary,
                    fontSize: 13,
                    width: '100%',
                    fontFamily: CustomFont.Poppins,
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
                      fontSize: 13,
                      fontFamily: CustomFont.Poppins,
                      color: couleurs.secondary,
                    }}>
                    {t('valider', preferredLangage)}
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
                    fontSize: 13,
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.primary,
                  }}>
                  {t('Besoin_d_aide', preferredLangage)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
