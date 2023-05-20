import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import ArrowLeftIcon from '../components/ArrowLeft';
import SearchIcon from '../components/search';
import {CustomFont, couleurs} from '../components/color';
import axios from 'axios';
import ApiService from '../components/api/service';
import EyeIcon from '../components/eye';
import CloseIcon from '../components/close';
import MapIcon from '../components/map';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {AirbnbRating} from 'react-native-ratings';
import GetLocation from 'react-native-get-location';
import translations from '../translations/translations';
import storage from '../components/api/localstorage';
import secureStorage from '../components/api/secureStorage';


// ResultatRechercheScreen
export default function ResultatRechercheScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////

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

  /////////////////////////////////////////////////
  
  
  const openMaps = (latitude:any, longitude:any) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const label = 'Linkih';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    })
  
    url ? Linking.openURL(url) : console.log('Plateform not recognize');
  };
  
  // Utilisation
  // openMaps(48.8566, 2.3522); // Ouvre la position de Paris dans Google Maps
  
  
  
  
  /////////////////////////////////////


  var title = route.params.title;

  const [etablissements, setEtablissements] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const _setCloseModal = () => {
    setCloseModal(!closeModal);
  };

  const loadEtablissements = () => {
    axios({
      method: 'GET',
      url: ApiService.API_URL_GET_VENDEURS,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;

        if (api.code == 'success') {
          setLoading(true);
          setEtablissements(api.message.reverse());
        }

        if (api.code == 'error') {
          // Alert.alert('Erreur', api.message, [
          //   {text: 'OK', onPress: () => null},
          // ]);
        }
      })
      .catch((error: any) => {
        console.log(error);
        // Alert.alert('Erreur', error, [{text: 'OK', onPress: () => null}]);
      });
  };

  // SEARCH SALON BY REGION + CATEGORIE
  const searchByCategorie = () => {
    console.log(route.params.currentCategorie);

    axios({
      method: 'GET',
      url: ApiService.API_URL_GET_VENDEURS,
      data: JSON.stringify({
        categorie: route.params.currentCategorie,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.data.code == 'success') {
          if (response.data.message.length > 0) {
            setLoading(true);
            setEtablissements(response.data.message);
            console.log(
              'loaded from search : by cat :',
              response.data.message.length,
            );
          } else {
            setLoading(true)
            Alert.alert(
              'Message',
              t('Aucun_resultat_n_a_ete_trouve', preferredLangage),
              [{text: 'OK', onPress: () => null}],
            );
          }
        } else {
          // Alert.alert('', response.data.message, [
          //   {text: 'OK', onPress: () => null},
          // ]);
        }
      })
      .catch(error => {
        console.log(error);

        // Alert.alert('', 'Erreur Network', [{text: 'OK', onPress: () => null}]);
      });
  };

  // SEARCH BY ETAB
  const searchByEtab = () => {
    console.log(route.params.currentEtablissement);

    axios({
      method: 'GET',
      url: ApiService.API_URL_GET_VENDEURS,
      data: JSON.stringify({
        etablissement: route.params.currentEtablissement,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.data.code == 'success') {
          if (response.data.message.length > 0) {
            setLoading(true);
            setEtablissements(response.data.message);
            console.log(
              'loaded from search : by etab : ',
              response.data.message.length,
            );
          } else {
            Alert.alert(
              'Message',
              t('Aucun_resultat_n_a_ete_trouve', preferredLangage),
              [{text: 'OK', onPress: () => null}],
            );
          }
        } else {
          // Alert.alert('', 'Erreur survenue', [
          //   {text: 'OK', onPress: () => null},
          // ]);
        }
      })
      .catch(error => {
        // Alert.alert('', 'Erreur Network', [{text: 'OK', onPress: () => null}]);
      });
  };

  if (!isLoading) {
    if (route.params?.activateSearch) {
      if (route.params.currentCategorie != undefined) {
        searchByCategorie();
      }
      if (route.params.currentEtablissement != undefined) {
        searchByEtab();
      }
    } else {
      loadEtablissements();
    }
  }

  // user position
  const [myPosition, SetMyPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [myPositionLoaded, SetMyPositionLoaded] = useState(false);
  const getUserPosition = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);

        SetMyPositionLoaded(true);

        SetMyPosition({
          latitude: Number(location.latitude),
          longitude: Number(location.longitude),
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  if (!myPositionLoaded) {
    getUserPosition();
  }

  const distance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    const R = 6371; // rayon de la Terre en kilomètres
    const dLat = ((lat2 - lat1) * Math.PI) / 180; // différence de latitude en radians
    const dLon = ((lon2 - lon1) * Math.PI) / 180; // différence de longitude en radians

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // distance en kilomètres

    if (d < 1) {
      return (d * 1000).toFixed(0) + ' m';
    }

    return d.toFixed(2) + ' km';
  };

  // LOAD RESULT DATA

  var LoadResultatRecherche = ({
    navigation,
    data,
  }: {
    navigation: any;
    data: any;
  }) => {
    const Item = ({prestation}: {prestation: any}) => (
      <>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: CustomFont.Poppins,
              fontSize: 13,
              width: 200,
              color: couleurs.dark,
            }}
            numberOfLines={1}>
            {prestation.nom}
          </Text>
          <Text
            style={{
              fontFamily: CustomFont.Poppins,
              fontSize: 13,
              color: couleurs.primary,
            }}>
            {prestation.prix} {prestation.devise}
          </Text>
        </View>
        <View style={{height: 1, overflow: 'hidden', paddingHorizontal: 10}}>
          <View
            style={{
              height: 1,
              borderWidth: 1,
              borderColor: couleurs.primary,
              borderStyle: 'dashed',
            }}></View>
        </View>
      </>
    );

    return (
    
        <View
          style={{
            borderRadius: 15,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            backgroundColor: '#fff',
            width: '100%',
            marginRight: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              justifyContent: 'flex-start',
            }}>
            <Image
              source={
                data.logo
                  ? {uri: 'data:image/png;base64,' + data.logo}
                  : require('../assets/images/cover.jpg')
              }
              style={{width: '100%', height: 100, borderRadius: 20}}
            />
            <View
              style={{
                paddingHorizontal: 10,
                backgroundColor: couleurs.secondary,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'nowrap',
                  justifyContent: 'flex-start',
                  paddingTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: couleurs.dark,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  {data.nom}
                </Text>

                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color: couleurs.dark,
                    alignContent: 'center',
                  }}>
                  <AirbnbRating
                    reviewSize={4}
                    reviewColor={couleurs.primary}
                    showRating={false}
                    count={4}
                    reviews={['Terrible', 'Bad', 'Good', 'Very Good']}
                    onFinishRating={(rate: any) => console.log(rate)}
                    defaultRating={data.note}
                    size={14}
                  />{' '}
                  ({data.note})
                </Text>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color: couleurs.dark,
                  }}>
                  {data.categorie} .{' '}
                  <Text style={{color: couleurs.primary}}>
                    {distance(
                      Number(data.latitude),
                      Number(data.longitude),
                      Number(myPosition.latitude),
                      Number(myPosition.longitude),
                    )}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color: couleurs.dark,
                    marginBottom: 3,
                  }}>
                  {/* {marker.adresse} */}
                  <Text style={{color: 'green'}}>Ouvert</Text> . Ferme a 18:00
                </Text>

                {data.prestations &&
                  data.prestations.map((row: any, key: any) => (
                    <Item key={key} prestation={row} />
                  ))}

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-start',
                    gap: 10,
                    marginVertical: 14,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: couleurs.primary,
                      borderRadius: 30,
                      marginBottom: 20,
                      width: 120,
                      height: 31,
                    }}>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 10,
                        position: 'relative',
                        bottom: 2,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      onPress={() => {
                        openMaps(Number(data.latitude) , Number(data.longitude))
                       
                      }}>
                      <Image
                        source={require('../assets/images/itinary.png')}
                        style={{width: 15, height: 15}}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          padding: 5,
                          fontSize: 13,
                          color: couleurs.white,
                          fontFamily: CustomFont.Poppins,
                        }}>
                        {t('Itineraire', preferredLangage)}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      borderRadius: 30,
                      marginBottom: 20,
                      width: 120,
                      height: 31,
                      borderWidth: 1,
                      borderColor: couleurs.primary,
                    }}>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 10,
                        position: 'relative',
                        bottom: 2,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      onPress={() => Linking.openURL(`tel:${data.mobile}`)}>
                      <Image
                        source={require('../assets/images/telephone.png')}
                        style={{width: 18, height: 18}}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          padding: 5,
                          fontSize: 13,
                          color: couleurs.primary,
                          fontFamily: CustomFont.Poppins,
                        }}>
                        {t('Appeler', preferredLangage)}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('autre_etab', {
                          nomEtab: data.nom,
                          vendeur_data: data,
                        })
                      }>
                      <EyeIcon color={couleurs.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f6f6f6f6',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 30,
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: couleurs.primary,
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 20,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeftIcon color={couleurs.white} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('map')}>
              <MapIcon color={couleurs.white} />
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft: 30, flex: 1}}>
            <Text
              style={{color: couleurs.white, fontSize: 18, fontWeight: '700'}}>
              {title}
            </Text>
          </View>

          <TouchableOpacity onPress={() => _setCloseModal()}>
            <SearchIcon color={couleurs.white} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              gap: 20,
              paddingHorizontal: 10,
              marginTop: 15,
              marginBottom: 40,
            }}>
            {!isLoading && (
              <View style={{marginTop: 100}}>
                <ActivityIndicator
                  color={couleurs.primary}
                  style={{alignSelf: 'center'}}
                  size={'large'}></ActivityIndicator>
              </View>
            )}
            {etablissements.map((prop, key) => {
              return (
                <LoadResultatRecherche
                  key={key}
                  data={prop}
                  navigation={navigation}
                />
              );
            })}

