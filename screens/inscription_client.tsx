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
  PermissionsAndroid
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import storage from '../components/api/localstorage';
import ApiService from '../components/api/service';
import axios from 'axios';
import UserPosition from '../components/api/user_position';
import Geolocation from '@react-native-community/geolocation';
import {useState} from 'react';
import translations from '../translations/translations';
import EyeSlashIcon from '../components/eye_slash';
import EyeIcon from '../components/eye';
import secureStorage from '../components/api/secureStorage';

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission de localiser votre position',
        message: 'Pouvons-nous accéder à votre emplacement?',
        buttonNeutral: 'Demande moi plus tard',
        buttonNegative: 'Annuler',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

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

  secureStorage.getKey('defaultlang').then(res => {
    if ( res ) {
      setPreferredLangage(res);
    } else {
      setPreferredLangage(preferredLangage);
    }
  }, (err) => {
    console.log(err)
  })

  /////////////////////////////////////////

  var [isVisible, setVisible] = useState(false);

  const _setVisible = () => {
    if (isVisible) setVisible(false);
    if (!isVisible) setVisible(true);
  };

  //////////////////////////////////////////


  const [clientNom, setClientNom] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPassword, setClientPassword] = useState('')
  const [clientAdresse, setClientAdresse] = useState('')
  const [clientMobile, setClientMobile] = useState('')
  const [clientPays, setClientPays] = useState('')

  const [clientLongitude, setClientLongitude] = useState('')
  const [clientLatitude, setClientLatitude] = useState('')

  const [clientLangue, setClientLangue] = useState('')
  const [clientPays, setClientPays] = useState('')



  useEffect(() =>{
    const rep = requestLocationPermission();
    rep.then(res =>{
      if (res) {
        Geolocation.getCurrentPosition(info => {
          setClientLongitude(info.coords.longitude)
          setClientLatitude(info.coords.latitude) 
        },
        
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
           
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        navigation.goBack()
      }
    })
    
  })

  const [isProccessing, setProcessing] = useState(false);

  storage
    .load({
      key: 'configuration', // Note: Do not use underscore("_") in key!
      id: 'configuration', // Note: Do not use underscore("_") in id!
    })
    .then(data => {
      setClientLangue(data.langage.name)
      setClientPays(data.pays.name)
    });

  const onSubmit = () => {
   

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!clientEmail.match(mailformat)) {
      Alert.alert('', t('email_invalide', preferredLangage), [
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }

    if (clientPassword.length < 4) {
      Alert.alert('', t('mot_de_passe_court', preferredLangage), [
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }
    setProcessing(true);

    axios({
      method: 'POST',
      url: ApiService.API_URL_CREATE_UTILISATEUR,
      data: JSON.stringify({
        nom: clientNom,
        email: clientEmail,
        password: clientPassword,
        role: 'ROLE_CLIENT',
        longitude: clientLongitude,
        latitude: clientLatitude,
        adresse: clientAdresse,
        mobile: clientMobile,
        pays: clientPays,
        langue: preferredLangage
      }),
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
     
          navigation.navigate('inscription_client_2', {
            api: api,
          })
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
                defaultValue={clientNom}
                  onChangeText={input => (setClientNom(input) )}
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
                defaultValue={clientEmail}
                  onChangeText={input => (setClientEmail(input))}
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
                    defaultValue={clientPassword}
                    onChangeText={input => (setClientPassword(input))}
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    style={{
                      backgroundColor: 'transparent',
                      color: couleurs.primary,
                      fontSize: 13,
                      flex:1,
                      fontFamily: CustomFont.Poppins,
                    }}></TextInput>
                  <TouchableOpacity
                    style={{margin: 5, width: 20, height: 20}}
                    onPress={_setVisible}>
                    {isVisible && <EyeSlashIcon />}
                    {!isVisible && <EyeIcon color={couleurs.primary} />}
                  </TouchableOpacity>
                </View>

                  {/*  */}
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
