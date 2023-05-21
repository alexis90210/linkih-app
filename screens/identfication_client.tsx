import React, { useState } from 'react';
import { StackActions } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
  PermissionsAndroid
} from 'react-native';
import { CustomFont, couleurs } from '../components/color';
import ApiService, { setupAxiosAuth } from '../components/api/service';
import axios from 'axios';
import storage from '../components/api/localstorage';
import translations from '../translations/translations';
import EyeSlashIcon from '../components/eye_slash';
import EyeIcon from '../components/eye';
import secureStorage from '../components/api/secureStorage';


//import JWT from './components/api/token'

//axios.defaults.headers.common['Authorization'] = 'Bearer ' + JWT.token;



// IdentificationClientScreen
export default function IdentificationClientScreen({
  navigation, route
}: {
  navigation: any,
  route: any
}) {

  /////////////////////////////////// LANGUAGE HANDLER //////////////////////////////////

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

  var [isVisible, setVisible] = useState(false);

  const _setVisible = () => {
    if (isVisible) setVisible(false);
    if (!isVisible) setVisible(true);
  };

  //////////////////////////////////////////


  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');

  const [isProccessing, setProcessing] = useState(false)

  if (route.params?.login && route.params?.login.length > 0) {
    setIdentifiant(route.params?.login)
  }

  const logUser = async () => {

    if (!identifiant) {
      Alert.alert(t('erreur', preferredLangage), t('Veuillez_entrer_un_identifiant', preferredLangage), [
        { text: 'OK', onPress: () => null },
      ]);
      return;
    }

    if (!password) {
      Alert.alert(t('erreur', preferredLangage), t('Veuillez_entrer_un_mot_de_passe_valide', preferredLangage), [
        { text: 'OK', onPress: () => null },
      ]);
      return;
    }


    setProcessing(true);
    axios({
      method: 'POST',
      url: ApiService.API_URL_LOGIN,
      data: JSON.stringify({
        login: identifiant,
        password: password
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async (response: { data: any }) => {

        

        /**  Setup Jwt token  */
        /*** ======================= TODO: EDIT IF NEEDED (e.g: remove logs...) ========================== */
        console.log({ loginResp: api });
        try {
          await secureStorage.setKey("token", api.token);
          await setupAxiosAuth(api.token);
        } catch (error) {
          console.log("settoken error", error);
        }
        /*** ======================= TODO: EDIT IF NEEDED (e.g: remove logs...) ========================== */

        // user logged data

        axios({
          method: 'GET',
          url: ApiService.API_URL_LOGGED_USER_DATA,
          data: JSON.stringify({
            login: identifiant,
            password: password,
            role: 'ROLE_CLIENT'
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }).then( async (response: { data: any }) => {
          var api = response.data;
          if (api.code == "success") {

              setProcessing(false);
              
              await secureStorage.setKey('firstusage', '2') // client
              await secureStorage.setKey('utilisateur', response.data.id)
              await secureStorage.setKey('isProprietaire', '0')
              await secureStorage.setKey('role', 'ROLE_CLIENT')

              navigation.dispatch(StackActions.push('main'))        
          
          }

          if (api.code == 'error') {
            setProcessing(false);

            if (api.status) {
              Alert.alert('', api.message, [
                {
                  text: t('Confirmer_maintenant', preferredLangage),
                  onPress: () =>
                    navigation.navigate('ConfirmationCompteScreenClient', {
                      id: api.id,
                    }),
                },
              ]);
            } else {
              Alert.alert('', t('login_incorect', preferredLangage), [
                {
                  text: 'OK',
                  onPress: () => null
                }
              ], { cancelable: true });
            }
          }
          setProcessing(false);
        }).catch((error: any) => {
          console.log(error);
          setProcessing(false);
          Alert.alert('Erreur', error, [
            { text: 'OK', onPress: () => null },
          ]);
        });

      })
      .catch((error: any) => {
        console.log(error);
        setProcessing(false);
        Alert.alert('Erreur', error, [
          { text: 'OK', onPress: () => null },
        ]);
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
              style={{ alignSelf: 'center' }}
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
                  onChangeText={input => {
                    setIdentifiant(input)
                  }}
                  placeholder={t('Entrez_votre_identifiant', preferredLangage)}
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
                    placeholder={t('entrez_votre_mot_de_passe', preferredLangage)}
                    secureTextEntry={!isVisible}
                    defaultValue={password}
                    onChangeText={input => {
                      setPassword(input)
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
                    style={{ margin: 5, width: 20, height: 20 }}
                    onPress={_setVisible}>
                    {isVisible && <EyeSlashIcon />}
                    {!isVisible && <EyeIcon color={couleurs.primary} />}
                  </TouchableOpacity>
                </View>
              </View>

              {/* ---------------------------- */}

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: !isProccessing ? couleurs.primary : couleurs.primaryLight,
                  borderRadius: 30,
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    width: '70%',
                  }}
                  onPress={() => !isProccessing ? logUser() : null}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 13,
                      fontWeight: '500',
                      color: couleurs.white,
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
                  borderRadius: 30,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginVertical: 10,
                }}>
                <TouchableOpacity

                  style={{

                  }}
                  onPress={() => navigation.navigate('recup_pass_screen_client')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 13,
                      fontWeight: '500',
                      color: couleurs.dark,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    {t('Mot_de_passe_oublie', preferredLangage)}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View
                style={{
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderTopWidth:1,
                  borderStyle:'dotted',
                  borderColor:couleurs.primary,
                  paddingTop:15,
                  marginTop:10
                }}>
                <TouchableOpacity
                  
                  style={{
                    marginVertical: 10,
                  }}
                  onPress={() => navigation.navigate('creation_compte_client')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 13,
                      fontWeight: '500',
                      color: couleurs.dark,                      
                    fontFamily: CustomFont.Poppins,
                    }}>
                    {t('Je_cree_mon_compte', preferredLangage)}
                  </Text>
                </TouchableOpacity>
              </View>               */}
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
                  navigation.navigate('creation_compte_client')
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
              marginTop: 40,
              marginBottom: 30
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
                  fontWeight: '500',
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
