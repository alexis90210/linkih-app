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
  const [selectedCategorie, setSelectedCategorie] = useState([]);

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

  var mesCategories: {
    key?: any;
    value?: any;
  }[] = [];

  categories.map((categorie, key) => {
    categorie.sous_categorie.map((sous, index) => {
      mesCategories.push({
        key: index,
        value: sous,
      });
    });
  });

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

      console.log({
        etablissement: etablissement,
        categorie: selectedCategorie,
        horaires: horaires,
        social: social,
      });

      // redirect to new route
      navigation.navigate('inscription_proprietaire_3', {
        etablissement: etablissement,
        categorie: selectedCategorie,
        horaires: horaires,
        social: social,
      });
    } else {
      if (stepper == 0) {
        if (etablissement.sciem.length < 4) {
          Alert.alert('', "Le SCIEM de l'entreprise est trop court", [
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
  const [visible, setVisible] = React.useState(false);

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
              {stepper == 2 && 'Categories'}
              {stepper == 3 && "Heure d'ouverture"}
              {stepper == 4 && 'Lien reseaux sociaux'}
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
                    SCIEM entreprise
                  </Text>
                  <TextInput
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrez le SCIEM entreprise"
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
                    Nom & prenom du responsable
                  </Text>
                  <TextInput
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrez le Nom & prenom du responsable"
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
                  <MapboxGL.UserLocation />
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
                  backgroundColor: '#eee',
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  padding: 20,
                }}>
                <TextInput
                  defaultValue={adresse}
                  onChangeText={input => (etablissement.adresse = input)}
                  placeholder="Entrez votre adresse"
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: couleurs.primary,
                    width: '100%',
                    padding: 0,
                    marginTop: 10,
                    fontFamily: CustomFont.Poppins,
                  }}></TextInput>

                <TextInput
                  defaultValue={postcode}
                  onChangeText={input => (etablissement.postcode = input)}
                  placeholder="Entrez votre ZIP/ code postal"
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: couleurs.primary,
                    width: '100%',
                    padding: 0,
                    marginTop: 30,
                    fontFamily: CustomFont.Poppins,
                  }}></TextInput>

                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: couleurs.primary,
                    borderRadius: 30,
                    marginTop: 30,
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
                        color: couleurs.white,
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
                <SelectList
                  setSelected={(val: String) => {
                    !selectedCategorie.includes(val as never)
                      ? setSelectedCategorie(
                          selectedCategorie.concat(val as never),
                        )
                      : null;
                  }}
                  data={mesCategories}
                  save="value"
                  onSelect={() => console.log(selectedCategorie)}
                  fontFamily={CustomFont.Poppins}
                  searchPlaceholder={'Liste des categories'}
                  placeholder={'Selectionnez la categorie de votre etab...'}
                  boxStyles={{
                    borderColor: couleurs.primary,
                    borderRadius: 20,
                  }}
                  dropdownTextStyles={{color: couleurs.dark}}
                  dropdownStyles={{borderColor: couleurs.primary}}
                />

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 10,
                    paddingHorizontal: 5,
                    marginTop: 40,
                  }}>
                  {selectedCategorie.map((row, key) => (
                    <View
                      key={key}
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
                          {row}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Heure d'ouverture */}
          {stepper == 3 && (
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  gap: 10,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}>
                {planning.map((row, i) => (
                  <>
                    <View
                      key={ i }
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          fontFamily: CustomFont.Poppins,
                          fontSize: 15,
                          color: couleurs.dark,
                        }}>
                        {row}
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          gap: 60,
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            gap: 2,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <BouncyCheckbox
                            size={20}
                            fillColor={couleurs.primary}
                            unfillColor={couleurs.white}
                            iconStyle={{borderColor: couleurs.primary}}
                            innerIconStyle={{borderWidth: 2}}
                            textStyle={{fontFamily: CustomFont.Poppins}}
                            onPress={(isChecked: boolean) => {}}
                          />
                          <Text>Ouvert</Text>
                        </View>

                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 10,
                            flexDirection: 'row',
                          }}>
                          <TouchableOpacity onPress={() => setVisible(true)}>
                            <View
                              style={{
                                borderWidth: 1,
                                borderRadius: 10,
                                width: 120,
                                height: 40,
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 5,
                                flexDirection: 'row',
                                borderColor: couleurs.primary,
                              }}>
                              <Text style={{position: 'relative', top: 9}}>
                                00:00
                              </Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => setVisible(true)}>
                            <View
                              style={{
                                borderWidth: 1,
                                borderRadius: 10,
                                width: 120,
                                height: 40,
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 5,
                                flexDirection: 'row',
                                borderColor: couleurs.primary,
                              }}>
                              <Text style={{position: 'relative', top: 9}}>
                                00:00
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 1,
                        overflow: 'hidden',
                        paddingHorizontal: 10,
                      }}>
                      <View
                        style={{
                          height: 1,
                          borderWidth: 1,
                          borderColor: couleurs.primary,
                          borderStyle: 'dashed',
                        }}></View>
                    </View>
                  </>
                ))}
              </View>
            </View>
          )}

          {/*  Lien reseaux sociaux */}
          {stepper == 4 && (
            <View>
              <View style={{paddingVertical: 10}}>
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
                    placeholder="Entrez votre lien Facebook"></TextInput>
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
                    placeholder="Entrez votre lien Twitter"></TextInput>
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
                    placeholder="Entrez votre lien LinkedIn"></TextInput>
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
                    placeholder="Entrez votre lien instagram"></TextInput>
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
                    placeholder="Entrez votre lien Youtube"></TextInput>
                </View>

                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingLeft: 20,
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Image source={require('../assets/social/tik-tok.png')} />
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
                    placeholder="Entrez votre lien tik-tok"></TextInput>
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
            {stepper != 1 && (
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
              {stepper == 2 && (
                <Image
                  source={require('../assets/images/success.png')}
                  style={{height: 250, width: '100%'}}
                />
              )}
            </>
          )}

          {stepper != 1 && <View style={{marginVertical: 20}}></View>}
        </ScrollView>

        {/* MODAL TIME PICKER */}
        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={14}
          inputFontSize={16}
        />
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
