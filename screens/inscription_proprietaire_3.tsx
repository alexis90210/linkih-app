import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { couleurs } from '../components/color';
import ImagePicker from 'react-native-image-crop-picker';


// InscriptionProprietaire3
export default function InscriptionProprietaire3({navigation, route}: {navigation: any, route: any}) {
  
  var proprietaire = route.params;

  const [photoCover, setPhotoCover] = useState("");
  const [photoCoverImage, setPhotoCoverImage] = useState("");

  const openImagePickerWithCrop = () => {
    ImagePicker.openPicker({
      width: 900,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setPhotoCover(image.path)
      setPhotoCoverImage(image as never)
    });
  }


  const nextPage = () => {
    navigation.navigate('inscription_proprietaire_4', 
    {
      payload: proprietaire,
      image: photoCoverImage
    }
    )
  }

  
  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
        }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding:10
            }}>
            
          

          <TouchableOpacity onPress={() => openImagePickerWithCrop()} style={{width:'100%'}}>
          <View style={{borderWidth:1, borderStyle:'dashed', 
          padding:10,
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          marginTop:10,
          backgroundColor: 'rgba(200,200, 200, .3)',
          borderColor:couleurs.primary, height:180, width:'100%'}}>
          {photoCover && <Image
          source={{uri:photoCover}}
          style={{
            height: 160,
            width: '100%',
          }}/>}
          {!photoCover && <Text style={{color:couleurs.dark, textAlign:'center', width:300, flexWrap:'wrap', alignSelf:'center'}}> Tapez pour selectionner une image depuis votre gallerie</Text>}
          </View>
          </TouchableOpacity>
            
            <View
              style={{
                marginVertical: 70,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#7B4C7A' ,borderRadius: 30,
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                }}
                onPress={() => nextPage()}>
                <Text
                  style={{
                    textAlign: 'center',

                    fontWeight: '500',
                    color: couleurs.secondary,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    width: 150,
                  }}>
                  Valider
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
