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
  Modal,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import {CustomFont, couleurs} from '../components/color';
import ApiService from '../components/api/service';
import axios from 'axios';
import storage from '../components/api/localstorage';
import translations from '../translations/translations';

export default function MesPrestations({
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

  storage
    .load({
      key: 'defaultlang', // Note: Do not use underscore("_") in key!
      id: 'defaultlang', // Note: Do not use underscore("_") in id!
    })
    .then((data: any) => {
      setPreferredLangage(data);
    });

  //////////////////////////////////////////////////////////////////////////////////////


      
  // LOADER
  const [isLoading, setLoading] = useState(false);

  // GET USER CONNECTED
  const [userConnected, SetUserConnected] = useState<any>({});

  storage
    .load({
      key: 'userconnected', // Note: Do not use underscore("_") in key!
      id: 'userconnected', // Note: Do not use underscore("_") in id!
    })
    .then(data => {
      SetUserConnected(data.etablissement[0]);
    })
    .catch(error => console.log(error));

  //   GET GALLERIE
  const [PrestationsVendeur, setPrestationsVendeur] = useState([]);
  const [isLoadedPrestationsVendeur, setLoadedPrestationsVendeur] =
    useState(false);

  const loadPrestationsVendeur = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_PRODUIT,
      data: JSON.stringify({
        vendeur_id: userConnected.id,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;

        console.log(api);

        if (api.code == 'success') {
          setLoading(false);
          setLoadedPrestationsVendeur(true);
          setPrestationsVendeur(api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('', t('erreur_survenue', preferredLangage));
      });
  };

  if (!isLoadedPrestationsVendeur) loadPrestationsVendeur();

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
            justifyContent: 'space-between',
            gap: 30,
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: couleurs.primary,
            alignItems: 'center',
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
            {t('Mes_Prestations', preferredLangage)}
          </Text>
          <Pressable onPress={() => loadPrestationsVendeur()}>
            <Text
              style={{
                color: '#fff',
                fontSize: 13,
                fontFamily: CustomFont.Poppins,
              }}>
                {t('Actualiser', preferredLangage)}
              </Text>
            </Pressable>
          </View>

          {/* main */}
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{
              backgroundColor: '#f6f6f6f6',
            }}>
            <View style={{marginHorizontal: 12, marginVertical: 10}}>
              {/* LOADING MODAL */}

              <Modal transparent={true} visible={!isLoadedPrestationsVendeur}>
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

              {PrestationsVendeur.map((row: any, key: any) => (
                <View
                  key={key}
                  style={{
                    width: '100%',
                    padding: 15,
                    borderRadius: 10,
                    backgroundColor: couleurs.white,
                    marginBottom: 10,
                    shadowColor: couleurs.primary,
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity:  0.19,
                    shadowRadius: 5.62,
                    elevation: 1
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text style={{fontSize: 13, color: couleurs.dark}}>
                    {t('Produit', preferredLangage)}
                  </Text>
                  <Text style={{color: couleurs.primary, fontSize: 13}}>
                    {row.produit}
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text style={{fontSize: 13, color: couleurs.dark}}>
                    {t('Duree', preferredLangage)}
                  </Text>
                  <Text style={{color: couleurs.primary, fontSize: 13}}>
                    {row.duree} h
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text style={{fontSize: 13, color: couleurs.dark}}>Prix</Text>
                  <Text style={{color: couleurs.primary, fontSize: 13}}>
                    {row.prix} {row.devise}
                  </Text>
                </View>
                
              </View>
            ))}

            {PrestationsVendeur.length == 0 && (
              <>
                <Image
                  source={require('../assets/images/vide.png')}
                  style={{
                    marginTop: 150,
                    width: 150,
                    height: 150,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color:couleurs.dark
                  }}>
                  {t('Aucunes_prestations', preferredLangage)}
                </Text>
              </>
            )}
          </View>

          {/* Welcome text */}
        </ScrollView>

        <View style={{padding: 10}}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: couleurs.primary,
              borderRadius: 30,
            }}
            onPress={() => navigation.navigate('prestations_list')}>
            <Text
              style={{
                textAlign: 'center',
                padding: 10,
                paddingHorizontal: 20,
                fontSize: 13,
                fontWeight: '500',
                color: couleurs.secondary,
                fontFamily: CustomFont.Poppins,
              }}>
              {t('Creer_mes_prestations', preferredLangage)}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
