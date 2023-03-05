import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import EyeSlashIcon from '../components/eye_slash';
import EyeIcon from '../components/eye';
import {CustomFont, couleurs} from '../components/color';
import UserPosition from '../components/api/user_position';
import Geolocation from '@react-native-community/geolocation';
import ArrowLeftIcon from '../components/ArrowLeft';

// InscriptionProprietaireScreen1
export default function InscriptionProprietaireScreen1({
  navigation,
}: {
  navigation: any;
}) {
  var [isVisible, setVisible] = useState(false);
  var [isVisibleModalInfoPrivee, setVisibleModalInfoPrivee] = useState(false);

  const _setVisible = () => {
    if (isVisible) setVisible(false);
    if (!isVisible) setVisible(true);
  };

  var etablissement: any = {
    nom: '',
    email: '',
    mobile: '',
    password: '',
    role: 'ROLE_VENDEUR',
    longitude: '',
    latitude: '',
    adresse: '',
    corps_metier: '',
  };

  Geolocation.getCurrentPosition(info => {
    etablissement.longitude = info.coords.longitude;
    etablissement.latitude = info.coords.latitude;
  });

  const getEtablissementData = () => {
    console.log(etablissement);

    if (etablissement.nom.length < 2) {
      Alert.alert('', "Le nom de l'entreprise est trop court", [
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }

    if (etablissement.mobile.length < 6) {
      Alert.alert('', "Le mobile de l'entreprise est trop court", [
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!etablissement.email.match(mailformat)) {
      Alert.alert('', 'Email invalide', [{text: 'OK', onPress: () => null}]);
      return;
    }

    if (etablissement.password.length < 4) {
      Alert.alert('', 'Mot de passe trop court', [
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }



    navigation.navigate('inscription_proprietaire_2', {
      etablissement: etablissement,
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
              marginTop: 10,
            }}>
            <View
              style={{
                marginVertical: 10,
                backgroundColor: '#fff',
                borderRadius: 11,
                padding: 20,
                width: '90%',
                marginTop: 10,
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
                    color: '#000',
                    fontSize: 15,
                    opacity: 0.85,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Nom entreprise
                </Text>
                <TextInput
                  placeholderTextColor={'rgba(100,100,100,.7)'}
                  placeholder="Entrez le nom entreprise"
                  defaultValue={etablissement.nom}
                  onChangeText={input => (etablissement.nom = input)}
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: couleurs.primary,
                    color: couleurs.primary,
                    width: '100%',
                    fontFamily: CustomFont.Poppins,
                    padding: 10,
                  }}></TextInput>
              </View>

           

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 15,
                    opacity: 0.85,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Email
                </Text>
                <TextInput
                  placeholderTextColor={'rgba(100,100,100,.7)'}
                  placeholder="Entrez l'email entreprise"
                  defaultValue={etablissement.email}
                  onChangeText={input => (etablissement.email = input)}
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: couleurs.primary,
                    color: couleurs.primary,
                    width: '100%',
                    fontFamily: CustomFont.Poppins,
                    padding: 10,
                  }}></TextInput>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 15,
                    opacity: 0.85,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Mobile
                </Text>
                <TextInput
                  placeholderTextColor={'rgba(100,100,100,.7)'}
                  placeholder="Entrez le mobile entreprise"
                  defaultValue={etablissement.mobile}
                  onChangeText={input => (etablissement.mobile = input)}
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: couleurs.primary,
                    color: couleurs.primary,
                    width: '100%',
                    fontFamily: CustomFont.Poppins,
                    padding: 10,
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
                    color: '#000',
                    fontSize: 15,
                    opacity: 0.85,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Mot de passe
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    flexWrap: 'nowrap',
                  }}>
                  <TextInput
                    textContentType="password"
                    keyboardType="default"
                    secureTextEntry={!isVisible}
                    defaultValue={etablissement.password}
                    onChangeText={input => (etablissement.password = input)}
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrer votre mot de Passe..."
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: couleurs.primary,
                      color: couleurs.primary,
                      fontFamily: CustomFont.Poppins,
                      flex: 1,
                      padding: 10,
                    }}></TextInput>
                  <TouchableOpacity
                    style={{padding: 15, width: 20, height: 20}}
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
                  onPress={() => getEtablissementData()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 15,
                      fontFamily: CustomFont.Poppins,
                      color: couleurs.secondary,
                    }}>
                    Suivant
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
                justifyContent: 'flex-end',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                }}
                onPress={() => null}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.primary,
                  }}>
                  Avez-vous besoin d'aide ?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