{etablissements.length == 0 && (
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
                  {t('aucun_etab', preferredLangage)}
                </Text>
              </>
            )}
          </View>
        </ScrollView>

        {/* MODAL FILTRE */}
        <Modal visible={closeModal}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 30,
              paddingVertical: 15,
              paddingHorizontal: 10,
              backgroundColor: couleurs.primary,
            }}>
            <Text
              style={{
                fontFamily: CustomFont.Poppins,
                color: couleurs.white,
                fontSize: 18,
              }}>
              {t('Filtres', preferredLangage)}
            </Text>

            <TouchableOpacity
              onPress={() => _setCloseModal()}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              <CloseIcon color={couleurs.white} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              padding: 10,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontFamily: CustomFont.Poppins,
                  color: couleurs.dark,
                }}>
                {t('Trier_par', preferredLangage)}
              </Text>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.dark,
                  }}>
                  {t('Les_plus_proches', preferredLangage)}
                </Text>
                <BouncyCheckbox
                  size={20}
                  fillColor={couleurs.primary}
                  unfillColor={couleurs.white}
                  iconStyle={{borderColor: couleurs.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{fontFamily: CustomFont.Poppins}}
                  onPress={(isChecked: boolean) => {}}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.dark,
                  }}>
                  {t('Les_mieux_notes', preferredLangage)}
                </Text>
                <BouncyCheckbox
                  size={20}
                  fillColor={couleurs.primary}
                  unfillColor={couleurs.white}
                  iconStyle={{borderColor: couleurs.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{fontFamily: CustomFont.Poppins}}
                  onPress={(isChecked: boolean) => {}}
                />
              </View>

              {/* SEPARATEUR */}
              <View style={{height: 1, overflow: 'hidden', width: '100%'}}>
                <View
                  style={{
                    height: 1,
                    borderWidth: 1,
                    borderColor: couleurs.primary,
                    borderStyle: 'dashed',
                  }}></View>
              </View>
              {/* SEPARATEUR */}

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.dark,
                    fontWeight: 'bold',
                  }}>
                  {t('A_moins_de_10_km', preferredLangage)}
                </Text>
                <BouncyCheckbox
                  size={20}
                  fillColor={couleurs.primary}
                  unfillColor={couleurs.white}
                  iconStyle={{borderColor: couleurs.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{fontFamily: CustomFont.Poppins}}
                  onPress={(isChecked: boolean) => {}}
                />
              </View>

              {/* SEPARATEUR */}
              <View style={{height: 1, overflow: 'hidden', width: '100%'}}>
                <View
                  style={{
                    height: 1,
                    borderWidth: 1,
                    borderColor: couleurs.primary,
                    borderStyle: 'dashed',
                  }}></View>
              </View>
              {/* SEPARATEUR */}

              <Text
                style={{
                  fontWeight: '700',
                  fontFamily: CustomFont.Poppins,
                  color: couleurs.dark,
                }}>
                {t('Trier_par_Prix', preferredLangage)}
              </Text>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.dark,
                  }}>
                  {t('Moins_de', preferredLangage)} 60 €
                </Text>
                <BouncyCheckbox
                  size={20}
                  fillColor={couleurs.primary}
                  unfillColor={couleurs.white}
                  iconStyle={{borderColor: couleurs.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{fontFamily: CustomFont.Poppins}}
                  onPress={(isChecked: boolean) => {}}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.dark,
                  }}>
                  {t('Moins_de', preferredLangage)} 100 €
                </Text>
                <BouncyCheckbox
                  size={20}
                  fillColor={couleurs.primary}
                  unfillColor={couleurs.white}
                  iconStyle={{borderColor: couleurs.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{fontFamily: CustomFont.Poppins}}
                  onPress={(isChecked: boolean) => {}}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.dark,
                  }}>
                  {t('Plus_de', preferredLangage)} 100 €
                </Text>
                <BouncyCheckbox
                  size={20}
                  fillColor={couleurs.primary}
                  unfillColor={couleurs.white}
                  iconStyle={{borderColor: couleurs.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{fontFamily: CustomFont.Poppins}}
                  onPress={(isChecked: boolean) => {}}
                />
              </View>

              {/* SEPARATEUR */}
              <View style={{height: 1, overflow: 'hidden', width: '100%'}}>
                <View
                  style={{
                    height: 1,
                    borderWidth: 1,
                    borderColor: couleurs.primary,
                    borderStyle: 'dashed',
                  }}></View>
              </View>
              {/* SEPARATEUR */}

              <Text
                style={{
                  fontWeight: '700',
                  fontFamily: CustomFont.Poppins,
                  color: couleurs.dark,
                }}>
                {t('Note_minimum', preferredLangage)}
              </Text>

              <AirbnbRating
                reviewSize={5}
                reviewColor={couleurs.primary}
                showRating={false}
                count={5}
                reviews={['Terrible', 'Bad', 'Good', 'Very Good']}
                onFinishRating={rate => console.log(rate)}
                defaultRating={0}
                size={14}
              />

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <View>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontFamily: CustomFont.Poppins,
                      color: couleurs.dark,
                    }}>
                    {t('Nouveau_salon', preferredLangage)}
                  </Text>
                  <Text style={{color: couleurs.primary}}>
                    {t('Etablissement_Restaurant', preferredLangage)}
                  </Text>
                </View>
                <BouncyCheckbox
                  size={20}
                  fillColor={couleurs.primary}
                  unfillColor={couleurs.white}
                  iconStyle={{borderColor: couleurs.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{fontFamily: CustomFont.Poppins}}
                  onPress={(isChecked: boolean) => {}}
                />
              </View>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: couleurs.primary,
                  borderRadius: 30,
                  height: 45,
                  marginTop: 50,
                  width: '100%',
                }}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    width: '100%',
                  }}
                  onPress={() => _setCloseModal()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 13,
                      color: couleurs.secondary,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    {t('APPLIQUER', preferredLangage)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}
