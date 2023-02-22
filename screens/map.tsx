import Geolocation from '@react-native-community/geolocation';
import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  Alert,
} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MenuIcon from '../components/menu';
import SearchIcon from '../components/search';
import CloseIcon from '../components/close';
import MenuBarIcon from '../components/menu_bar';
import FlagPlaceIcon from '../components/flag';
import GpsIcon from '../components/gps';
import axios from 'axios';
import ApiService from '../components/api/service';

export default function Map({navigation, route}: {navigation: any, route:any}) {
  const [modalVisible, SetModalVisible] = useState(false);

  const openModal = () => {
    SetModalVisible(!modalVisible);
  };

  const [etablissements, setEtablissements] = useState([]);

  const loadEtablissements = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_VENDEURS,
      headers: {
        Accept: 'application/json',
       'Content-Type': 'application/json'
     }
    })
      .then((response: {data: any}) => {
        var api = response.data;        
        if ( api.code == "success") {

          setEtablissements(api.message)
         }
      
        if ( api.code == "error") {
          Alert.alert('Erreur', api.message, [        
            {text: 'OK', onPress: () => null},
          ]);
        }         
      })
      .catch((error: any) => {
       console.log(error);
       Alert.alert('Erreur', error, [        
        {text: 'OK', onPress: () => null},
      ]);
       
      });
  }

  loadEtablissements()

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: Number( route.params.latitude ),
            longitude:  Number ( route.params.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          customMapStyle={[]}>
            {etablissements.map( (marker:any , index)  => (
               <Marker
               key={index}
               draggable
               coordinate={{
                 latitude: Number(marker.latitude),
                 longitude:  Number(marker.longitude),
               }}
               onDragEnd={e =>
                 console.log(JSON.stringify(e.nativeEvent.coordinate))
               }
               title={marker.nom}
               description={'Salon'}
               onPress={openModal}
               image={{uri:'https://icons.iconarchive.com/icons/sonya/swarm/256/Mayor-Hair-icon.png'}}
             />
            ))}         
        </MapView>
      </View>

      {/* search button */}
      <View
        style={{
          borderRadius: 100,
          backgroundColor: '#7B4C7A',
          padding: 10,
          margin: 4,
          position: 'absolute',
          top: 10,
          left: 10,
        }}>
        <Pressable onPress={() => navigation.navigate('resultat_recherche', { latitude: Number( route.params.latitude ),
            longitude:  Number ( route.params.longitude),})}>
          <SearchIcon color={'#fff'} />
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
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}>
            <View
              style={{
                width: 45,
                borderRadius: 100,
                padding: 10,
                backgroundColor: '#7B4C7A',
              }}>
              <GpsIcon color={'#fff'} />
            </View>
          </View> */}

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              marginTop: 10,
            }}>
            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                paddingHorizontal: 10,
              }}
              onPress={() =>
                navigation.navigate('resultat_recherche', {
                  title: 'Les etablissements',
                  latitude: Number( route.params.latitude ),
                  longitude:  Number ( route.params.longitude),
                })
              }>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#7B4C7A',
                  borderRadius: 30,
                  marginBottom: 10,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  gap: 4,
                  paddingHorizontal: 20,
                  width: 200,
                }}>
                <MenuBarIcon />
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    paddingHorizontal: 20,
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
            height: 155,
            borderRadius: 15,
          }}>
          
          {etablissements.map( (marker:any , index)  => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate('espace_etab', {
                  nomEtab: marker.nom,
                  latitude: Number( route.params.latitude ),
                  longitude:  Number ( route.params.longitude),
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
                  width: 300,
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
                        style={{fontWeight: '600', fontSize: 15, color: '#000'}}>
                        5.0
                      </Text>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 15,
                          color: '#841584',
                        }}>
                        ( 450 avis )
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontWeight: '600',
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
          ))}


        </ScrollView>
      </View>

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
                            fontWeight: '600',
                            fontSize: 15,
                            color: '#000',
                          }}>
                          5.0
                        </Text>
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 15,
                            color: '#841584',
                          }}>
                          ( 450 avis )
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontWeight: '600',
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
                  <CloseIcon color={'#841584'} />
                  <Text style={{color: 'rgba(100,100,100,.8)'}}>Quitter</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
