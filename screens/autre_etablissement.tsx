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
  Modal
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import EditIcon from '../components/Edit';
import CallIcon from '../components/call';
import RdvIcon from '../components/rdv';
import { AirbnbRating} from 'react-native-ratings';
import CloseIcon from '../components/close';
import {CustomFont, couleurs} from '../components/color';
import { TimePickerModal } from 'react-native-paper-dates';
import {Picker} from '@react-native-picker/picker';
import planning from '../components/api/planning';
import { sous_categories } from '../components/api/categories';

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

   ///////////////////////////////////////////////////
   const [visibleHeureModal, setVisibleHeureModal] = React.useState(false);

   const onDismissHeureModal = () => {
     setVisibleHeureModal(false);
   };
 
   const onConfirmHeureModal = ({hours, minutes}: {hours: any; minutes: any}) => {
     setVisibleHeureModal(false);
     console.log({hours, minutes});
   };

   //////////////////////////////////////////////////
   const [selectedJour, setSelectedJour] = useState();
   const [selectedCategorie, setSelectedCategorie] = useState();


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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.primary} />
          </TouchableOpacity>
          <Text style={{color: '#000', fontSize: 18 , fontFamily:CustomFont.Poppins,}}>
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
                  fontFamily:CustomFont.Poppins,
                }}>
                Salon beaute plus
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 15,
                 fontFamily:CustomFont.Poppins,
                }}>
                hisoka.tegiro@gmail.com
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                 fontFamily:CustomFont.Poppins,
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
                    backgroundColor: couleurs.primary,
                    padding: 10,
                    borderRadius: 15,
                    position:'absolute',
                    bottom:20,
                    right:20
                  }}>
                  {!isConsulting && <EditIcon />}
                  {isConsulting && (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(`tel:242069500886`)}>
                      <CallIcon color={'#fff'} />
                    </TouchableOpacity>
                  )}
                </View>
            </View>

          </View>

          

          <View
            style={{marginHorizontal: 12, marginBottom: 10, marginTop: 120}}>
            
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                gap: 10,
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
                  fontSize: 15,
                  fontFamily:CustomFont.Poppins,
                }}>
                Client depuis
              </Text>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily:CustomFont.Poppins,
                }}>
                14-02-2023
              </Text>
            </View>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf:'center',
                shadowColor: 'gray',
                marginTop:10
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 17,
                  fontFamily:CustomFont.Poppins,
                }}>
                Adresse
              </Text>

              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontFamily:CustomFont.Poppins,
                  opacity: 0.8,
                  marginTop:10
                }}>
                Republique du Congo
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 15,
                  fontFamily:CustomFont.Poppins,
                }}>
                Brazzaville, vers boulevrd denis
              </Text>
            </View>


            <View
              style={{
                marginTop:10,
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
                  fontFamily:CustomFont.Poppins,
                }}>
                Heure d'ouverture
              </Text>

              <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent:'flex-start',
                marginTop:10,
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
                    <Text style={{color: couleurs.white,fontFamily:CustomFont.Poppins,}}>Mercredi</Text>
                    <Text style={{color: couleurs.white, fontSize: 11,fontFamily:CustomFont.Poppins,}}>
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
                  fontFamily:CustomFont.Poppins,
                }}>
                Lien reseaux sociaux
              </Text>

              <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
                marginTop:20
              }}>
    
                <Image source={ require('../assets/social/facebook.png')} 
                style={{width:35, height: 35}} />

                <Image source={ require('../assets/social/twitter.png')} 
                                style={{width:35, height: 35}} />

                <Image source={ require('../assets/social/instagram.png')} 
                                style={{width:35, height: 35}} />

                <Image source={ require('../assets/social/linkedin.png')} 
                                style={{width:35, height: 35}} />

                <Image source={ require('../assets/social/youtube.png')} 
                                style={{width:35, height: 35}} />
       
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
              gap: 30,
              position:'absolute',
              backgroundColor:couleurs.white,
              paddingVertical:7,
              width:'100%',
              bottom:-10
            }}>
            <TouchableOpacity
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
            </TouchableOpacity>
            <TouchableOpacity
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
                    fontFamily:CustomFont.Poppins,
                  }}>
                  Prendre un RDV
                </Text>
              </View>
            </TouchableOpacity>
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
                padding: 10,width:'100%'
              }}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: 'rgba(0,0,0,.7)',
                  fontFamily:CustomFont.Poppins,
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
                            paddingLeft:5,
                            paddingBottom: 12,
                            color: '#000',
                            fontFamily:CustomFont.Poppins,
                          }}>
                          Prestation selectionnee
                        </Text>
                      </View>

                      <View style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            width: '100%',
                            height: 40,
                            borderColor: couleurs.primary,
                          }}>
                          <Picker
                          style={{position:'relative', bottom:8}}
                          selectedValue={selectedCategorie}
                          onValueChange={(itemValue:any, itemIndex:any) =>
                            setSelectedCategorie(itemValue)
                          }>
                          {sous_categories.map( (row, i) => (<Picker.Item key={i} label={row} value={row} />))
                          }
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
                            paddingLeft:5,
                            paddingBottom: 12,
                            color: '#000',
                            fontFamily:CustomFont.Poppins,
                          }}>
                          Quel jour ?
                        </Text>
                      </View>

                      

                      <View style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            width: '100%',
                            height: 40,
                            borderColor: couleurs.primary,
                          }}>
                          <Picker
                          style={{position:'relative', bottom:8}}
                          selectedValue={selectedJour}
                          onValueChange={(itemValue:any, itemIndex:any) =>
                            setSelectedJour(itemValue)
                          }>
                          {planning.map( (row, i) => (<Picker.Item key={i} label={row} value={row} />))
                          }
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
                            paddingLeft:5,
                            paddingBottom: 12,
                            color: '#000',
                            fontFamily:CustomFont.Poppins,
                          }}>
                          A quelle heure ?
                        </Text>
                      </View>

                      <TouchableOpacity onPress={() => setVisibleHeureModal(true)}>
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
                    <Text style={{color: 'rgba(100,100,100,.8)',fontFamily:CustomFont.Poppins,}}>Quitter</Text>
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
                          fontFamily:CustomFont.Poppins,
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
