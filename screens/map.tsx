import Geolocation from '@react-native-community/geolocation';
import React, { useState} from 'react';
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
} from 'react-native';

import SearchIcon from '../components/search';
import CloseIcon from '../components/close';
import MenuBarIcon from '../components/menu_bar';
import FlagPlaceIcon from '../components/flag';
import axios from 'axios';
import ApiService from '../components/api/service';
import {CustomFont, couleurs} from '../components/color';
import MapboxGL from '@rnmapbox/maps';
import GpsIcon from '../components/gps';
import ShopIcon from '../components/shop';
import defaultStyle from '../components/api/defaultMpaStyle';

MapboxGL.setAccessToken(ApiService.MAPBOX_GL_TOKEN);

export default function Map({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {

  

  const [modalVisible, SetModalVisible] = useState(false);
  const [isLoadedEtab, setLoadedEtab] = useState(false);

  const openModal = () => {
    SetModalVisible(!modalVisible);
  };

  const [etablissements, setEtablissements] = useState<any>([]);
  const [startCords, setstartCords] = useState([0,0]);

  const _myPosition = () => {
    Geolocation.getCurrentPosition(
      info => {
        let lon = Number(info.coords.longitude) ;
        let lat = Number(info.coords.latitude);
  
        setstartCords([lon, lat])
  
      });
  }



  MapboxGL.setTelemetryEnabled(false);

  const loadEtablissements = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_VENDEURS,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        console.log(response.data);

        var api = response.data;
        if (api.code == 'success') {
          setEtablissements(api.message);
          setLoadedEtab(true);
        }

        if (api.code == 'error') {
          Alert.alert('Erreur', api.message, [
            {text: 'OK', onPress: () => null},
          ]);
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('Erreur', error, [{text: 'OK', onPress: () => null}]);
      });
  };

  if ( route.params?.recherche) {  

    if ( !isLoadedEtab ) {
      setEtablissements(route.params?.recherche)
      setLoadedEtab(true)
    }
  } else {
     // load etabs if not loaded yet
  if (!isLoadedEtab) {
    loadEtablissements();
    _myPosition();
  }
  }



 

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.page}>
        <View style={styles.container}>
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
            <MapboxGL.Camera zoomLevel={11} centerCoordinate={startCords} followUserLocation={true} />

            {etablissements.map((marker: any, index:any) => (
              <MapboxGL.PointAnnotation key={index} id={'marker'} coordinate={[parseFloat(marker.longitude), parseFloat(marker.latitude)]}>
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
          backgroundColor:couleurs.primary,
          padding: 10,
          margin: 4,
          position: 'absolute',
          top: 10,
          left: 10,
        }}>
        <Pressable
          onPress={() =>
            navigation.navigate('resultat_recherche', {
              latitude: Number(route.params.latitude),
              longitude: Number(route.params.longitude),
            })
          }>
          <SearchIcon color={'#fff'} />
        </Pressable>
      </View>

      <View
        style={{
          borderRadius: 100,
          backgroundColor:couleurs.primary,
          padding: 10,
          margin: 4,
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex:999
        }}>
        <Pressable
          onPress={() =>
            {
              _myPosition();              
            }
          }>
          <GpsIcon color={'#fff'} />
        </Pressable>
      </View>

      {/* listing view button */}
      <View
        style={{
          position: 'absolute',
          bottom: 150,
          left: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            padding: 10,
            width: '100%',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              marginTop: 10,
            }}>
            <Pressable
              style={{
                paddingHorizontal: 10,
              }}
              onPress={() =>
                navigation.navigate('resultat_recherche', {
                  title: 'Les etablissements'
                })
                 
              }>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor:couleurs.primary,
                  borderRadius: 30,
                  marginBottom: 10,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  gap: 4,
                  paddingHorizontal: 20,
                  width: 200,
                }}>
                <ShopIcon color={couleurs.secondary}/>
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    paddingHorizontal: 10,
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#fff',
                  }}>
                  Affichage sur liste
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          width: '100%',
          paddingHorizontal: 5,
        }}>
        <ScrollView
          horizontal={true}
          style={{
            padding: 10,

            display: 'flex',
            flexDirection: 'row',
            width: '80%',
            height: 145,
            borderRadius: 15,
          }}>
          {etablissements.map((marker: any) => (
            <Pressable
              key={Math.random()}
              onPress={() =>{
                
                
                console.log('ddd');
                // navigation.navigate('espace_etab', {
                //   nomEtab: marker.nom,
                //   latitude: Number(route.params.latitude),
                //   longitude: Number(route.params.longitude),
                // })
                //setstartCords([ Number(marker.longitude) , Number( marker.latitude)])
              }}>
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
                  marginRight: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-start',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'rgba(200,200,200,1)',
                      width: 60,
                      height: 60,
                      borderRadius: 15,
                      paddingLeft: 40,
                      paddingTop: 40,
                    }}></View>

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
                        paddingTop: 10,
                        gap:0
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          letterSpacing: 0.7,
                          color: '#000',
                          fontFamily: CustomFont.Poppins,
                        }}>
                        {marker.nom}
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
                            color: '#000',
                          }}>
                          5.0
                        </Text>
                        <Text
                          style={{
                            fontFamily: CustomFont.Poppins,
                            fontSize: 13,
                            color: couleurs.primary,
                          }}>
                          ( xx avis ) | {marker.mobile}
                        </Text>

                        
                        
                      </View>
                    </View>
                  </View>
                </View>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 14,
                    paddingVertical: 10,
                    color: '#000',
                    opacity: 0.8,
                  }}>
                  {marker.adresse}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Modal visible={modalVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
                fontSize: 15,
                fontWeight: 'bold',
                color: 'rgba(0,0,0,.6)',
              }}>
              Visualisation
            </Text>
            <View style={{width: '100%', paddingHorizontal: 10}}>
              <Pressable
                onPress={() =>
                  navigation.navigate('espace_etab', {
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
                          fontSize: 15,
                          letterSpacing: 0.7,
                          color: '#000',
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
                            fontSize: 15,
                            color: '#000',
                          }}>
                          5.0
                        </Text>
                        <Text
                          style={{
                            fontFamily: CustomFont.Poppins,
                            fontSize: 15,
                            color: couleurs.primary,
                          }}>
                          ( 450 avis )
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: CustomFont.Poppins,
                          fontSize: 14,
                          color: '#000',
                          opacity: 0.8,
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
    backgroundColor:couleurs.primary,
  },
  map: {
    flex: 1,
  },
});
