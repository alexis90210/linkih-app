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
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import storage from '../components/api/localstorage';
import ApiService from '../components/api/service';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-crop-picker';

// EditClientScreen
export default function EditClientScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  var client = route.params;
  client.update = true;

  console.log(client);

  Geolocation.getCurrentPosition(info => {
    client.longitude = info.coords.longitude;
    client.latitude = info.coords.latitude;
  });

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
      Alert.alert('', 'Email invalide', [{text: 'OK', onPress: () => null}]);
      return;
    }

    if (client.password.length < 4) {
      Alert.alert('', 'Mot de passe trop court', [
        {text: 'OK', onPress: () => null},
      ]);
      return;
    }

    axios({
      method: 'POST',
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
          'Erreur survenue'          
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
                Cliquez pour choisir une photo
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
                    color: '#000',
                    fontSize: 15,
                    height: 30,
                    opacity: 0.85,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Noms & Prenoms
                </Text>
                <TextInput
                  defaultValue={client.nom}
                  onChangeText={input => (client.nom = input)}
                  placeholder="Entrez votre nom et prenom complet "
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: couleurs.primary,
                    color: couleurs.primary,
                    width: '100%',
                    fontFamily: CustomFont.Poppins,
                    fontSize: 15,
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
                    color: '#000',
                    fontSize: 15,
                    height: 30,
                    opacity: 0.85,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Email
                </Text>
                <TextInput
                  defaultValue={client.email}
                  onChangeText={input => (client.email = input)}
                  placeholder="Entrez votre email"
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: couleurs.primary,
                    color: couleurs.primary,
                    width: '100%',
                    fontFamily: CustomFont.Poppins,
                    fontSize: 15,
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
                    color: '#000',
                    fontSize: 15,
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
                    fontSize: 15,
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
                      fontSize: 15,
                      fontFamily: CustomFont.Poppins,
                      color: couleurs.secondary,
                    }}>
                    Modifier
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
                    fontSize: 15,
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.primary,
                  }}>
                  Besoin d'aide ?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
