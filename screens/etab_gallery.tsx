import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Slider,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

import RNFS from 'react-native-fs';
import ArrowLeftIcon from '../components/ArrowLeft';
import {CustomFont, couleurs} from '../components/color';
import ApiService from '../components/api/service';
import axios from 'axios';
import storage from '../components/api/localstorage';
import ShopIcon from '../components/shop';
import ImageCropPicker from 'react-native-image-crop-picker';
import translations from '../translations/translations';
import secureStorage from '../components/api/secureStorage';


export default function Gallerie({
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

  // LOADER
  const [isLoading, setLoading] = useState(false);

  //   GET GALLERIE
  const [gallerie, setGallerie] = useState([]);
  const [isLoadedGallerie, setLoadedGallerie] = useState(false);

  const loadGallerie = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_GALLERIE,
      data: JSON.stringify({
        vendeur_id: route.params.vendeur_id,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        setLoadedGallerie(true);
        if (api.code == 'success') {
          setGallerie(api.message);
        }
        if (api.code == 'error') {
          Alert.alert('', t('erreur_survenue', preferredLangage));
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('', t('erreur_survenue', preferredLangage));
      });
  };

  if (!isLoadedGallerie) loadGallerie();

  // open picker
  const openImagePickerWithCrop = () => {
    ImageCropPicker.openPicker({
      width: 800,
      height: 600,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        return RNFS.readFile(image.path, 'base64');
      })
      .then(imageBase64 => {
        sendImage(imageBase64);
      });
  };

  // SEND TO THE SERVER
  const sendImage = (base64: any) => {
    console.log({
      vendeur_id: route.params.vendeur_id,
      photo: base64,
    });
    setLoading(true);
    axios({
      method: 'POST',
      url: ApiService.API_URL_ADD_PHOTO_GALLERIE,
      data: JSON.stringify({
        vendeur_id: route.params.vendeur_id,
        photo: base64,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        setLoading(false);
        if (api.code == 'success') {
          loadGallerie();
        }
        // if (api.code == 'error') {
        //   Alert.alert('', 'Erreur survenue');
        // }
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false);
        Alert.alert(
          t('Transfert_du_fichier', preferredLangage),
          t('erreur_survenue', preferredLangage),
        );
      });
  };

  // delete modal
  const deleteImage = (row: any) => {
    setLoading(true);
    axios({
      method: 'POST',
      url: ApiService.API_URL_DELETE_PHOTO_GALLERIE,
      data: JSON.stringify({
        photo_id: row.id,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        setLoading(false);
        if (api.code == 'success') {
          loadGallerie();
        }
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false);
        Alert.alert(
          t('Suppression_du_fichier', preferredLangage),
          t('erreur_survenue', preferredLangage),
        );
      });
  };

  // baack
  const definirModal = (row: any) => {
    Alert.alert(
      '',
      t('Choisir_comme_photo_de_couverture', preferredLangage),
      [
        {
          text: t('Oui', preferredLangage),
          onPress: () => {
            photoDecouverture(row);
          },
        },
        {
          text: t('Non_supprimer', preferredLangage),
          onPress: () => {
            deleteImage(row);
          },
        },
      ],
      {cancelable: false},
    );
  };

  //  photo de profil
  const photoDecouverture = (row: any) => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_EDIT_VENDEUR,
      data: JSON.stringify({
        vendeur_id: route.params.vendeur_id,
        photo: row.photo,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        if (api.code == 'success') {
          Alert.alert('', t('Operation_reussie', preferredLangage));
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('', t('erreur_survenue', preferredLangage));
      });
  };

  return (
    <View>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 30,
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: couleurs.primary,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.white} />
          </Pressable>
          <Text
            style={{
              color: couleurs.white,
              fontSize: 16,
              fontFamily: CustomFont.Poppins,
            }}>
            {t('Ma_Gallerie', preferredLangage)}
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            backgroundColor: '#fff',
            alignItems: 'center',
            gap: 10,
            padding: 10,
            justifyContent: 'flex-start',
            width: '100%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => openImagePickerWithCrop()}>
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',

                alignSelf: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: 10,
                backgroundColor: couleurs.white,
                borderColor: couleurs.primary,
                height: 120,
                width: 120,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: couleurs.dark,
                  textAlign: 'center',
                  flexWrap: 'wrap',
                  alignSelf: 'center',
                  paddingHorizontal: 30,
                }}>
                {' '}
                <ShopIcon color={couleurs.primary} />
              </Text>
            </View>
          </TouchableOpacity>

          {isLoading && (
            <View
              style={{
                width: 100,
                height: 100,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'}></ActivityIndicator>
            </View>
          )}
        </View>

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View style={{marginHorizontal: 12, marginVertical: 10}}>
            <View
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'flex-start',
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {gallerie.map((row: any, index: any) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => definirModal(row)}
                  onLongPress={() => deleteImage(row)}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderStyle: 'dashed',

                      alignSelf: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginTop: 10,
                      backgroundColor: 'rgba(200,200, 200, .3)',
                      borderColor: couleurs.primary,
                      height: 120,
                      width: 120,
                      borderRadius: 10,
                    }}>
                    <Image
                      source={{uri: 'data:image/png;base64,' + row.photo}}
                      style={{
                        height: 120,
                        width: 120,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Welcome text */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
