import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  Modal,
  FlatList,
  Alert,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import EditIcon from '../components/Edit';
import {AirbnbRating} from 'react-native-ratings';
import CloseIcon from '../components/close';
import {CustomFont, couleurs} from '../components/color';
import {TimePickerModal} from 'react-native-paper-dates';
import {Picker} from '@react-native-picker/picker';
import planning from '../components/api/planning';
import {sous_categories} from '../components/api/categories';
import MinusIcon from '../components/minus';
import AddIcon from '../components/add';
import axios from 'axios';
import ApiService from '../components/api/service';
import CallIcon from '../components/call';

export default function AutreEtablissement({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const propsTitle = route.params?.nomEtab;
  var title = 'Mon Etablissement';
  var isConsulting = false;
  if (propsTitle) {
    title = propsTitle;
    isConsulting = true;
  }

  // LOAD VENDEUR DATA
  const [VendeurData, setVendeurData] = useState<any>([]);
  const [VendeurDataLoaded, setSetVendeurDataLoaded] = useState(false);

  const loadVendeurData = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_VENDEURS,
      data: JSON.stringify({
        vendeur_id: route.params?.vendeur_data?.id,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        console.log('==>', response.data.message[0]);

        var api = response.data;
        if (api.code == 'success') {
          setVendeurData(api.message[0]);
          setSetVendeurDataLoaded(true);
        }

        if (api.code == 'error') {
          Alert.alert('', api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('', error);
      });
  };
  // CHECK LOAD OF HORAIRES
  if (!VendeurDataLoaded) loadVendeurData();

  /// END

  const [isVisibleModal, setVisibleModal] = useState(false);

  const activeModal = () => setVisibleModal(true);
  const desactiveModal = () => setVisibleModal(false);

  ///////////////////////////////////////////////////
  const [visibleHeureModal, setVisibleHeureModal] = React.useState(false);

  const onDismissHeureModal = () => {
    setVisibleHeureModal(false);
  };

  const onConfirmHeureModal = ({
    hours,
    minutes,
  }: {
    hours: any;
    minutes: any;
  }) => {
    setVisibleHeureModal(false);
    console.log({hours, minutes});
  };

  //////////////////////////////////////////////////
  const [selectedJour, setSelectedJour] = useState();
  const [selectedCategorie, setSelectedCategorie] = useState();

  const [sections, setSections] = useState<any>([]);
  const [sectionsLoaded, setSetSectionsLoaded] = useState(false);

  const loadPrestations = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_PRODUIT,
      data: JSON.stringify({
        vendeur_id: route.params?.vendeur_data?.id,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;

        console.log("=============", api.message);
        

        if (api.code == 'success') {
          setSections(api.message);
          setSetSectionsLoaded(true);
        }

        if (api.code == 'error') {
          Alert.alert('', api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('', error);
      });
  };

  // CHECK LOAD OF PRESTATIONS
  if (!sectionsLoaded) loadPrestations();

  // LOAD HORAIRE
  const [horaires, sethoraires] = useState<any>([]);
  const [horairesLoaded, setSethorairesLoaded] = useState(false);

  const loadHoraires = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_VENDEURS_HORAIRES,
      data: JSON.stringify({
        vendeur_id: route.params?.vendeur_data?.id,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        console.log(response.data);

        var api = response.data;
        if (api.code == 'success') {
          sethoraires(api.message);
          setSethorairesLoaded(true);
        }

        if (api.code == 'error') {
          Alert.alert('', api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('', error);
      });
  };
  // CHECK LOAD OF HORAIRES
  if (!horairesLoaded) loadHoraires();

  // HANDLING COLLAPSE
  const toggleCollapse = (id: any) => {
    setSections((prevState: any) =>
      prevState.map((section: any) =>
        section.id === id
          ? {...section, isCollapsed: !section.isCollapsed}
          : section,
      ),
    );
  };

  // GET LAYOUT
  const getItemLayout = (data: any, index: any) => ({
    length: 40 + (data[index].isCollapsed ? 0 : 20),
    offset: 40 * index,
    index,
  });

  //  RENDER ITEM
  const renderItem = ({item}: {item: any}) => (
    <View
      style={{
        marginBottom: 2,
        backgroundColor: couleurs.white,
      }}>
      <TouchableOpacity onPress={() => toggleCollapse(item.id)}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderRadius: 15,
            backgroundColor: '#fff',
            padding: 14,
            width: '100%',
            shadowColor: 'gray',
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: CustomFont.Poppins,
              textTransform: 'uppercase',
              fontSize: 15,
              color: !item.isCollapsed ? couleurs.primary : couleurs.dark,
            }}>
            {item.title}
          </Text>
          {!item.isCollapsed ? (
            <MinusIcon color={couleurs.primary} />
          ) : (
            <AddIcon color={couleurs.primary} />
          )}
        </View>
      </TouchableOpacity>
      {item.isCollapsed ? null : (
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: 14,
            width: '100%',
            shadowColor: 'gray',
            borderTopColor: 'rgba(0,0,0,.1)',
            borderTopWidth: 1,
          }}>
          {/* redirect to personnalisation */}
          {item.data.map((row: any, i: any) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('personnalisation_reservation', {
                  props: row,
                })
              }>
              <View
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  borderBottomColor: 'rgba(0,0,0,.1)',
                  borderBottomWidth: item.data.length != i + 1 ? 1 : 0,
                  paddingVertical: 6,
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                  }}>
                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 15,
                      color: couleurs.primary,
                    }}
                    numberOfLines={1}>
                    {row.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 13,
                      color: couleurs.dark,
                      opacity: 0.6,
                    }}
                    numberOfLines={1}>
                    {row.content}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.primary,
                  }}
                  numberOfLines={1}>
                  {row.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );


  // console.log(sections);
  

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
            justifyContent: 'flex-start',
            gap: 30,
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: couleurs.primary,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.white} />
          </TouchableOpacity>
          <Text
            style={{
              color: couleurs.white,
              fontSize: 18,
              fontFamily: CustomFont.Poppins,
            }}>
            {title}
          </Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          {/* Banner Image */}
          <View style={{paddingHorizontal: 12, marginTop: 5, width: '100%'}}>
            <Image
              source={
                VendeurData.logo
                  ? {uri: 'data:image/png;base64,' + VendeurData.logo}
                  : require('../assets/images/1.jpg')
              }
              style={{
                height: 200,
                width: '100%',
                borderRadius: 15,
                marginTop: 2,
              }}
            />
          </View>

          <View
            style={{
              borderRadius: 15,
              width: '100%',
              position: 'absolute',
              top: 145,
              left: 0,
              paddingHorizontal: 24,
              zIndex: 10
            }}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: couleurs.primary,
                padding: 14,
                width: '100%',
                shadowColor: 'gray',
                height: 155,
              }}>
              <Text
                style={{
                  color: couleurs.white,
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                {VendeurData.nom}
              </Text>
              <Text
                style={{
                  color: couleurs.white,
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 14,
                  fontFamily: CustomFont.Poppins,
                }}>
                {VendeurData.email}
              </Text>
              <Text
                style={{
                  color: couleurs.white,
                  paddingVertical: 3,
                  fontSize: 16,
                  fontFamily: CustomFont.Poppins,
                }}>
                {VendeurData.mobile}
              </Text>

              <View style={{display: 'flex', flexDirection: 'row'}}>
                {isConsulting && (
                  <AirbnbRating
                    reviewSize={4}
                    reviewColor={couleurs.primary}
                    showRating={false}
                    count={4}
                    reviews={['Terrible', 'Bad', 'Good', 'Very Good']}
                    onFinishRating={rate => console.log(rate)}
                    defaultRating={VendeurData.note}
                    size={14}
                  />
                )}
              </View>

              <View
                style={{
                  backgroundColor: couleurs.white,
                  padding: 10,
                  borderRadius: 14,
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                }}>
                {!isConsulting && <EditIcon />}
                {isConsulting && (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${VendeurData.mobile}`)}>
                    <CallIcon color={couleurs.primary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <View
            style={{marginHorizontal: 12, marginBottom: 10, marginTop: 100}}>
            {/* SALON OVERVIEW */}

            {sections.length > 0 && (
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 15,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                  width: '100%',
                  textAlign: 'center',
                }}>
                Choisir une prestation a reserver
              </Text>
            )}

            <View style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              gap: 10,
              borderRadius: 15,
              backgroundColor: '#fff',
              padding: 14,
              width: '100%',
              alignSelf: 'center',
              shadowColor: 'gray'
            }}>
            {sections.map((row: any, i: any) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate('personnalisation_reservation_creneau', {
                    props: {...row, vendeur_id:route.params?.vendeur_data?.id,},
                  })
                }>
                <View
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderBottomColor: 'rgba(0,0,0,.1)',
                    borderBottomWidth: sections.length != i + 1 ? 1 : 0,
                    paddingVertical: 6                    
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      flexDirection: 'column',
                      width:'100%'

                    }}>
                    <View style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      width:'100%'
                    }}>
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 15,
                        color: couleurs.dark,
                      }}
                      numberOfLines={1}>
                      Produit
                    </Text>
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 15,
                        color: couleurs.primary,
                      }}
                      numberOfLines={2}>
                      {row.produit}
                    </Text>
                    </View>

                    <View style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      width:'100%'
                    }}>
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 15,
                        color: couleurs.dark,
                      }}
                      numberOfLines={1}>
                      Duree de la prestation
                    </Text>
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.primary,
                      }}
                      numberOfLines={1}>
                      {row.duree}
                    </Text>
                    </View>

                    <View style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      width:'100%'
                    }}>
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 15,
                        color: couleurs.dark,
                      }}
                      numberOfLines={1}>
                      Montant de la prestation
                    </Text>
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.primary,
                      }}
                      numberOfLines={1}>
                      {row.prix} {row.devise}
                    </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            </View>

            {sections.length == 0 && (
              <View>
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: couleurs.primary,
                    paddingHorizontal: 30,
                    borderRadius: 10,
                    width: '100%',
                    height: 40,
                  }}>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      position: 'relative',
                      bottom: -3,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                    }}
                    onPress={() =>
                      navigation.navigate('simple_rdv', {
                        id: VendeurData.id,
                      })
                    }>
                    <Text
                      style={{
                        textAlign: 'center',
                        padding: 5,
                        fontSize: 15,
                        color: couleurs.white,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      Prendre un rendez-vous
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View
              style={{
                marginTop: 10,
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                gap: 10,
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                Membre depuis
              </Text>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                {VendeurData.creation}
              </Text>
            </View>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 17,
                  fontFamily: CustomFont.Poppins,
                }}>
                Adresse
              </Text>

              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 14,
                  fontFamily: CustomFont.Poppins,
                  opacity: 0.8,
                }}>
                {VendeurData.pays}
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 14,
                  fontFamily: CustomFont.Poppins,
                }}>
                {VendeurData.adresse}
              </Text>
            </View>

            <View
              style={{
                marginTop: 10,
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
              }}>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 16,
                  fontFamily: CustomFont.Poppins,
                }}>
                Heure d'ouverture
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  marginTop: 10,
                  gap: 5,
                }}>
                {horaires.map((row: any, key: any) => (
                  <View
                    key={key}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 4,
                      backgroundColor: '#fff',
                      padding: 5,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        backgroundColor: couleurs.primary,
                        padding: 6,
                        borderRadius: 10,
                        width: 106,
                      }}>
                      <Text
                        style={{
                          color: couleurs.white,
                          fontFamily: CustomFont.Poppins,
                        }}>
                        {row.jour}
                      </Text>
                      <Text
                        style={{
                          color: couleurs.white,
                          fontSize: 11,
                          fontFamily: CustomFont.Poppins,
                        }}>
                        {row.ouverture}-{row.fermeture}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                marginBottom: 100,
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
              }}>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                Lien reseaux sociaux
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginTop: 20,
                }}>
                <Image
                  source={require('../assets/social/facebook.png')}
                  style={{width: 35, height: 35}}
                />

                <Image
                  source={require('../assets/social/twitter.png')}
                  style={{width: 35, height: 35}}
                />

                <Image
                  source={require('../assets/social/instagram.png')}
                  style={{width: 35, height: 35}}
                />

                <Image
                  source={require('../assets/social/linkedin.png')}
                  style={{width: 35, height: 35}}
                />

                <Image
                  source={require('../assets/social/youtube.png')}
                  style={{width: 35, height: 35}}
                />
                
              </View>
            </View>
          </View>

          {/* Welcome text */}
        </ScrollView>
        {isConsulting && (
          <View
            style={{
              alignItems: 'center',
              marginVertical: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              position: 'absolute',
              backgroundColor: couleurs.white,
              paddingVertical: 7,
              width: '100%',
              bottom: -10,
            }}>

            <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: couleurs.primary,
                    paddingHorizontal: 10,
                    borderRadius: 30,
                    height: 40,
                  }}>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      position: 'relative',
                      bottom: -3,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                    }}
                    onPress={() =>
                      navigation.navigate('simple_rdv', {
                        id: VendeurData.id,
                      })
                    }>
                    <Text
                      style={{
                        textAlign: 'center',
                        padding: 5,
                        fontSize: 14,
                        color: couleurs.white,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      Prendre un RDV
                    </Text>
                  </TouchableOpacity>
                </View>
            <TouchableOpacity
              style={{
                padding: 8,
                backgroundColor: couleurs.primary,
                borderRadius: 30,
              }}
              onPress={() => Linking.openURL(`tel:${VendeurData.mobile}`)}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  gap: 5,
                }}>
                <CallIcon color={'#fff'} />
              </View>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: couleurs.primary,
                borderRadius: 30,
                paddingHorizontal: 15,
                height: 40,
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  position: 'relative',
                  bottom: -3,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
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
          </View>
        )}

        {/* MODAL RENDEZ-VOUS */}
        <Modal visible={isVisibleModal} transparent={true} style={{flex: 1}}>
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
                borderRadius: 15,
                padding: 10,
                width: '100%',
              }}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: 'rgba(0,0,0,.7)',
                  fontFamily: CustomFont.Poppins,
                }}>
                Prendre un rendez-vous
              </Text>
              <View style={{width: '100%', paddingHorizontal: 10}}>
                <View style={{height: 450}}>
                  <ScrollView>
                    {/* prestation selectionnee */}
                    <View>
                      <View style={{paddingVertical: 10}}>
                        <Text
                          style={{
                            fontWeight: '400',
                            fontSize: 15,
                            paddingLeft: 5,
                            paddingBottom: 12,
                            color: '#000',
                            fontFamily: CustomFont.Poppins,
                          }}>
                          Prestation selectionnee
                        </Text>
                      </View>

                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          width: '100%',
                          height: 40,
                          borderColor: couleurs.primary,
                        }}>
                        <Picker
                          style={{position: 'relative', bottom: 8}}
                          selectedValue={selectedCategorie}
                          onValueChange={(itemValue: any, itemIndex: any) =>
                            setSelectedCategorie(itemValue)
                          }>
                          {sous_categories.map((row, i) => (
                            <Picker.Item key={i} label={row} value={row} />
                          ))}
                        </Picker>
                      </View>
                    </View>

                    {/* date rdv */}
                    <View>
                      <View style={{paddingVertical: 10}}>
                        <Text
                          style={{
                            fontWeight: '400',
                            fontSize: 15,
                            paddingLeft: 5,
                            paddingBottom: 12,
                            color: '#000',
                            fontFamily: CustomFont.Poppins,
                          }}>
                          Quel jour ?
                        </Text>
                      </View>

                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          width: '100%',
                          height: 40,
                          borderColor: couleurs.primary,
                        }}>
                        <Picker
                          style={{position: 'relative', bottom: 8}}
                          selectedValue={selectedJour}
                          onValueChange={(itemValue: any, itemIndex: any) =>
                            setSelectedJour(itemValue)
                          }>
                          {planning.map((row, i) => (
                            <Picker.Item key={i} label={row} value={row} />
                          ))}
                        </Picker>
                      </View>
                    </View>

                    {/* date rdv */}
                    <View>
                      <View style={{paddingVertical: 10}}>
                        <Text
                          style={{
                            fontWeight: '400',
                            fontSize: 15,
                            paddingLeft: 5,
                            paddingBottom: 12,
                            color: '#000',
                            fontFamily: CustomFont.Poppins,
                          }}>
                          A quelle heure ?
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => setVisibleHeureModal(true)}>
                        <View
                          style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            width: '100%',
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
                  </ScrollView>
                </View>

                <View
                  style={{
                    padding: 15,
                    justifyContent: 'space-between',
                    paddingVertical: 30,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={desactiveModal}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      justifyContent: 'flex-start',
                    }}>
                    <CloseIcon color={couleurs.primary} />
                    <Text
                      style={{
                        color: 'rgba(100,100,100,.8)',
                        fontFamily: CustomFont.Poppins,
                      }}>
                      Quitter
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      backgroundColor: couleurs.primary,
                      borderRadius: 30,
                    }}
                    onPress={() => null}>
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        gap: 5,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          padding: 10,
                          paddingHorizontal: 20,
                          fontSize: 14,
                          fontFamily: CustomFont.Poppins,
                          color: couleurs.secondary,
                        }}>
                        valider le RDV
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      {/* MODAL TIME PICKER */}
      <TimePickerModal
        visible={visibleHeureModal}
        onDismiss={onDismissHeureModal}
        onConfirm={onConfirmHeureModal}
        hours={12}
        minutes={14}
        inputFontSize={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
