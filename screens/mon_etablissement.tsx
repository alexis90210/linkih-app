import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import EditIcon from '../components/Edit';
import CloseIcon from '../components/close';

export default function MonEtablissement({navigation}: {navigation: any}) {

  console.log( navigation);
  
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
            <ArrowLeftIcon />
          </Pressable>
          <Text style={{color: '#000', fontSize: 18, fontWeight: '700'}}>
            Mon Etablissement
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
              source={require('../assets/images/banner.jpeg')}
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

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <View
                  style={{
                    backgroundColor: '#841584',
                    padding: 10,
                    borderRadius: 15,
                  }}>
                  <EditIcon />
                </View>
              </View>
            </View>
          </View>

          <View style={{marginHorizontal: 12, marginBottom: 60, marginTop:120}}>
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
                  color: '#841584',
                  paddingVertical: 3,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                14-02-2023
              </Text>
            </View>

            <Text
              style={{
                color: '#000',
                paddingVertical: 3,
                fontSize: 16,
                fontWeight: '800',
                marginVertical: 15,
              }}>
              Adresse
            </Text>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
              }}>
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
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 16,
                    fontWeight: '800',
                    marginVertical: 15,
                  }}>
                  Mon abonnement
                </Text>
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
                  expire le
                </Text>
                <Text
                  style={{
                    color: '#841584',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  14-02-2023
                </Text>
              </View>
            </View>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                Pack Proprietaire
              </Text>
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
                    fontWeight: '800',
                  }}>
                  13
                </Text>
                <Text
                  style={{
                    color: '#841584',
                    paddingVertical: 3,
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  € TTC / mois
                </Text>
              </View>
            </View>


            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 16,
                    fontWeight: '800',
                    marginVertical: 15,
                  }}>
                  Mes Rendez-Vous
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Pressable onPress={() => navigation.navigate('rdv')}>
                  <Text
                    style={{
                      color: '#841584',
                      paddingVertical: 3,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    voir tout
                  </Text>
                </Pressable>
              </View>
            </View>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                Le grand Salon sud
              </Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  Lundi .
                </Text>
                <Text
                  style={{
                    color: '#841584',
                    paddingVertical: 3,
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  15:30:50
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  Maquillage
                </Text>

                <Pressable onPress={() => null}>
                  <Text
                    style={{
                      color: '#841584',
                      paddingVertical: 3,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    Annuler
                  </Text>
                </Pressable>
              </View>
            </View>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                borderTopWidth: 1,
                borderTopColor: '#f2f2f2',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                Le grand Salon Nord
              </Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  Jeudi .
                </Text>
                <Text
                  style={{
                    color: '#841584',
                    paddingVertical: 3,
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  15:30:50
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  Soin ongle
                </Text>

                <Pressable onPress={() => null}>
                  <Text
                    style={{
                      color: '#841584',
                      paddingVertical: 3,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    Annuler
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={{paddingVertical: 10}}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 15,
                paddingBottom: 12,
                color: '#000',
                paddingLeft: 20,
              }}>
              Heure d'ouverture
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
              paddingHorizontal: 5,
              marginBottom: 40,
            }}>
            {[1, 1, 1, 1, 1, 1, 1].map((row, key) => (
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
                  width: '31%',
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
                  <Text style={{color: '#000'}}>Mercredi</Text>
                  <Text style={{color: '#841584', fontSize: 11}}>08h-12h</Text>
                </View>
                {/* <CloseIcon color={'#841584'} /> */}
              </View>
            ))}
          </View>

            <View style={{paddingVertical: 10}}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 15,
                paddingBottom: 12,
                color: '#000',
                paddingLeft: 20,
              }}>
              Lien reseaux sociaux
            </Text>
           
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
              paddingHorizontal: 5,
              marginBottom: 40,
            }}>
            {[1, 1, 1, 1].map((row, key) => (
              <View
                key={key}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  backgroundColor: '#fff',
                  padding: 5,
                  paddingHorizontal: 15,
                  borderRadius: 50,
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 50,
                  }}>
                  <Text style={{color: '#000'}}>Facebook</Text>
                  <Text style={{color: '#841584', fontSize: 12}}>
                    https://facebook.com
                  </Text>
                </View>
                {/* <CloseIcon color={'#841584'} /> */}
              </View>
            ))}
          </View>
          </View>

          {/* Welcome text */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
