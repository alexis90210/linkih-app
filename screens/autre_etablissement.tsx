import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  Modal,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import EditIcon from '../components/Edit';
import CallIcon from '../components/call';
import RdvIcon from '../components/rdv';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CloseIcon from '../components/close';
import AddIcon from '../components/add';
import MinusIcon from '../components/minus';
import {couleurs} from '../components/color';
import ShopIcon from '../components/shop';

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

  const [isVisibleModal, setVisibleModal] = useState(false);

  const activeModal = () => setVisibleModal(true);
  const desactiveModal = () => setVisibleModal(false);




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
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.primary} />
          </Pressable>
          <Text style={{color: '#000', fontSize: 18, fontWeight: '700'}}>
            {title}
          </Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          {/* Banner Image */}
          <View style={{paddingHorizontal: 12, width: '100%'}}>
            <Image
              source={require('../assets/images/1.jpg')}
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
              zIndex: 10,
            }}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                shadowColor: 'gray',
                height: 155,
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Salon beaute plus
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                hisoka.tegiro@gmail.com
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                06 950 0886
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
                    defaultRating={3}
                    size={14}
                  />
                )}
              </View>
              <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                Client depuis
              </Text>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                14-02-2023
              </Text>
            </View>
            <View
                  style={{
                    backgroundColor: couleurs.primary,
                    padding: 10,
                    borderRadius: 15,
                    position:'absolute',
                    bottom:20,
                    right:20
                  }}>
                  {!isConsulting && <EditIcon />}
                  {isConsulting && (
                    <Pressable
                      onPress={() => Linking.openURL(`tel:242069500886`)}>
                      <CallIcon color={'#fff'} />
                    </Pressable>
                  )}
                </View>
            </View>

          </View>

          <View
            style={{marginHorizontal: 12, marginBottom: 10, marginTop: 120}}>
            
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf:'center',
                shadowColor: 'gray',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Adresse
              </Text>

              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                Republique du Congo
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                Brazzaville, vers boulevrd denis
              </Text>
            </View>


            <View
              style={{
                marginTop:20,
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf:'center',
                shadowColor: 'gray',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Heure d'ouverture
              </Text>

              <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent:'flex-start',
                gap: 5,
              }}>
              {[1, 1, 1, 1, 1, 1, 1].map((row, key) => (
                <View
                  key={Math.random()}
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
                      width:106,
                    }}>
                    <Text style={{color: couleurs.white}}>Mercredi</Text>
                    <Text style={{color: couleurs.white, fontSize: 11}}>
                      08h-12h
                    </Text>
                  </View>
                  {/* <CloseIcon color={couleurs.primary} /> */}
                </View>
              ))}
            </View>

            </View>


            <View
              style={{
                marginTop:20,
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf:'center',
                shadowColor: 'gray',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Lien reseaux sociaux
              </Text>

              <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
              }}>
    
                <Image source={ require('../assets/social/facebook.png')} 
                style={{width:60, height: 60}} />

                <Image source={ require('../assets/social/twitter.png')} 
                                style={{width:60, height: 60}} />

                <Image source={ require('../assets/social/instagram.png')} 
                                style={{width:60, height: 60}} />

                <Image source={ require('../assets/social/linkedin.png')} 
                                style={{width:60, height: 60}} />

                <Image source={ require('../assets/social/youtube.png')} 
                                style={{width:60, height: 60}} />
       
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
              marginHorizontal: 50,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 30,
            }}>
            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                padding: 8,
                backgroundColor: couleurs.primary,
                borderRadius: 30,
              }}
              onPress={() => Linking.openURL('tel:2522334444')}>
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
            </Pressable>
            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                paddingHorizontal: 30,
                width: 230,
                backgroundColor: couleurs.primary,
                borderRadius: 30,
              }}
              onPress={() => setVisibleModal(true)}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  gap: 5,
                }}>
                <RdvIcon color={'#fff'} />
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#fff',
                  }}>
                  Prendre un RDV
                </Text>
              </View>
            </Pressable>
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
                width: '90%',
                borderRadius: 15,
                padding: 10,
              }}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: 'rgba(0,0,0,.7)',
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
                            fontWeight: '700',
                            fontSize: 15,
                            paddingBottom: 12,
                            color: '#000',
                          }}>
                          1. Prestation selectionnee
                        </Text>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 10,
                          backgroundColor: 'rgba(230,230,230,.2)',
                          marginVertical: 10,
                          borderRadius: 10,
                          padding: 10,
                          alignItems: 'center',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            padding: 10,
                            paddingVertical: 5,
                            borderRadius: 50,
                          }}>
                          <Text style={{color: '#000'}}>
                            Cliquez pour selectionner
                          </Text>
                        </View>

                        <AddIcon color={couleurs.primary} />
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: 4,
                          marginBottom: 40,
                        }}>
                        {[1, 1, 1, 1].map((row, key) => (
                          <View style={{width: '100%'}}>
                            <View
                              key={Math.random()}
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 10,
                                backgroundColor: 'transparent',
                                padding: 5,
                                paddingHorizontal: 12,
                                borderRadius: 15,
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 1,
                                  padding: 10,
                                  paddingVertical: 5,
                                  borderRadius: 50,
                                }}>
                                <Text style={{color: '#000'}}>Ongle</Text>
                              </View>
                              <MinusIcon color={'red'} />
                            </View>
                            <View
                              style={{
                                height: 1,
                                width: '100%',
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
                          </View>
                        ))}
                      </View>
                    </View>

                    {/* date rdv */}
                    <View>
                      <View style={{paddingVertical: 10}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: 15,
                            paddingBottom: 12,
                            color: '#000',
                          }}>
                          2. Horaire
                        </Text>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 10,
                          backgroundColor: 'rgba(230,230,230,.2)',
                          marginVertical: 10,
                          borderRadius: 10,
                          padding: 10,
                          alignItems: 'center',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            padding: 10,
                            paddingVertical: 5,
                            borderRadius: 50,
                          }}>
                          <Text style={{color: '#000'}}>
                            Cliquez pour selectionner
                          </Text>
                        </View>

                        <AddIcon color={couleurs.primary} />
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: 4,
                          marginBottom: 40,
                        }}>
                        {[1, 1].map((row, key) => (
                          <View style={{width: '100%'}}>
                            <View
                              key={Math.random()}
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 10,
                                backgroundColor: 'transparent',
                                padding: 5,
                                paddingHorizontal: 12,
                                borderRadius: 15,
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 1,
                                  padding: 10,
                                  paddingVertical: 5,
                                  borderRadius: 50,
                                }}>
                                <Text style={{color: '#000'}}>Lundi</Text>
                                <Text style={{color: couleurs.primary}}>
                                  14h
                                </Text>
                              </View>
                              <MinusIcon color={'red'} />
                            </View>
                            <View
                              style={{
                                height: 1,
                                width: '100%',
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
                          </View>
                        ))}
                      </View>
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
                  <Pressable
                    onPress={desactiveModal}
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

                  <Pressable
                    android_ripple={{color: '7B4C7A'}}
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
                          fontWeight: '500',
                          color: couleurs.secondary,
                        }}>
                        valider le RDV
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
