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
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import {SelectList} from 'react-native-dropdown-select-list';
import {categories} from '../components/api/categories';
import storage from '../components/api/localstorage';

import MapboxGL from '@rnmapbox/maps';
import ApiService from '../components/api/service';
import defaultStyle from '../components/api/defaultMpaStyle';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {TimePickerModal} from 'react-native-paper-dates';
import planning from '../components/api/planning';
import ArrowLeftIcon from '../components/ArrowLeft';

MapboxGL.setAccessToken(ApiService.MAPBOX_GL_TOKEN);

// InscriptionProprietaireScreen2
export default function InscriptionProprietaireScreen2({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  console.log(route.params);

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
    tiktok:''
  };

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
            setLoadedCategorie(true)
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
  
    if ( !isLoadedCategorie ) 
      loadCategories()


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

    if (stepper == 3) {
      // formating horaire

      var horaires = [];

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

      // redirect to new route
      navigation.navigate('inscription_proprietaire_3', {
        etablissement: etablissement,
        categorie: selectedCategorie.sous_categorie_id,
        horaires: horaires,
        social: social,
      });

    } else {
      if (stepper == 0) {
        if (etablissement.sciem.length < 4) {
          Alert.alert('', "Le SIRET de l'entreprise est trop court", [
            {text: 'OK', onPress: () => null},
          ]);
          return;
        }

        if (etablissement.nom_prenom_responsable.length < 4) {
          Alert.alert(
            '',
            'Le champ nom et prenom du responsable est trop court',
            [{text: 'OK', onPress: () => null}],
          );
          return;
        }

        if (etablissement.poste_occupe.length < 4) {
          Alert.alert('', 'Le champ poste du responsable est trop court', [
            {text: 'OK', onPress: () => null},
          ]);
          return;
        }
      }
      setStepper(stepper + 1);
    }
  };

  const [startCords, setstartCords] = useState([0, 0]);
  const [isLoaded, setLoaded] = useState(false);

  const [adresse, setAdresse] = useState('');
  const [postcode, setPCode] = useState('');

  Geolocation.getCurrentPosition(info => {
    let lon = Number(info.coords.longitude);
    let lat = Number(info.coords.latitude);

    if (!isLoaded) {
      setstartCords([lon, lat]);
      _onDragGetAdresse(lon, lat);
      setLoaded(true);
    }
  });

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
        console.log(error);
      });
  };

  ///////////////////////////////////////////////////
  const [visible, setVisible] = useState(false);

  const onDismiss = () => {
    setVisible(false);
  };

  const onConfirm = ({hours, minutes}: {hours: any; minutes: any}) => {
    setVisible(false);
    console.log({hours, minutes});
  };

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
            <Pressable onPress={() => {stepper > 0 ? setStepper(stepper - 1) : navigation.goBack()}}>
              <ArrowLeftIcon color={couleurs.white} />
            </Pressable>
            <Text
              style={{
                color: couleurs.white,
                fontSize: 16,
                fontFamily: CustomFont.Poppins,
              }}>
              {stepper == 0 && 'Information privees'}
              {stepper == 2 && 'Choisir une categorie'}
              {stepper == 3 && 'Lien reseaux sociaux'}
            </Text>
          </View>
        )}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          {/* INformations privees */}
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
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#000',
                      fontSize: 15,
                      opacity: 0.85,
                      marginVertical: 8,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    SIRET entreprise
                  </Text>
                  <TextInput
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrez le SIRET entreprise"
                    defaultValue={sciem}
                    onChangeText={input => (
                      (etablissement.sciem = input)
                    )}
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: couleurs.primary,
                      color: couleurs.primary,
                      width: '100%',
                      fontFamily: CustomFont.Poppins,
                      padding: 10,
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
                      opacity: 0.85,
                      marginVertical: 8,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Nom(s) & prenom(s)
                  </Text>
                  <TextInput
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrez le Nom(s) & prenom(s)"
                    defaultValue={nom_prenom_responsable}
                    onChangeText={input => (
                      (etablissement.nom_prenom_responsable = input)
                    )}
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: couleurs.primary,
                      color: couleurs.primary,
                      width: '100%',
                      fontFamily: CustomFont.Poppins,
                      padding: 10,
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
                      opacity: 0.85,
                      marginVertical: 8,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Poste occupe
                  </Text>
                  <TextInput
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrez le poste occupe par le responsable"
                    defaultValue={poste_occupe}
                    onChangeText={input => (
                      (etablissement.poste_occupe = input)
                    )}
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: couleurs.primary,
                      color: couleurs.primary,
                      width: '100%',
                      fontFamily: CustomFont.Poppins,
                      padding: 10,
                    }}></TextInput>
                </View>
              </View>
            </View>
          )}

          {/* Adresse de l'etablissement */}
          {stepper == 1 && (
            <View style={{flex: 1}}>
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
                  {/* <MapboxGL.UserLocation /> */}
                  <MapboxGL.Camera
                    zoomLevel={11}
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
                          gap: 3,
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
                              width: 30,
                              height: 30,
                              marginLeft: 6,
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
                  backgroundColor: couleurs.primary,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  padding: 20,
                  zIndex:100,
                  flex:1
                }}>
                <TextInput
                  defaultValue={adresse}
                  onChangeText={input => (etablissement.adresse = input)}
                  placeholder="Entrez votre adresse"
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: couleurs.white,
                    width: '100%',
                    padding: 0,
                    fontSize:14,
                    marginTop: 10,
                    fontFamily: CustomFont.Poppins,
                  }}></TextInput>

                <TextInput
                  defaultValue={postcode}
                  onChangeText={input => (etablissement.postcode = input)}
                  placeholder="Entrez votre code postal"
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: couleurs.white,
                    width: '100%',
                    padding: 0,
                    marginTop: 10,
                    fontSize:14,
                    fontFamily: CustomFont.Poppins,
                  }}></TextInput>

                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: couleurs.white,
                    borderRadius: 30,
                    marginTop: 20
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
                        fontSize: 15,
                        fontWeight: '500',
                        color: couleurs.primary,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      Confirmez l'adressse
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Categories selectionnees */}
          {stepper == 2 && (
            <View>
              <View style={{marginHorizontal: 10}}>
                
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 10,
                    paddingHorizontal: 5,
                    marginTop: 40
                  }}>
                  
                   {sous_categories.map( ( row:any , index:any) => (
                     <TouchableOpacity key={index} onPress={() =>  {
                      setSelectedCategorie( row ),
                      setStepper(3)
                     } }>
                     <View
                       style={{
                         display: 'flex',
                         flexDirection: 'row',
                         gap: 4,
                         backgroundColor: '#fff',
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
                           backgroundColor: '#fff',
                           padding: 6,
                           borderRadius: 50,
                         }}>
                         <Text
                           style={{
                             color: '#000',
                             fontFamily: CustomFont.Poppins,
                           }}>
                           {row.nom}
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
                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingLeft: 20,
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Image source={require('../assets/social/facebook.png')} />

                  <TextInput
                    style={{
                      color: couleurs.primary,
                      fontFamily: CustomFont.Poppins,
                      flex: 1,
                      fontSize: 15,
                    }}
                    defaultValue={social.facebook}
                    onChangeText={input => (social.facebook = input)}
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrez le lien de votre page Facebook"></TextInput>
                </View>

                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingLeft: 20,
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Image source={require('../assets/social/twitter.png')} />
                  <TextInput
                    style={{
                      color: couleurs.primary,
                      fontFamily: CustomFont.Poppins,
                      flex: 1,
                      fontSize: 15,
                    }}
                    defaultValue={social.twitter}
                    onChangeText={input => (social.twitter = input)}
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrez le lien de votre compte Twitter"></TextInput>
                </View>

                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingLeft: 20,
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Image source={require('../assets/social/linkedin.png')} />
                  <TextInput
                    style={{
                      color: couleurs.primary,
                      fontFamily: CustomFont.Poppins,
                      flex: 1,
                      fontSize: 15,
                    }}
                    defaultValue={social.linkedin}
                    onChangeText={input => (social.linkedin = input)}
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrez le lien de votre compte LinkedIn"></TextInput>
                </View>

                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingLeft: 20,
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Image source={require('../assets/social/instagram.png')} />
                  <TextInput
                    style={{
                      color: couleurs.primary,
                      fontFamily: CustomFont.Poppins,
                      flex: 1,
                      fontSize: 15,
                    }}
                    defaultValue={social.facebook}
                    onChangeText={input => (social.facebook = input)}
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrez  le lien de votre compte instagram"></TextInput>
                </View>

                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingLeft: 20,
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Image source={require('../assets/social/youtube.png')} />
                  <TextInput
                    style={{
                      color: couleurs.primary,
                      fontFamily: CustomFont.Poppins,
                      flex: 1,
                      fontSize: 15,
                    }}
                    defaultValue={social.facebook}
                    onChangeText={input => (social.facebook = input)}
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrez le lien de votre compte Youtube"></TextInput>
                </View>

                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingLeft: 20,
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    gap:10
                  }}>
                  <Image source={require('../assets/social/tik-tok.png')} style={{width:40, height:40}} />
                  <TextInput
                    style={{
                      color: couleurs.primary,
                      fontFamily: CustomFont.Poppins,
                      flex: 1,
                      fontSize: 15,
                    }}
                    defaultValue={social.tiktok}
                    onChangeText={input => (social.tiktok = input)}
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrez  le lien de votre compte tik-tok"></TextInput>
                </View>
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
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            {stepper != 1 && stepper != 2 && (
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: couleurs.primary,
                  borderRadius: 30,
                  height: 45,
                  width: '100%',
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
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 14,
                      color: couleurs.secondary,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Suivant
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {stepper > 1 && (
            <>
              <View style={{padding: 10}}>
                <TouchableOpacity onPress={() => setStepper(stepper - 1)}>
                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 15,
                      padding: 7,
                      marginTop: 10,
                      color: couleurs.primary,
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      borderRadius: 30,
                      textAlign: 'center',
                      borderColor: couleurs.primary,
                    }}>
                    Retour
                  </Text>
                </TouchableOpacity>
              </View>

              {/* IMAGE SVG GOES HERE */}
              {/* {stepper == 2 && (
                <Image
                  source={require('../assets/images/success.png')}
                  style={{height: 180, width: '60%', alignSelf:'center', borderRadius:50, marginTop:30}}
                />
              )} */}
            </>
          )}

          {stepper != 1 && <View style={{marginVertical: 20}}></View>}
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
