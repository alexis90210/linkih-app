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
  Modal,
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import ImagePicker from 'react-native-image-crop-picker';
import ApiService from '../components/api/service';
import axios from 'axios';
import ArrowLeftIcon from '../components/ArrowLeft';
import RNFS from 'react-native-fs';


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
  const [photOnBase64, setphotOnBase64] = useState('');
  const [photoCoverImage, setPhotoCoverImage] = useState<any>({});
  const [isLoading, setLoading] = useState(false)

  const [imageLink, setImageLink] = useState('')

  // open picker
  const openImagePickerWithCrop = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 500,
      cropping: true,
      mediaType: 'photo'
    }).then(image => {
      console.log(image);
      setPhotoCover(image.path);
      setPhotoCoverImage(image as never);
      return RNFS.readFile(image.path, 'base64');
    }).then(imageBase64 => {
      // Send the image to the server using axios
      setphotOnBase64(imageBase64)
    });
  };


  // Submit proprietaire
  const submitSaveProprietaire = () => {

    setLoading(true)    

    var json = JSON.stringify({
      ...proprietaire,
      photo:photOnBase64
    })

    console.log('/================/',json);
    

    axios({
      method: 'POST',
      url: ApiService.API_URL_CREATE_UTILISATEUR,
      data: json,
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
          
          navigation.navigate('inscription_proprietaire_4', {api: api})
         
        }
        if (api.code == 'error') {
          Alert.alert('Erreur', api.message, [
            {text: 'OK', onPress: () => null},
          ]);
        }
      })
      .catch(error => {
        setLoading(false)
        console.log('/////////////////////////////',error);
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
              <Text style={{color: couleurs.dark, fontFamily:CustomFont.Poppins, marginVertical:40, paddingHorizontal:30, textAlign:'center'}}>
                  {"Cliquez pour selectionner la photo de couverture \nde votre etablissement"}
                </Text>

            <TouchableOpacity
              onPress={() => openImagePickerWithCrop()}
              style={{width: '100%'}}>
              <View
                style={{
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  
                  alignSelf:'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginTop: 10,
                  backgroundColor: 'rgba(200,200, 200, .3)',
                  borderColor: couleurs.primary,
                  height: 230,
                  width: 230,
                  borderRadius:200
                }}>
                {photoCover && (
                  <Image
                    source={{uri: photoCover}}
                    style={{
                      height: 230,
                      width: 230,                      
                      borderRadius:200
                    }}
                  />
                )}
                {!photoCover && (
                  <Text
                    style={{
                      color: couleurs.dark,
                      textAlign: 'center',
                      flexWrap: 'wrap',
                      alignSelf: 'center',
                      paddingHorizontal:30
                    }}>
                    {' '}
                    Tapez pour prendre une photo
                  </Text>
                )}
              </View>

              <Text
                style={{
                  marginVertical: 50,
                  textAlign: 'center',
                  fontFamily: CustomFont.Poppins,
                  color:couleurs.dark,
                  paddingHorizontal:40
                }}>
                En cliquant sur{' '}
                <Text style={{color: couleurs.primary}}>
                  je valide maintenant
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

                  {/* LOADING MODAL */}

        <Modal transparent={true} visible={isLoading}>
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
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
