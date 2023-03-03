import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import ImagePicker from 'react-native-image-crop-picker';
import ApiService from '../components/api/service';
import axios from 'axios';
import ArrowLeftIcon from '../components/ArrowLeft';

// InscriptionProprietaire3
export default function InscriptionProprietaire3({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  var proprietaire = route.params;

  const [photoCover, setPhotoCover] = useState('');
  const [photoCoverImage, setPhotoCoverImage] = useState('');
  const [isLoading, setLoading] = useState(false)

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

  const submitSaveProprietaire = () => {

    setLoading(true)

    axios({
      method: 'POST',
      url: ApiService.API_URL_CREATE_UTILISATEUR,
      data: JSON.stringify(proprietaire),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      })
      .then((response: {data: any}) => {
        console.log(response.data);
      

        var api = response.data;
        console.log(api);

        setLoading(false)

        if (api.code == 'success') {
          Alert.alert(
            'SUCCES',
            `Votre compte a bien ete cree, veuillez vous connecter . \nVotre login est : ${api.login}`,
            [
              {
                text: 'Continuer',
                onPress: () =>
                  navigation.navigate('inscription_proprietaire_4', {api: api}),
              },
            ],
          );
        }
        if (api.code == 'error') {
          Alert.alert('Erreur', api.message, [
            {text: 'OK', onPress: () => null},
          ]);
        }
      })
      .catch(error => {
        setLoading(false)
        console.log(error);
        Alert.alert(
          'Erreur',
          'Erreur survenue, il se pourrait que les informations fournis soit incorrects ou deja utilise pour un autre compte',
          [{text: 'OK', onPress: () => null}],
        );
      });
  };

  const nextPage = () => {
    submitSaveProprietaire();
  };

  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
        }}>
          <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 30,
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor:couleurs.primary,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.white} />
          </TouchableOpacity>
          <Text style={{color: couleurs.white, fontSize: 16, fontFamily: CustomFont.Poppins}}>
            Image de couverture
          </Text>
        </View>

        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <TouchableOpacity
              onPress={() => openImagePickerWithCrop()}
              style={{width: '100%'}}>
              <View
                style={{
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  // padding: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginTop: 10,
                  backgroundColor: 'rgba(200,200, 200, .3)',
                  borderColor: couleurs.primary,
                  height: 180,
                  width: '100%',
                  borderRadius:20
                }}>
                {photoCover && (
                  <Image
                    source={{uri: photoCover}}
                    style={{
                      height: 180,
                      width: '100%',
                      borderRadius:20
                    }}
                  />
                )}
                {!photoCover && (
                  <Text
                    style={{
                      color: couleurs.dark,
                      textAlign: 'center',
                      width: 300,
                      flexWrap: 'wrap',
                      alignSelf: 'center',
                    }}>
                    {' '}
                    Tapez pour selectionner une image depuis votre gallerie
                  </Text>
                )}
              </View>

              <Text
                style={{
                  marginVertical: 50,
                  textAlign: 'center',
                  fontFamily: CustomFont.Poppins,
                }}>
                En cliquant sur{' '}
                <Text style={{color: couleurs.primary}}>
                  je valide mainteant
                </Text>
                , vous acceptez les termes et les conditions d'utilisations ,
                ainsi que la politique de confidentialites de{' '}
                <Text style={{color: couleurs.primary}}>Linkih</Text> .
              </Text>
            </TouchableOpacity>

            

            <View
              style={{
                marginVertical: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: couleurs.primary,
                borderRadius: 30,
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  width: '80%',
                }}
                onPress={() => nextPage()}>
                <Text
                  style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontWeight: '500',
                    color: couleurs.secondary,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                  }}>                   
                    Je valide maintenant
                  
                </Text>
              </TouchableOpacity>              
            </View>

            {isLoading && <ActivityIndicator size="large" color={couleurs.primary} />}

            
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
