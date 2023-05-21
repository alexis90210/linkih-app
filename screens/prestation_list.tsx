import React, {useRef, useState, useEffect} from 'react';

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
import {Picker} from '@react-native-picker/picker';
import translations from '../translations/translations';
import secureStorage from '../components/api/secureStorage';


// ConfigurationDefaultCategorie
export default function ConfigurationDefaultCategorie({
  navigation,
}: {
  navigation: any;
}) {
  /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////

  const [preferredLangage, setPreferredLangage] = useState('fr');

  const t = (key: any, langage: any) => {
    return translations[langage][key] || key;
  };

  useEffect(async () => {
    let lang = await secureStorage.getKey('defaultlang')
      if ( lang ) {
        setPreferredLangage(lang);
      } 
  })
 
  const [userConnectedId, SetUserConnectedId] = useState('');

  useEffect(async () =>{
    let _userConnectedId = await secureStorage.getKey('utilisateur')
    if(_userConnectedId) SetUserConnectedId(_userConnectedId)
  })

  //////////////////////////////////////////////////////////////////////////////////////

  const [Stepper, setStepper] = useState(0);

  // LOAD CATEGORIES
  const [sous_categories, setCategories] = useState([]);
  const [selectedPrestation, setSelectedPrestation] = useState<any>({});
  const [sessionEtab, setessionEtab] = useState<any>({});
  const [selectedPrestationPrix, setSelectedPrestationPrix] = useState('');
  const [selectedDuree, setSelectedDuree] = useState('');
  const [selectedProduit, setSelectedProduit] = useState('');
  const [isLoadedCategorie, setLoadedCategorie] = useState(false);

 
    useEffect(async () => {
      let role = await secureStorage.getKey('role')
        if ( role ) {
          SetUserRole(role);

          if (role != 'ROLE_VENDEUR') {
            navigation.navigate('identification_proprietaire');
          }
        }    
    })

    const loadUserData = () => {
      axios({
        method: 'POST',
        url: ApiService.API_URL_USER_DATA,
        data: JSON.stringify({
          id: userConnectedId
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(async (response: { data: any }) => {
          console.log(response)
          if (response.data.code == 'success') {
            setessionEtab(response.data.message.etablissement[0]);
          }
        }).catch(error => console.log(error))
     }
  
     useEffect(() =>{
      loadUserData()
     })


  const loadCategories = () => {
    axios({
      method: 'GET',
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
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  if (!isLoadedCategorie) loadCategories();
  // get and save configuration

  // Select Devise
  const [SelectedDevise, setSelectedDevise] = useState('$');

  const savePrestation = () => {
    var json = JSON.stringify({
      produit: selectedProduit,
      prix: selectedPrestationPrix,
      devise: SelectedDevise,
      duree: selectedDuree,
      sous_categorie_id: selectedPrestation.sous_categorie_id,
      vendeur_id: sessionEtab.id,
    });

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
          navigation.navigate('mes_prestations');
        }
        if (api.code == 'error') {
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
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
            {Stepper == 0 && t('Choisir_une_prestation', preferredLangage)}
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
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedPrestation(item), setStepper(1);
                      }}>
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

            {Stepper == 1 && (
              <View style={{width: '100%'}}>
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
                        color: couleurs.dark,
                        fontSize: 13,
                        height: 30,
                        opacity: 0.85,
                        marginTop: 14,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      {t('Produit', preferredLangage)}
                    </Text>
                    <TextInput
                      defaultValue={selectedProduit}
                      onChangeText={input => setSelectedProduit(input)}
                      placeholder={t('Entrez_un_produit', preferredLangage)}
                      style={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 1,
                        borderBottomColor: '#E2C6BB',
                        color: couleurs.primary,
                        width: '100%',
                        fontWeight: '600',
                        padding: 0,
                        height: 40,
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
                        color: couleurs.dark,
                        fontSize: 13,
                        height: 30,
                        opacity: 0.85,
                        marginTop: 14,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      {t('Prix', preferredLangage)}
                    </Text>
                    <TextInput
                      defaultValue={selectedPrestationPrix}
                      onChangeText={input => setSelectedPrestationPrix(input)}
                      placeholder={t('Entrez_le_prix', preferredLangage)}
                      style={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 1,
                        borderBottomColor: '#E2C6BB',
                        color: couleurs.primary,
                        width: '100%',
                        fontWeight: '600',
                        padding: 0,
                        height: 40,
                        fontFamily: CustomFont.Poppins,
                      }}></TextInput>

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
                      {t('Device', preferredLangage)}
                    </Text>

                    <View
                      style={{
                        borderBottomWidth: 1,
                        width: '100%',
                        height: 40,
                        borderBottomColor: '#E2C6BB',
                        marginTop: 10,
                      }}>
                      <Picker
                        style={{
                          position: 'relative',
                          bottom: 8,
                          fontFamily: CustomFont.Poppins,
                        }}
                        selectedValue={SelectedDevise}
                        onValueChange={(itemValue: any, itemIndex: any) =>
                          setSelectedDevise(itemValue)
                        }>
                        <Picker.Item
                          label={'Dollar ($)'}
                          value={'$'}
                          style={{
                            fontFamily: CustomFont.Poppins,
                            fontSize: 13,
                            color: couleurs.primary,
                          }}
                        />
                        <Picker.Item
                          label={'Euro (€)'}
                          value={'€'}
                          style={{
                            fontFamily: CustomFont.Poppins,
                            fontSize: 13,
                            color: couleurs.primary,
                          }}
                        />
                      </Picker>
                    </View>
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
                        color: couleurs.dark,
                        fontSize: 13,
                        height: 30,
                        opacity: 0.85,
                        marginTop: 14,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      {t('duree_h', preferredLangage)}
                    </Text>
                    <TextInput
                      defaultValue={selectedDuree}
                      onChangeText={input => setSelectedDuree(input)}
                      placeholder={t('entrez_la_duree', preferredLangage)}
                      style={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 1,
                        borderBottomColor: '#E2C6BB',
                        color: couleurs.primary,
                        width: '100%',
                        fontWeight: '600',
                        padding: 0,
                        height: 40,
                        fontFamily: CustomFont.Poppins,
                      }}></TextInput>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: couleurs.primary,
                      borderRadius: 30,
                      marginBottom: 20,
                      marginTop: 20,
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
                          fontSize: 13,
                          fontWeight: '500',
                          color: couleurs.white,
                          fontFamily: CustomFont.Poppins,
                        }}>
                        {t('Enregistrer', preferredLangage)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
