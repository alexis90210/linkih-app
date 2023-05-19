import React, {useState} from 'react';
import { StackActions } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';

import {CustomFont, couleurs} from '../components/color';
import axios from 'axios';
import ApiService from '../components/api/service';
import storage from '../components/api/localstorage';
import translations from '../translations/translations';
import ArrowRightIcon from '../components/ArrowRight';
import EyeSlashIcon from '../components/eye_slash';
import EyeIcon from '../components/eye';

// IdentificationProprietaireScreen
export default function IdentificationProprietaireScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  console.log(route.params?.is);

  /////////////////////////////////// LANGUAGE HANDLER //////////////////////////////////

  const [preferredLangage, setPreferredLangage] = useState('fr');

  const t = (key: any, langage: any) => {
    return translations[langage][key] || key;
  };

   secureStorage.getKey('defaultlang').then(res => {
    if ( res ) {
      setPreferredLangage(res);
    } else {
      setPreferredLangage(preferredLangage);
    }
  }, (err) => {
    console.log(err)
  })

  //////////////////////////////////////////////////////////////////////////////////////
  var [isVisible, setVisible] = useState(false);

  const _setVisible = () => {
    if (isVisible) setVisible(false);
    if (!isVisible) setVisible(true);
  };

  //////////////////////////////////////////
  storage.save({
    key: 'typeuser', // Note: Do not use underscore("_") in key!
    id: 'typeuser', // Note: Do not use underscore("_") in id!
    data: {
      type: route.params?.is,
    },
  });

  const [isProccessing, setIsProccessing] = useState(false);
  const [password, setPassword] = useState('');
  const [identifiant, setIdentifiant] = useState('');

  if (route.params?.login && route.params?.login.length > 0) {
    if (!identifiant) {
      setIdentifiant(route.params?.login);
    }
  }

  const logUser = async () => {
    if (!identifiant) {
      Alert.alert('', t('Veuillez_entrer_un_identifiant', preferredLangage), [
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }

    if (!password) {
      Alert.alert(
        '',
        t('Veuillez_entrer_un_mot_de_passe_valide', preferredLangage),
        [{text: 'OK', onPress: () => null}],
      );
      return;
    }

    setIsProccessing(true);

    axios({
      method: 'POST',
      url: ApiService.API_URL_LOGIN,
      data: JSON.stringify({
        login: identifiant,
        password: password,
        role: 'ROLE_VENDEUR',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;

        console.log('login ===', api);

        if (api.code == 'success') {
          storage.save({
            key: 'credentials', // Note: Do not use underscore("_") in key!
            id: 'credentials', // Note: Do not use underscore("_") in id!
            data: {
              pays: api.message,
            },
          });

          storage.save({
            key: 'firstusage', // Note: Do not use underscore("_") in key!
            id: 'firstusage', // Note: Do not use underscore("_") in id!
            data: {
              isNew: false,
              isClient: false,
            },
          });

          secureStorage.setKey('firstusage','1') // vendeur

          axios({
            method: 'POST',
            url: ApiService.API_URL_USER_DATA,
            data: JSON.stringify({
              id: api.message.id,
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((response: {data: any}) => {
              setIsProccessing(false);

              storage.save({
                key: 'userconnected', // Note: Do not use underscore("_") in key!
                id: 'userconnected', // Note: Do not use underscore("_") in id!
                data: {
                  ...response.data,
                  role: api.message.role,
                },
              });

              secureStorage.setKey('etablissement',response.data.etablissement.id) // vendeur

           

              navigation.dispatch(StackActions.push('MonEtablissement', {
                vendeur_id: response.data.etablissement.id,
                isProprietaire: true,
              }))

            })
            .catch(error => {
              setIsProccessing(false);
              Alert.alert(
                '',
                t(
                  'Nous_n_avons_pas_pu_recuper_vos_informations',
                  preferredLangage,
                ),
                [{text: 'OK', onPress: () => null}],
              );
            });
        }

        if (api.code == 'error') {
          setIsProccessing(false);

          if (api.status) {
            Alert.alert('', api.message, [
              {
                text: t('Confirmer_maintenant', preferredLangage),
                onPress: () =>
                  navigation.navigate('confirmation_screen', {
                    client_id: api.id,
                  }),
              },
            ]);
          } else {
            Alert.alert(
              '',
              t('login_incorect', preferredLangage),
              [
                {
                  text: 'OK',
                  onPress: () => null,
                },
              ],
              {cancelable: true},
            );
          }
        }
      })
      .catch((error: any) => {
        setIsProccessing(false);
        console.log(error);
        Alert.alert('', error, [{text: 'OK', onPress: () => null}]);
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
                    marginTop: 14,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  {t('Identifiant', preferredLangage)}
                </Text>
                <TextInput
                  defaultValue={identifiant}
                  onChangeText={input => setIdentifiant(input)}
                  placeholder={t(
                    'Veuillez_entrer_un_identifiant',
                    preferredLangage,
                  )}
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: couleurs.primary,
                    width: '100%',
                    fontWeight: '600',
                    padding: 0,
                    fontFamily: CustomFont.Poppins,
                  }}></TextInput>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 23,
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
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    flexWrap: 'nowrap',
                    borderBottomWidth: 1,
                    borderBottomColor: couleurs.primary,
                  }}>
                  <TextInput
                    textContentType="password"
                    keyboardType="default"
                    placeholder={t(
                      'entrez_votre_mot_de_passe',
                      preferredLangage,
                    )}
                    secureTextEntry={!isVisible}
                    defaultValue={password}
                    onChangeText={input => {
                      setPassword(input);
                    }}
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    style={{
                      backgroundColor: 'transparent',
                      color: couleurs.primary,
                      fontSize: 13,
                      flex: 1,
                      fontFamily: CustomFont.Poppins,
                    }}></TextInput>
                  <TouchableOpacity
                    style={{margin: 5, width: 20, height: 20}}
                    onPress={_setVisible}>
                    {isVisible && <EyeSlashIcon />}
                    {!isVisible && <EyeIcon color={couleurs.primary} />}
                  </TouchableOpacity>
                </View>
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
                  onPress={() => logUser()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 13,
                      color: couleurs.secondary,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    {t('Se_connecter', preferredLangage)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginVertical: 5,
                }}>
                <TouchableOpacity
                  style={{}}
                  onPress={() => navigation.navigate('recup_pass_screen')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 13,
                      color: couleurs.dark,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    {t('Mot_de_passe_oublie', preferredLangage)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 15,
              marginTop: 10,
            }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: couleurs.primaryLight,
                borderRadius: 30,
                marginBottom: 20,
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('inscription_proprietaire_1')
                }>
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 13,
                    color: couleurs.dark,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  {t('Je_cree_mon_compte', preferredLangage)}
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
              marginVertical: 10,
              marginTop: 30,
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
                  color: couleurs.primary,
                  fontFamily: CustomFont.Poppins,
                }}>
                {t('Avez_vous_besoin_d_aide', preferredLangage)}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
