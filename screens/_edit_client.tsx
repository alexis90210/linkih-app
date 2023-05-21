import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  PermissionsAndroid
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import storage from '../components/api/localstorage';
import ApiService from '../components/api/service';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-crop-picker';
import translations from '../translations/translations';


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
// EditClientScreen
export default function EditClientScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {

  /////////////////////////////////// LANGUAGE HANDLER //////////////////////////////////
  const [preferredLangage , setPreferredLangage] = useState('fr');

  const t = (key:any , langage:any) => {
    return translations[langage][key] || key
  }

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


  var client = route.params;
  client.update = true;

  useEffect(() =>{
    const rep = requestLocationPermission();
    rep.then(res =>{
      if (res) {
        Geolocation.getCurrentPosition(info => {
          client.longitude = info.coords.longitude;
          client.latitude = info.coords.latitude;    
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
      Alert.alert('', t('email_invalide', preferredLangage), [{text: 'OK', onPress: () => null}]);
      return;
    }

    if (client.password.length < 4) {
      Alert.alert('', t('mot_de_passe_court', preferredLangage), [
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }

    axios({
      method: 'PUT',
      url: ApiService.API_URL_EDIT_UTILISATEUR,
      data: JSON.stringify(client),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        console.log(api);

        if (api.code == 'success') {
          navigation.goBack()
        }
        if (api.code == 'error') {
          Alert.alert('', api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert(
          '',
          t('erreur_survenue', preferredLangage)
        );
      });
  };

  // FILE HANDLER
  const [photoCover, setPhotoCover] = useState('');
  const [photoCoverImage, setPhotoCoverImage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const openImagePickerWithCrop = () => {
    ImagePicker.openPicker({
      width: 900,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setPhotoCover(image.path);
      setPhotoCoverImage(image as never);
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
            }}>
            <Image
              source={
                photoCover
                  ? {uri: photoCover}
                  : require('../assets/images/banner.jpeg')
              }
              style={{width: '100%', height: 150, borderRadius: 10}}
            />

            <TouchableOpacity
              style={{position: 'absolute', top: 90}}
              onPress={() => openImagePickerWithCrop()}>
              <Text
                style={{
                  backgroundColor: couleurs.primary,
                  color: couleurs.white,
                  margin: 10,
                  borderWidth: 1,
                  borderRadius: 20,
                  borderStyle: 'dashed',
                  borderColor: couleurs.primary,
                  padding: 10,
                  paddingHorizontal: 30,
                }}>
                { t('clique_pour_choisir_photo', preferredLangage) }
              </Text>
            </TouchableOpacity>
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
                  { t('noms_prenoms', preferredLangage) }
                </Text>
                <TextInput
                  defaultValue={client.nom}
                  onChangeText={input => (client.nom = input)}
                  placeholder={ t('entrez_votre_noms_prenoms', preferredLangage) }
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
                  { t('email', preferredLangage) }
                </Text>
                <TextInput
                  defaultValue={client.email}
                  onChangeText={input => (client.email = input)}
                  placeholder={ t('entrez_votre_email', preferredLangage) }
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

              {/* <View
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
                  Mot de passe
                </Text>
                <TextInput
                  onChangeText={input => (client.password = input)}
                  textContentType="password"
                  keyboardType="default"
                  placeholder="Entrez votre nouveau mot de passe"
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
              </View> */}

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: couleurs.primary,
                  borderRadius: 30,
                  marginBottom: 20,
                  marginTop:40
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
                    { t('modifier', preferredLangage) }
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
                  { t('besoin_d_aide', preferredLangage) }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
