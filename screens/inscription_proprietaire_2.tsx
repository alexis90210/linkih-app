import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  Alert,
  Linking,
  PermissionsAndroid
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import storage from '../components/api/localstorage';

import MapboxGL from '@rnmapbox/maps';
import ApiService from '../components/api/service';
import defaultStyle from '../components/api/defaultMpaStyle';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import secureStorage from '../components/api/secureStorage';


import ArrowLeftIcon from '../components/ArrowLeft';
import translations from '../translations/translations';

MapboxGL.setAccessToken(ApiService.MAPBOX_GL_TOKEN);


// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission de localiser votre position',
        message: 'Pouvons-nous accéder à votre emplacement?',
        buttonNeutral: 'Demande moi plus tard',
        buttonNegative: 'Annuler',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
// InscriptionProprietaireScreen2
export default function InscriptionProprietaireScreen2({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  console.log(route.params);

  var type = '';
  storage
    .load({
      key: 'typeuser', // Note: Do not use underscore("_") in key!
      id: 'typeuser', // Note: Do not use underscore("_") in id!
    })
    .then(data => {
      type = data.type;
    })
    .catch(error => {
      console.log(error);
    });

  /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////////

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

  const [stepper, setStepper] = useState(0);
  const [selectedCategorie, setSelectedCategorie] = useState<any>({});

  // Horaire debut
  const [selectedHoraireOuvertureLundi, setSelectedHoraireOuvertureLundi] =
    useState('');
  const [selectedHoraireOuvertureMardi, setSelectedHoraireOuvertureMardi] =
    useState('');
  const [
    selectedHoraireOuvertureMercredi,
    setSelectedHoraireOuvertureMercredi,
  ] = useState('');
  const [selectedHoraireOuvertureJeudi, setSelectedHoraireOuvertureJeudi] =
    useState('');
  const [
    selectedHoraireOuvertureVendredi,
    setSelectedHoraireOuvertureVendredi,
  ] = useState('');
  const [selectedHoraireOuvertureSamedi, setSelectedHoraireOuvertureSamedi] =
    useState('');
  const [
    selectedHoraireOuvertureDimanche,
    setSelectedHoraireOuvertureDimanche,
  ] = useState('');

  // Horaire fin
  const [selectedHoraireFermetureLundi, setSelectedHoraireFermetureLundi] =
    useState('');
  const [selectedHoraireFermetureMardi, setSelectedHoraireFermetureMardi] =
    useState('');
  const [
    selectedHoraireFermetureMercredi,
    setSelectedHoraireFermetureMercredi,
  ] = useState('');
  const [selectedHoraireFermetureJeudi, setSelectedHoraireFermetureJeudi] =
    useState('');
  const [
    selectedHoraireFermetureVendredi,
    setSelectedHoraireFermetureVendredi,
  ] = useState('');
  const [selectedHoraireFermetureSamedi, setSelectedHoraireFermetureSamedi] =
    useState('');
  const [
    selectedHoraireFermetureDimanche,
    setSelectedHoraireFermetureDimanche,
  ] = useState('');

  MapboxGL.setTelemetryEnabled(false);

  var social = {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: '',
    tiktok: '',
  };

  // INIT
  var horaires: { jour: string; ouverture: string; fermeture: string; }[] = [];
  horaires.push({
    jour: 'Lundi',
    ouverture: selectedHoraireOuvertureLundi,
    fermeture: selectedHoraireFermetureLundi,
  });

  horaires.push({
    jour: 'Mardi',
    ouverture: selectedHoraireOuvertureMardi,
    fermeture: selectedHoraireFermetureMardi,
  });

  horaires.push({
    jour: 'Mercredi',
    ouverture: selectedHoraireOuvertureMercredi,
    fermeture: selectedHoraireFermetureMercredi,
  });

  horaires.push({
    jour: 'Jeudi',
    ouverture: selectedHoraireOuvertureJeudi,
    fermeture: selectedHoraireFermetureJeudi,
  });

  horaires.push({
    jour: 'Vendredi',
    ouverture: selectedHoraireOuvertureVendredi,
    fermeture: selectedHoraireFermetureVendredi,
  });

  horaires.push({
    jour: 'Samedi',
    ouverture: selectedHoraireOuvertureSamedi,
    fermeture: selectedHoraireFermetureSamedi,
  });

  horaires.push({
    jour: 'Dimanche',
    ouverture: selectedHoraireOuvertureDimanche,
    fermeture: selectedHoraireFermetureDimanche,
  });

  // LOAD CATEGORIES
  const [sous_categories, setCategories] = useState([]);
  const [isLoadedCategorie, setLoadedCategorie] = useState(false);

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
        if (api.code == 'success') {
          setLoadedCategorie(true);
          setCategories(api.message);
        }
        if (api.code == 'error') {
          // Alert.alert('', t('erreur_survenue', preferredLangage));
          console.log('erreur_survenue;;;;', api.message);
        }
      })
      .catch((error: any) => {
        // console.log(error);
        // Alert.alert('', t('erreur_survenue', preferredLangage));
      });
  };

  if (!isLoadedCategorie) loadCategories();

  var etablissement = route.params?.etablissement;
  etablissement.postcode = '';
  etablissement.sciem = '';
  etablissement.nom_prenom_responsable = '';
  etablissement.poste_occupe = '';
  
  const [sciem, setSciem] = useState('');
  const [nom_prenom_responsable, setNPR] = useState('');
  const [poste_occupe, setPO] = useState('');

  storage
    .load({
      key: 'configuration', // Note: Do not use underscore("_") in key!
      id: 'configuration', // Note: Do not use underscore("_") in id!
    })
    .then(data => {
      etablissement.langue = data.langage.name;
      etablissement.pays = data.pays.name;
    });

  const nextPage = () => {
    console.log(stepper);

    if (stepper == 4) {
      // redirect to new route
      
      navigation.navigate('inscription_proprietaire_3', {
        etablissement: etablissement,
        categorie: selectedCategorie.sous_categorie_id,
        horaires: horaires,
        social: social,
        abonnementSelected: abonnementSelected,
      });
    } else {
      if (stepper == 0) {
        // if (etablissement.sciem) {
        //   Alert.alert(
        //     '',
        //     t('Le_SIRET_de_l_entreprise_est_trop_court', preferredLangage),
        //     [{text: 'OK', onPress: () => null}],
        //   );
        //   return;
        // }

        if (!etablissement.nom_prenom_responsable) {
          Alert.alert(
            '',
            t('Le_champ_poste_du_responsable_est_trop_court', preferredLangage),
            [{text: 'OK', onPress: () => null}],
          );
          return;
        }

        if (!etablissement.poste_occupe) {
          Alert.alert(
            '',
            t('Le_champ_poste_du_responsable_est_trop_court', preferredLangage),
            [{text: 'OK', onPress: () => null}],
          );
          return;
        }
      }

      // formating horaire
      horaires.push({
        jour: 'Lundi',
        ouverture: selectedHoraireOuvertureLundi,
        fermeture: selectedHoraireFermetureLundi,
      });

      horaires.push({
        jour: 'Mardi',
        ouverture: selectedHoraireOuvertureMardi,
        fermeture: selectedHoraireFermetureMardi,
      });

      horaires.push({
        jour: 'Mercredi',
        ouverture: selectedHoraireOuvertureMercredi,
        fermeture: selectedHoraireFermetureMercredi,
      });

      horaires.push({
        jour: 'Jeudi',
        ouverture: selectedHoraireOuvertureJeudi,
        fermeture: selectedHoraireFermetureJeudi,
      });

      horaires.push({
        jour: 'Vendredi',
        ouverture: selectedHoraireOuvertureVendredi,
        fermeture: selectedHoraireFermetureVendredi,
      });

      horaires.push({
        jour: 'Samedi',
        ouverture: selectedHoraireOuvertureSamedi,
        fermeture: selectedHoraireFermetureSamedi,
      });

      horaires.push({
        jour: 'Dimanche',
        ouverture: selectedHoraireOuvertureDimanche,
        fermeture: selectedHoraireFermetureDimanche,
      });

      setStepper(stepper + 1);
    }
  };

  const [startCords, setstartCords] = useState([0, 0]);
  const [isLoaded, setLoaded] = useState(false);

  const [adresse, setAdresse] = useState('');
  const [postcode, setPCode] = useState('');


 

  useEffect(() =>{
    const rep = requestLocationPermission();
    rep.then(res =>{
      if (res) {
        Geolocation.getCurrentPosition(info => {
          let lon = Number(info.coords.longitude);
          let lat = Number(info.coords.latitude);

            setstartCords([lon, lat]);
          _onDragGetAdresse(lon, lat);
        },
        
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
           
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        navigation.goBack()
      }
    })
    
  })

  const _onDragGetAdresse = (lon: number, lat: number) => {
    axios({
      method: 'GET',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?limit&types=address%2Cpostcode&access_token=${ApiService.MAPBOX_GL_TOKEN}`,
    })
      .then(response => {
        etablissement.postcode = response.data.features[1].text;
        etablissement.adresse = response.data.features[1].place_name;

        setAdresse(response.data.features[1].place_name);
        setPCode(response.data.features[1].text);

        console.log(adresse, postcode);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  ///////////////////////////////////////////////////
  const [visible, setVisible] = useState(false);

  const onConfirm = ({hours, minutes}: {hours: any; minutes: any}) => {
    setVisible(false);
    console.log({hours, minutes});
  };

  // load abonnement
  const [abonnements, setAbonnements] = useState<any>([]);
  const [abonnementSelected, setAbonnementSelected] = useState<any>({});
  const [isLoadingAbonnement, setIsLoadingAbonnement] = useState(false);

  const loadAbonnementList = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_LISTE_ABONNEMENTS,
      data: JSON.stringify({
        type: type,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        setIsLoadingAbonnement(true);

        if (api.code == 'success') {
          setAbonnements(api.message);
        }
        if (api.code == 'error') {
        }
      })
      .catch((error: any) => {
        console.log(error);
        setIsLoadingAbonnement(true);
      });
  };

  if (!isLoadingAbonnement) loadAbonnementList();

  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f6f6f6f6',
        }}>
        {stepper != 1 && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              gap: 30,
              paddingVertical: 10,
              paddingHorizontal: 10,
              backgroundColor: couleurs.primary,
              marginBottom: 15,
            }}>
            <Pressable
              onPress={() => {
                stepper > 0 ? setStepper(stepper - 1) : navigation.goBack();
              }}>
              <ArrowLeftIcon color={couleurs.white} />
            </Pressable>
            <Text
              style={{
                color: couleurs.white,
                fontSize: 16,
                fontFamily: CustomFont.Poppins,
              }}>
              {stepper == 0 &&
                t('Information_du_responsable', preferredLangage)}
              {stepper == 2 && t('Choisir_une_categorie', preferredLangage)}
              {stepper == 3 && t('Lien_reseaux_sociaux', preferredLangage)}
              {stepper == 4 && t('choix_abonnement', preferredLangage)}
            </Text>
          </View>
        )}
        {/* Adresse de l'etablissement */}
        {stepper == 1 && (
          <View style={{height: Dimensions.get('window').height}}>
            <View
              style={{
                height: Dimensions.get('window').height,
              }}>
              <MapboxGL.MapView
                style={styles.map}
                styleJSON={JSON.stringify(defaultStyle)}
                zoomEnabled={true}
                pitchEnabled={true}
                onPress={e => null}
                onRegionIsChanging={e => null}
                surfaceView={true}
                rotateEnabled={true}
                scrollEnabled={true}>
                <MapboxGL.Camera
                  zoomLevel={15}
                  centerCoordinate={startCords}
                  followUserLocation={true}
                />

                <MapboxGL.PointAnnotation
                  id={'marker'}
                  coordinate={startCords}
                  draggable
                  onDragEnd={(e: any) => {
                    _onDragGetAdresse(
                      e.geometry.coordinates[0],
                      e.geometry.coordinates[1],
                    );
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    <View
                      style={{
                        alignSelf: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#eee',
                          borderRadius: 50,
                          width: 60,
                          height: 60,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignContent: 'center',
                          padding: 10,
                          borderWidth: 2,
                          borderColor: couleurs.primary,
                        }}>
                        <Image
                          source={require('../assets/images/salon-de-coiffure.png')}
                          style={{
                            width: 20,
                            height: 20,
                            marginLeft: 10,
                          }}></Image>
                      </View>
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          alignSelf: 'center',
                          backgroundColor: '#eee',
                          borderRadius: 50,
                          borderWidth: 2,
                          padding: 4,
                          borderColor: couleurs.primary,
                        }}></View>
                    </View>
                  </View>
                </MapboxGL.PointAnnotation>
              </MapboxGL.MapView>
            </View>

            <View
              style={{
                borderRadius: 100,
                backgroundColor: couleurs.primary,
                padding: 10,
                margin: 4,
                position: 'absolute',
                top: 10,
                left: 10,
              }}>
              <Pressable onPress={() => setStepper(0)}>
                <ArrowLeftIcon color={'#fff'} />
              </Pressable>
            </View>

            <View
              style={{
                position: 'absolute',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: couleurs.white,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: 20,
                zIndex: 100,
                height: 250,
              }}>
              <TextInput
                defaultValue={adresse}
                placeholderTextColor={couleurs.dark}
                onChangeText={input => (etablissement.adresse = input)}
                placeholder={t('entrez_votre_adresse', preferredLangage)}
                style={{
                  backgroundColor: 'transparent',
                  borderBottomWidth: 1,
                  borderBottomColor: couleurs.primaryLight,
                  color: couleurs.primary,
                  width: '100%',
                  padding: 0,
                  fontSize: 13,
                  paddingVertical: 10,
                  marginTop: 10,
                  fontFamily: CustomFont.Poppins,
                }}></TextInput>

              <TextInput
                defaultValue={postcode}
                placeholderTextColor={couleurs.dark}
                onChangeText={input => (etablissement.postcode = input)}
                placeholder={t('Entrez_votre_code_postal', preferredLangage)}
                keyboardType="numeric"
                style={{
                  backgroundColor: 'transparent',
                  borderBottomWidth: 1,
                  borderBottomColor: couleurs.primaryLight,
                  color: couleurs.primary,
                  width: '100%',
                  padding: 0,
                  paddingVertical: 10,
                  marginTop: 10,
                  fontSize: 13,
                  fontFamily: CustomFont.Poppins,
                }}></TextInput>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: couleurs.primary,
                  borderRadius: 30,
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    width: '70%',
                  }}
                  onPress={() => nextPage()}>
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
                    {t('Confirmez_l_adressse', preferredLangage)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          {/* Informations privees */}
          {stepper == 0 && (
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
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: couleurs.dark,
                      fontSize: 13,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    SIRET
                  </Text>
                  <TextInput
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder={t('Entrez_le_SIRET', preferredLangage)}
                    defaultValue={sciem}
                    onChangeText={input => (etablissement.sciem = input)}
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: couleurs.primary,
                      color: couleurs.primary,
                      width: '100%',
                      fontFamily: CustomFont.Poppins,
                      paddingHorizontal: 0,
                      paddingVertical: 5,
                    }}></TextInput>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: couleurs.dark,
                      fontSize: 13,
                      marginVertical: 8,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    {t('Noms_prenoms_du_responsable', preferredLangage)}
                  </Text>
                  <TextInput
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder={t(
                      'Noms_prenoms_du_responsable',
                      preferredLangage,
                    )}
                    defaultValue={nom_prenom_responsable}
                    onChangeText={input =>
                      (etablissement.nom_prenom_responsable = input)
                    }
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: couleurs.primary,
                      color: couleurs.primary,
                      width: '100%',
                      fontFamily: CustomFont.Poppins,
                      paddingHorizontal: 0,
                      paddingVertical: 5,
                    }}></TextInput>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: couleurs.dark,
                      fontSize: 13,
                      marginVertical: 8,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    {t('Poste_du_responsable', preferredLangage)}
                  </Text>
                  <TextInput
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder={t('Poste_du_responsable', preferredLangage)}
                    defaultValue={poste_occupe}
                    onChangeText={input => (etablissement.poste_occupe = input)}
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: couleurs.primary,
                      color: couleurs.primary,
                      width: '100%',
                      fontFamily: CustomFont.Poppins,
                      paddingHorizontal: 0,
                      paddingVertical: 5,
                    }}></TextInput>
                </View>
              </View>
            </View>
          )}

          {/* Categories selectionnees */}
          {stepper == 2 && (
            <View>
              <View style={{marginHorizontal: 10}}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontSize: 13,
                    paddingVertical: 20,
                    color: couleurs.dark,
                    paddingHorizontal: 30,
                  }}>
                  {t(
                    'Veuillez_selectionner_la_categorie_qui_decrit_le_mieux_votre_etablissement',
                    preferredLangage,
                  )}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 10,
                    paddingHorizontal: 5,
                    marginTop: 15,
                  }}>
                  {sous_categories.map((row: any, index: any) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedCategorie(row), setStepper(3);
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 4,
                          backgroundColor: couleurs.primary,
                          padding: 5,
                          paddingHorizontal: 15,
                          borderRadius: 50,
                          alignItems: 'center',
                          width: 'auto',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            padding: 6,
                            borderRadius: 50,
                          }}>
                          <Text
                            style={{
                              color: couleurs.white,
                              fontFamily: CustomFont.Poppins,
                            }}>
                            {preferredLangage == 'fr' ? row.nom : row.en_nom}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/*  Lien reseaux sociaux */}
          {stepper == 3 && (
            <View>
              <View style={{padding: 10}}>
                {/* FACEBOOK */}
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginBottom: 4,
                    borderBottomWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: couleurs.primary,
                  }}>
                  {/* <Text
                    style={{
                      paddingVertical: 10,
                      marginHorizontal: 23,
                      color: couleurs.primary,
                      borderBottomWidth: 1,
                      borderColor: '#ddd',
                      fontSize: 13,
                    }}>
                    Facebook
                  </Text> */}
                  <View
                    style={{
                      paddingLeft: 20,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../assets/social/facebook.png')}
                    />

                    <TextInput
                      style={{
                        color: couleurs.primary,
                        fontFamily: CustomFont.Poppins,
                        flex: 1,
                        fontSize: 13,
                      }}
                      defaultValue={social.facebook}
                      onChangeText={input => (social.facebook = input)}
                      placeholderTextColor={'rgba(100,100,100,.7)'}
                      placeholder={t(
                        'Entrez_le_lien_de_votre_page_Facebook',
                        preferredLangage,
                      )}></TextInput>
                  </View>
                </View>

                {/* TWITTER */}
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginBottom: 4,
                    borderBottomWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: couleurs.primary,
                  }}>
                  {/* <Text
                    style={{
                      paddingVertical: 10,
                      marginHorizontal: 23,
                      color: couleurs.primary,
                      borderBottomWidth: 1,
                      borderColor: '#ddd',
                      fontSize: 13,
                    }}>
                    Twitter
                  </Text> */}
                  <View
                    style={{
                      paddingLeft: 20,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../assets/social/twitter.png')}
                    />
                    <TextInput
                      style={{
                        color: couleurs.primary,
                        fontFamily: CustomFont.Poppins,
                        flex: 1,
                        fontSize: 13,
                      }}
                      defaultValue={social.twitter}
                      onChangeText={input => (social.twitter = input)}
                      placeholderTextColor={'rgba(100,100,100,.7)'}
                      placeholder={t(
                        'Entrez_le_lien_de_votre_compte_Twitter',
                        preferredLangage,
                      )}></TextInput>
                  </View>
                </View>

                {/* LINKEDIN */}
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginBottom: 4,
                    borderBottomWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: couleurs.primary,
                  }}>
                  {/* <Text
                    style={{
                      paddingVertical: 10,
                      marginHorizontal: 23,
                      color: couleurs.primary,
                      borderBottomWidth: 1,
                      borderColor: '#ddd',
                      fontSize: 13,
                    }}>
                    LinkedIn
                  </Text> */}
                  <View
                    style={{
                      marginTop: 3,
                      paddingLeft: 20,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../assets/social/linkedin.png')}
                    />
                    <TextInput
                      style={{
                        color: couleurs.primary,
                        fontFamily: CustomFont.Poppins,
                        flex: 1,
                        fontSize: 13,
                      }}
                      defaultValue={social.linkedin}
                      onChangeText={input => (social.linkedin = input)}
                      placeholderTextColor={'rgba(100,100,100,.7)'}
                      placeholder={t(
                        'Entrez_le_lien_de_votre_compte_LinkedIn',
                        preferredLangage,
                      )}></TextInput>
                  </View>
                </View>

                {/* INSTAGRAM */}
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginBottom: 4,
                    borderBottomWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: couleurs.primary,
                  }}>
                  {/* <Text
                    style={{
                      paddingVertical: 10,
                      marginHorizontal: 23,
                      color: couleurs.primary,
                      borderBottomWidth: 1,
                      borderColor: '#ddd',
                      fontSize: 13,
                    }}>
                    Instagram
                  </Text> */}
                  <View
                    style={{
                      paddingLeft: 20,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../assets/social/instagram.png')}
                    />
                    <TextInput
                      style={{
                        color: couleurs.primary,
                        fontFamily: CustomFont.Poppins,
                        flex: 1,
                        fontSize: 13,
                      }}
                      defaultValue={social.facebook}
                      onChangeText={input => (social.facebook = input)}
                      placeholderTextColor={'rgba(100,100,100,.7)'}
                      placeholder={t(
                        'Entrez_le_lien_de_votre_compte_instagram',
                        preferredLangage,
                      )}></TextInput>
                  </View>
                </View>

                {/* YOUTUBE */}
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginBottom: 4,
                    borderBottomWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: couleurs.primary,
                  }}>
                  {/* <Text
                    style={{
                      paddingVertical: 10,
                      marginHorizontal: 23,
                      color: couleurs.primary,
                      borderBottomWidth: 1,
                      borderColor: '#ddd',
                      fontSize: 13,
                    }}>
                    Youtube
                  </Text> */}
                  <View
                    style={{
                      marginTop: 3,
                      paddingLeft: 20,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../assets/social/youtube.png')}
                    />
                    <TextInput
                      style={{
                        color: couleurs.primary,
                        fontFamily: CustomFont.Poppins,
                        flex: 1,
                        fontSize: 13,
                      }}
                      defaultValue={social.facebook}
                      onChangeText={input => (social.facebook = input)}
                      placeholderTextColor={'rgba(100,100,100,.7)'}
                      placeholder={t(
                        'Entrez_le_lien_de_votre_compte_Youtube',
                        preferredLangage,
                      )}></TextInput>
                  </View>
                </View>

                {/* TITKOK */}
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginBottom: 4,
                    borderBottomWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: couleurs.primary,
                  }}>
                  {/* <Text
                    style={{
                      paddingVertical: 10,
                      marginHorizontal: 23,
                      color: couleurs.primary,
                      borderBottomWidth: 1,
                      borderColor: '#ddd',
                      fontSize: 13,
                    }}>
                    Tik-Tok
                  </Text> */}
                  <View
                    style={{
                      marginTop: 3,
                      paddingLeft: 20,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../assets/social/tik-tok.png')}
                    />
                    <TextInput
                      style={{
                        color: couleurs.primary,
                        fontFamily: CustomFont.Poppins,
                        flex: 1,
                        fontSize: 13,
                      }}
                      defaultValue={social.tiktok}
                      onChangeText={input => (social.tiktok = input)}
                      placeholderTextColor={'rgba(100,100,100,.7)'}
                      placeholder={t(
                        'Entrez_le_lien_de_votre_compte_tik_tok',
                        preferredLangage,
                      )}></TextInput>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Abonnements */}
          {stepper == 4 && (
            <View
              style={{
                alignContent: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontFamily: CustomFont.Poppins,
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 13,
                  paddingVertical: 20,
                  color: couleurs.dark,
                  paddingHorizontal: 30,
                }}>
                {t('Vous_n_avez_aucun_abonnement_actif', preferredLangage)}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginTop: 15,
                  width: '100%',
                  alignContent: 'center',
                }}>
                {abonnements.map((row: any, key: any) => (
                  <View
                    key={key}
                    style={{
                      borderWidth: 1,
                      borderColor: couleurs.primary,
                      borderRadius: 10,
                      marginBottom: 10,
                      alignContent: 'center',
                      width: Dimensions.get('screen').width - 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: couleurs.primary,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{color: couleurs.white, alignSelf: 'center'}}>
                        {preferredLangage == 'fr' ? row.nom : row.en_nom}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 30,
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          color: couleurs.primary,
                          fontSize: 13,
                        }}>
                        {row.code}
                      </Text>
                      <View>
                        <Text
                          style={{
                            color: couleurs.primary,
                            fontSize: 16,
                          }}>
                          {row.devise} {row.montant}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginBottom: 20,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: couleurs.primary,
                        borderRadius: 30,
                        marginHorizontal: 40,
                      }}>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: 10,
                          width: '80%',
                        }}
                        onPress={() => {
                          setAbonnementSelected(row), nextPage();
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            alignSelf: 'center',
                            color: couleurs.white,
                            padding: 10,
                            paddingHorizontal: 20,
                            fontSize: 13,
                          }}>
                          {t('choisir_cette_abonnement', preferredLangage)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Validation btn */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            {stepper > 2 && (
              <View style={{padding: 10}}>
                <TouchableOpacity onPress={() => setStepper(stepper - 1)}>
                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 13,
                      padding: 7,
                      color: couleurs.primary,
                      height: 40,
                      borderRadius: 30,
                      textAlign: 'center',
                      borderColor: couleurs.primary,
                      paddingHorizontal: 30,
                    }}>
                    {t('Retour', preferredLangage)}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {stepper != 1 && stepper != 2 && (
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: couleurs.primary,
                  borderRadius: 30,
                  paddingHorizontal: 30,
                }}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    width: '100%',
                  }}
                  onPress={() => nextPage()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 8,
                      paddingHorizontal: 10,
                      fontSize: 13,
                      height: 40,
                      color: couleurs.secondary,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    {t('Suivant', preferredLangage)}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {stepper == 3 && <View
              style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                borderRadius: 30,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 50,
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                }}
                onPress={() =>  nextPage()}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 13,
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.primary,
                    textDecorationColor: couleurs.primary,
                    textDecorationLine:'underline',
                    textDecorationStyle:'solid',
                    
                  }}>
                  {t('plus_tard', preferredLangage)}
                </Text>
              </TouchableOpacity>
            </View>}

        {stepper != 3 &&  <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop:30,
              marginBottom:40,
              paddingHorizontal:30
            }}>
            <TouchableOpacity onPress={ () => {
              Linking.openURL('tel:' + ApiService.ADMIN_LINKIH_TEL)
            }}>
            <Text
              style={{
                color: couleurs.dark,
                fontSize: 13,
                textAlign: 'center',
                fontFamily: CustomFont.Poppins,
              }}>
                { t('besoin_d_aide', preferredLangage)}
            </Text>
            </TouchableOpacity>
          </View>}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: couleurs.primary,
  },
  container: {
    height: '110%',
    width: '100%',
    backgroundColor: couleurs.primary,
  },
  map: {
    flex: 1,
  },
});
