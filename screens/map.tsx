import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  Alert,
  Pressable,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';

import SearchIcon from '../components/search';
import CloseIcon from '../components/close';
import FlagPlaceIcon from '../components/flag';
import axios from 'axios';
import ApiService from '../components/api/service';
import {CustomFont, couleurs} from '../components/color';
import MapboxGL from '@rnmapbox/maps';
import GpsIcon from '../components/gps';
import EyeIcon from '../components/eye';
import defaultStyle from '../components/api/defaultMpaStyle';
import ArrowLeftIcon from '../components/ArrowLeft';
import {AirbnbRating} from 'react-native-ratings';
import translations from '../translations/translations';
import storage from '../components/api/localstorage';

MapboxGL.setAccessToken(ApiService.MAPBOX_GL_TOKEN);

export default function Map({ navigation, route } : { navigation: any; route: any; }) {

  //////////////////////////// LANGUAGE HANDLER ///////////////////////

    const [preferredLangage, setPreferredLangage] = useState('fr');

    const t = (key: any, langage: any) => {
      return translations[langage][key] || key;
    };
  
    storage
      .load({
        key: 'defaultlang', // Note: Do not use underscore("_") in key!
        id: 'defaultlang',  // Note: Do not use underscore("_") in id!
      })
      .then((data: any) => {
        setPreferredLangage(data);
      });
  
  ///////////////////////////////
    
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

  MapboxGL.setTelemetryEnabled(false);

  const [ modalVisible, SetModalVisible ] = useState(false);
  const [ isLoadedEtab, setLoadedEtab ] = useState(false);
  const [ isPreccessing, setPreccessing ] = useState(false);

  const openModal = () => {
    SetModalVisible(!modalVisible);
  };

  const [etablissements, setEtablissements] = useState<any>([]);
  const [startCords, setstartCords] = useState<any>([0, 0]);
  const [UserPosition, setUserPosition] = useState<any>({});

  const _myPosition = () => {
    // setPreccessing(true)
    Geolocation.getCurrentPosition(info => {
      let lon = Number(info.coords.longitude);
      let lat = Number(info.coords.latitude);

      setUserPosition({
        longitude: lon,
        latitude: lat,
      });

      setstartCords([lon, lat]);
      // setPreccessing(false)
    });
  };

  const loadEtablissements = () => {
      // setPreccessing(true)
      axios({
        method: 'POST',
        url: ApiService.API_URL_GET_VENDEURS,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response: {data: any}) => {
        var api = response.data;
        if (api.code == 'success') {
          
          setEtablissements( api.message.reverse() );
          setLoadedEtab(true);
          // setPreccessing(false)
        }

        if (api.code == 'error') {
          // setPreccessing(false)
          
        }
      })
      .catch((error: any) => {
        // setPreccessing(false)
        console.log(error);
      
      });
  };

  if (route.params?.recherche) {
    if (!isLoadedEtab) {
      setEtablissements(route.params?.recherche.reverse());
      setLoadedEtab(true);
    }
  } else {
    // load etabs if not loaded yet
    if (!isLoadedEtab) {
      loadEtablissements();
      _myPosition();
      setLoadedEtab(true);
    }
  }


  // DISTANCE HANDLING
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

    if ( d < 1) {
      return (d * 1000).toFixed(0)  + ' m'
    }

    return d.toFixed(2) + ' km';
  };


  return (
    <SafeAreaView style={{flex: 1}}>
       {/* <Modal transparent={true} visible={isPreccessing}>
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
        </Modal> */}

      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            style={{
              flex: 1,
            }}
            styleJSON={JSON.stringify(defaultStyle)}
            zoomEnabled={true}
            pitchEnabled={true}
            onPress={e => null}
            onRegionIsChanging={e => null}
            surfaceView={true}
            rotateEnabled={false}
            scrollEnabled={true}
            >          
          
             <MapboxGL.Camera
              zoomLevel={11}
              centerCoordinate={[
                parseFloat(UserPosition.longitude),
                parseFloat(UserPosition.latitude),
              ]}
              followUserLocation={true}
            /> 

                <MapboxGL.PointAnnotation
                key={'userPosition'}
                id={'marker'}
                coordinate={[
                  parseFloat(UserPosition.longitude),
                  parseFloat(UserPosition.latitude),
                ]}>
                <View style={{
                  width:150,
                  height:150,
                  borderRadius:100,
                  backgroundColor: 'rgba(0,200, 0, .4)',
                  display:'flex',
                  flexDirection:'row',
                  justifyContent:'center'                
                }}>

                <View style={{
                  width:20,
                  height:20,
                  borderRadius:100,
                  backgroundColor: couleurs.primary,
                  borderWidth:3,
                  borderStyle:'solid',
                  borderColor:couleurs.secondary,
                  alignSelf:'center'                  
                }}></View>
                </View>
              </MapboxGL.PointAnnotation>


            {etablissements.map((marker: any, index: any) => (
              <MapboxGL.PointAnnotation
                key={index}
                id={'marker'}
                onSelected={(e) => {
                  console.log(e);
                  // SetModalVisible(true)
                }
                }
                coordinate={[
                  parseFloat(marker.longitude),
                  parseFloat(marker.latitude),
                ]}>
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
            ))}
          </MapboxGL.MapView>
        </View>
      </View>

      {/* search button */}
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
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color={'#fff'} />
        </Pressable>
      </View>

      {/* <View
        style={{
          borderRadius: 100,
          backgroundColor: 'green',
          padding: 10,
          margin: 4,
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex: 999,
        }}>
        <Pressable
          onPress={() => {
            _myPosition();
          }}>
          <GpsIcon color={'#fff'} />
        </Pressable>
      </View> */}

      {/* listing view button */}
      <View
        style={{
          position: 'absolute',
          margin: 4,
          top: 10,
          right: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Pressable
          style={{
            paddingHorizontal: 10,
          }}
          onPress={() =>
            navigation.navigate('resultat_recherche', {
              title: t('les_etabs', preferredLangage),
            })
          }>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: couleurs.primary,
              borderRadius: 30,
              marginBottom: 10,
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              gap: 4,
              paddingHorizontal: 20,
              // width: 200,
            }}>
            <SearchIcon color={couleurs.secondary} />
            <Text
              style={{
                textAlign: 'center',
                padding: 10,
                paddingHorizontal: 10,
                fontSize: 13,
                fontWeight: '500',
                color: '#fff',
              }}>
              { t('Affichage_sur_liste', preferredLangage)}
            </Text>
          </View>
        </Pressable>
      </View>

      <View
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 5,
          bottom: 0,
        }}>
        <ScrollView
          horizontal={true}
          style={{
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 280,
            borderRadius: 15,
           
          }}>
            {!isLoadedEtab && <View style={{
              display: 'flex',
              flexDirection: 'row',
              width: Dimensions.get('screen').width -100,
              height:100,
              justifyContent:'center',
              backgroundColor: couleurs.white,
              padding:30,
              borderRadius: 15,
            }}>
              <ActivityIndicator
                color={couleurs.primary}
                style={{alignSelf: 'center'}}
                size={'large'}>

              </ActivityIndicator>
              </View>}
          {isLoadedEtab && etablissements.map((marker: any, key:any) => (
            <Pressable key={key}>
              <View
                style={{
                  borderRadius: 15,
                  padding: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'nowrap',
                  justifyContent: 'flex-start',
                  backgroundColor: '#fff',
                  width: 300,
                  height: 260,
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
                    source={marker.logo ? {uri:'data:image/png;base64,' + marker.logo} : require('../assets/images/cover.jpg')}
                    style={{width: '100%', height: 100, borderRadius:20}}
                  />

                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: couleurs.primary,
                      padding: 6,
                      position: 'absolute',
                      bottom: 113,
                      right: 5,
                      zIndex: 999,
                    }}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('autre_etab', {
                          nomEtab: marker.nom,
                          vendeur_data: marker
                        })
                      }>
                      <EyeIcon color={'#fff'} />
                    </Pressable>
                  </View>

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
                        {marker.nom}
                      </Text>

                      <Text
                        style={{
                          fontFamily: CustomFont.Poppins,
                          fontSize: 13,
                          color: couleurs.dark,
                        }}>

                        <AirbnbRating
                          reviewSize={4}
                          reviewColor={couleurs.primary}
                          showRating={false}
                          count={5}
                          reviews={['Terrible', 'Bad', 'Good', 'Very Good']}
                          onFinishRating={(rate:any) => console.log(rate)}
                          defaultRating={marker.note}
                          size={14}
                        />
                      </Text>
                      <Text
                        style={{
                          fontFamily: CustomFont.Poppins,
                          fontSize: 13,
                          color: couleurs.dark,
                        }}>
                        {marker.categorie}  . 
                        <Text style={{color: couleurs.primary}}>
                          { distance(
                            Number(marker.latitude),
                            Number(marker.longitude),
                            Number(UserPosition.latitude),
                            Number(UserPosition.longitude),
                          )}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontFamily: CustomFont.Poppins,
                          fontSize: 13,
                          color: couleurs.dark,
                        }}>
                        {/* marker.adresse */}
                        <Text style={{color: 'green'}}> { t('Ouvert', preferredLangage)} </Text> . {t('Ferme_a', preferredLangage)}
                        {' '} 18:00
                      </Text>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'nowrap',
                          justifyContent: 'center',
                          gap: 10,
                          marginTop: 7,
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
                              openMaps(Number(marker.latitude) , Number(marker.longitude))
                            }}>

                            <Image
                              source={ require('../assets/images/itinary.png') }
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
                              { t('Itineraire', preferredLangage)}
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
                            onPress={() => Linking.openURL(`tel:${marker.mobile}`)}>
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
                              { t('Appeler', preferredLangage)}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Modal visible={modalVisible} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
                width: '90%',
                borderRadius: 15,
                padding: 10,
              }}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Visualisation
              </Text>
              <View style={{width: '100%', paddingHorizontal: 10}}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('MonEtablissement', {
                      nomEtab: 'Maison de beaute',
                    })
                  }>
                  <View
                    style={{
                      borderRadius: 15,
                      padding: 10,
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      justifyContent: 'flex-start',
                      backgroundColor: '#fff',
                      width: '100%',
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: 'rgba(200,200,200,1)',
                        width: 100,
                        borderRadius: 15,
                        paddingLeft: 40,
                        paddingTop: 40,
                      }}>
                      <FlagPlaceIcon />
                    </View>

                    <View
                      style={{
                        flex: 1,
                        paddingHorizontal: 10,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          flexWrap: 'nowrap',
                          justifyContent: 'flex-start',
                          gap: 6,
                          paddingTop: 10,
                        }}>
                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: 13,
                            color: couleurs.dark,
                          }}>
                          Maison de beaute
                        </Text>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            justifyContent: 'flex-start',
                            gap: 10,
                          }}>
                          <Text
                            style={{
                              fontFamily: CustomFont.Poppins,
                              fontSize: 13,
                              color: couleurs.dark,
                            }}></Text>
                          <Text
                            style={{
                              fontFamily: CustomFont.Poppins,
                              fontSize: 13,
                              color: couleurs.primary,
                            }}>
                            ( 450 avis )
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: CustomFont.Poppins,
                            fontSize: 13,
                            color: couleurs.dark,
                          }}>
                          Brzzaville, Congo , Boulevard Denis
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>

                <View style={{padding: 15, paddingVertical: 30}}>
                  <Pressable
                    onPress={openModal}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      justifyContent: 'flex-start',
                    }}>
                    <CloseIcon color={couleurs.primary} />
                    <Text style={{color: 'rgba(100,100,100,.8)'}}>Quitter</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
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

