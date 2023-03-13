import React, {useRef, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';

import {CustomFont, couleurs} from '../components/color';
import ArrowLeftIcon from '../components/ArrowLeft';
import ArrowRightIcon from '../components/ArrowRight';
import axios from 'axios';
import ApiService from '../components/api/service';
import storage from '../components/api/localstorage';

// ConfigurationDefaultCategorie
export default function ConfigurationDefaultCategorie({
  navigation,
}: {
  navigation: any;
}) {
  const [Stepper, setStepper] = useState(0);

  // LOAD CATEGORIES
  const [sous_categories, setCategories] = useState([]);
  const [selectedPrestation, setSelectedPrestation] = useState<any>({});
  const [sessionEtab, setessionEtab] = useState<any>({});
  const [selectedPrestationPrix, setSelectedPrestationPrix] = useState('');
  const [selectedDuree, setSelectedDuree] = useState('');
  const [selectedProduit, setSelectedProduit] = useState('');
  const [isLoadedCategorie, setLoadedCategorie] = useState(false);


  storage
    .load({
      key: 'userconnected', // Note: Do not use underscore("_") in key!
      id: 'userconnected', // Note: Do not use underscore("_") in id!
    })
    .then(data => {

      if ( data.role != 'ROLE_VENDEUR') {
        navigation.navigate('identification_proprietaire')
      }
      
      setessionEtab(data.etablissement[0]);
    })
    .catch(error => console.log(error));


  const loadCategories = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_CATEGORIES,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;

        console.log(api);
        
        if (api.code == 'success') {
          setLoadedCategorie(true);
          setCategories(api.message);
        }
        if (api.code == 'error') {
          Alert.alert('', 'Erreur survenue');
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('', 'Erreur Network');
      });
  };

  if (!isLoadedCategorie) loadCategories();
  // get and save configuration


  const savePrestation = () => {
    var json = JSON.stringify({
      produit: selectedProduit,
      prix: selectedPrestationPrix,
      duree:selectedDuree,
      sous_categorie_id: selectedPrestation.sous_categorie_id,
      vendeur_id: sessionEtab.id
    })

    console.log(json);
    
    axios({
      method: 'POST',
      url: ApiService.API_URL_ADD_VENDEUR_PRESTATION,
      data: json,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;

        console.log(api);
        
        if (api.code == 'success') {
          navigation.navigate('mes_prestations')
        }
        if (api.code == 'error') {
          Alert.alert('', 'Erreur survenue');
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('', 'Erreur Network');
      });
  }

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
            backgroundColor: couleurs.primary,
          }}>
          <Pressable
            onPress={() =>
              Stepper > 0 ? setStepper(Stepper - 1) : navigation.goBack()
            }>
            <ArrowLeftIcon color={couleurs.white} />
          </Pressable>
          <Text
            style={{
              color: couleurs.white,
              fontSize: 16,
              fontFamily: CustomFont.Poppins,
            }}>
            {Stepper == 0 && 'Choisir une prestation'}
            {Stepper == 1 && selectedPrestation.nom}
          </Text>
        </View>

        <ScrollView
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
            {Stepper == 0 && (
              <View style={{width: '100%', marginTop: 2}}>
                {sous_categories.map((item: any, index: any) => (
                  <View key={index}>
                    <TouchableOpacity onPress={() => {setSelectedPrestation(item), setStepper(1)}}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'space-between',
                          paddingVertical: 16,
                          gap: 10,
                          width: '100%',
                          paddingHorizontal: 20,
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            flex: 1,
                          }}>
                          {/* <WorldIcon /> */}
                          <Text> {item.emoji}</Text>
                          <Text style={{color: 'rgba(100,100,100,1)'}}>
                            {item.nom}
                          </Text>
                        </View>
                        <ArrowRightIcon color={'#ddd'} />
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        height: 1,
                        overflow: 'hidden',
                        paddingHorizontal: 10,
                      }}>
                      <View
                        style={{
                          height: 2,
                          borderWidth: 1,
                          borderColor: '#ddd',
                          borderStyle: 'solid',
                        }}></View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            { Stepper == 1 && <View style={{width:'100%'}}>
               <View
              style={{
                marginVertical: 10,
                backgroundColor: '#fff',
                borderRadius: 11,
                padding: 20,
                width: '100%',
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
                    marginTop:14,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Produit
                </Text>
                <TextInput
                  defaultValue={selectedProduit}
                  onChangeText={input => setSelectedProduit(input) }
                  placeholder='Entrez un produit'
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: couleurs.primary,
                    width: '100%',
                    fontWeight: '600',
                    padding: 0,
                    height:40,
                    fontFamily: CustomFont.Poppins,
                  }}></TextInput>
              </View>
              
              
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
                    marginTop:14,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Prix
                </Text>
                <TextInput
                  defaultValue={selectedPrestationPrix}
                  onChangeText={input => setSelectedPrestationPrix(input) }
                  placeholder='Entrez le prix'
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: couleurs.primary,
                    width: '100%',
                    fontWeight: '600',
                    padding: 0,
                    height:40,
                    fontFamily: CustomFont.Poppins,
                  }}></TextInput>
              </View>

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
                    marginTop:14,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Duree
                </Text>
                <TextInput
                  defaultValue={selectedDuree}
                  onChangeText={input => setSelectedDuree(input) }
                  placeholder='Entrez la duree'
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: couleurs.primary,
                    width: '100%',
                    fontWeight: '600',
                    padding: 0,
                    height:40,
                    fontFamily: CustomFont.Poppins,
                  }}></TextInput>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: couleurs.primary,
                  borderRadius: 30,
                  marginBottom: 20,
                  marginTop:20
                }}>
                <TouchableOpacity
                  
                  style={{
                    paddingHorizontal: 10,
                    width: '70%',
                  }}
                  onPress={() => savePrestation()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 15,
                      fontWeight: '500',
                      color: couleurs.white,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Enregistrer
                  </Text>
                </TouchableOpacity>
              </View>

              
            </View>

            </View> }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
