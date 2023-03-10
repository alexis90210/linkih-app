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
// ResultatRechercheScreen
export default function ResultatRechercheScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  var title = route.params.title;  

  const [etablissements, setEtablissements] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const _setCloseModal = () => {
    setCloseModal(!closeModal);
  };

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
        var api = response.data;
        if (api.code == 'success') {
          setLoading(true);
          setEtablissements(api.message);
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

    // SEARCH SALON BY REGION + CATEGORIE
    const searchByCategorie = () => {

      console.log(route.params.currentCategorie);      

      axios({
        method: 'POST',
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
              setEtablissements( response.data.message )
              console.log('loaded from search : by cat :' , response.data.message.length);
            } else {
              Alert.alert('Message', "Aucun resultat n'a ete trouve", [
                {text: 'OK', onPress: () => null},
              ]);
            }
          } else {
            Alert.alert('', 'Erreur survenue', [
              {text: 'OK', onPress: () => null},
            ]);
          }
        })
        .catch(error => {
          Alert.alert('', 'Erreur Network', [{text: 'OK', onPress: () => null}]);
        });
    };
  
    // SEARCH BY ETAB
    const searchByEtab = () => {

      console.log(route.params.currentEtablissement);
      
      axios({
        method: 'POST',
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
              setEtablissements( response.data.message )
             console.log('loaded from search : by etab : ' , response.data.message.length);
            } else {
              Alert.alert('Message', "Aucun resultat n'a ete trouve", [
                {text: 'OK', onPress: () => null},
              ]);
            }
          } else {
            Alert.alert('', 'Erreur survenue', [
              {text: 'OK', onPress: () => null},
            ]);
          }
        })
        .catch(error => {
          Alert.alert('', 'Erreur Network', [{text: 'OK', onPress: () => null}]);
        });
    };

  
    if (!isLoading) {
      if ( route.params?.activateSearch ) {
        if (route.params.currentCategorie != undefined) {
          searchByCategorie()
        }
        if (route.params.currentEtablissement != undefined) {
          searchByEtab()
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

          SetMyPositionLoaded(true)
  
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

    if ( !myPositionLoaded ) {
      getUserPosition()
    }
  



  const distance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    const R = 6371; // rayon de la Terre en kilom??tres
    const dLat = ((lat2 - lat1) * Math.PI) / 180; // diff??rence de latitude en radians
    const dLon = ((lon2 - lon1) * Math.PI) / 180; // diff??rence de longitude en radians

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // distance en kilom??tres

    if ( d < 1) {
      return (d * 1000).toFixed(0)  + ' m'
    }

    return d.toFixed(2) + ' km';
  };

  const LoadDistance = (etab: any) => {


    let d = distance(
      Number(etab.etab.latitude),
      Number(etab.etab.longitude),
      Number(myPosition.latitude),
      Number(myPosition.longitude),
    )

    return (
      <Text style={{fontWeight: '600', fontSize: 15, color: couleurs.primary}}>
        {d} 
      </Text>
    );
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
          }}>
          <Text
            style={{fontFamily: CustomFont.Poppins, fontSize: 15, width: 200}}
            numberOfLines={1}>
            {prestation.nom}
          </Text>
          <Text
            style={{
              fontFamily: CustomFont.Poppins,
              fontSize: 15,
              color: couleurs.primary,
            }}>
            {prestation.prix}
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('autre_etab', {
            nomEtab: data.nom,
            vendeur_data: data
          })
        }>
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
              source={data.logo ? {uri:'data:image/png;base64,' + data.logo} :require('../assets/images/cover.jpg')}
              style={{width: '100%', height: 100}}
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
                    fontSize: 15,
                    color: '#000',
                    fontFamily: CustomFont.Poppins,
                  }}>
                  {data.nom}
                </Text>

                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color: couleurs.dark,
                    alignContent:'center'
                  }}>
                   <AirbnbRating
                          reviewSize={4}
                          reviewColor={couleurs.primary}
                          showRating={false}
                          count={4}
                          reviews={['Terrible', 'Bad', 'Good', 'Very Good']}
                          onFinishRating={(rate:any) => console.log(rate)}
                          defaultRating={data.note}
                          size={14}
                        /> ({data.note})
                </Text>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color: '#000',
                  }}>
                  Entrepreuneur - Societe . $$ .{' '}
                  <Text style={{color: couleurs.primary}}>

                    <LoadDistance etab={data}/>
                  </Text>
                </Text>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 14,
                    color: '#000',
                    marginBottom: 3
                  }}>
                  {/* {marker.adresse} */}
                  <Text style={{color: 'green'}}>Ouvert</Text> . Ferme a 81:00
                </Text>

                {data.prestations && data.prestations.map((row: any, key:any) => (
                  <Item key={key} prestation={row} />
                ))}

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-start',
                    gap: 10,
                    marginVertical: 14
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
                      onPress={() => null}>
                      <Image
                        source={require('../assets/images/itinary.png')}
                        style={{width: 15, height: 15}}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          padding: 5,
                          fontSize: 15,
                          color: couleurs.white,
                          fontFamily: CustomFont.Poppins,
                        }}>
                        Itineraire
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
                          fontSize: 15,
                          color: couleurs.primary,
                          fontFamily: CustomFont.Poppins,
                        }}>
                        Appeler
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
                          nomEtab: 'for test',
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
      </TouchableOpacity>
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
            alignItems: 'center', width: '100%',
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
          <View style={{ paddingLeft: 30, flex:1}}>
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
            {etablissements.map((prop, key) => {
              return (
                <LoadResultatRecherche
                  key={key}
                  data={prop}
                  navigation={navigation}
                />
              );
            })}
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
              Filtres
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
                Trier par
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
                  Les plus proches
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
                  Les mieux notes
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
                    fontWeight:'bold'
                  }}>
                   A moins de : 10 km
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
                Trier par Prix
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
                  Moins de 60 ???
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
                  Moins de 100 ???
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
                  Plus de 100 ???
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
                Note minimum
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
                    Nouveau salon
                  </Text>
                  <Text style={{color: couleurs.primary}}>
                    Eablissement, Restaurant, ...
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
                      fontSize: 14,
                      color: couleurs.secondary,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    APPLIQUER
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
