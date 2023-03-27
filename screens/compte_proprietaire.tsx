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
import { couleurs } from '../components/color';

export default function CompteProprietaire({navigation}: {navigation: any}) {
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
          <Pressable onPress={() => navigation.navigate('main')}>
            <ArrowLeftIcon color={couleurs.primary} />
          </Pressable>
          <Text style={{color: couleurs.dark, fontSize: 18, fontWeight: '700'}}>
            Mon etablissement
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
                  color: couleurs.dark,
                  paddingVertical: 3,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Hisoka Tegiro
              </Text>
              <Text
                style={{
                  color: couleurs.dark,
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 13,
                  fontWeight: '600',
                }}>
                hisoka.tegiro@gmail.com
              </Text>
              <Text
                style={{
                  color: couleurs.dark,
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
               <Pressable onPress={() => navigation.navigate('inscription_proprietaire_1', {
                updateEtab:true,
                vendeur_id:1
               })}>
                  <View
                    style={{
                      backgroundColor: couleurs.primary,
                      padding: 10,
                      borderRadius: 15,
                    }}>
                    <EditIcon />
                  </View>
               </Pressable>
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
                  color: couleurs.dark,
                  paddingVertical: 3,
                  fontSize: 13,
                  fontWeight: '600',
                }}>
                Client depuis
              </Text>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 13,
                  fontWeight: '600',
                }}>
                14-02-2023
              </Text>
            </View>

            <Text
              style={{
                color: couleurs.dark,
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
                  color: couleurs.dark,
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                Republique du Congo
              </Text>
              <Text
                style={{
                  color: couleurs.dark,
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 13,
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
                    color: couleurs.dark,
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
                    color: couleurs.dark,
                    paddingVertical: 3,
                    fontSize: 13,
                    fontWeight: '600',
                  }}>
                  expire le
                </Text>
                <Text
                  style={{
                    color: couleurs.primary,
                    paddingVertical: 3,
                    fontSize: 13,
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
                  color: couleurs.dark,
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
                    color: couleurs.dark,
                    paddingVertical: 3,
                    fontSize: 13,
                    fontWeight: '800',
                  }}>
                  13
                </Text>
                <Text
                  style={{
                    color: couleurs.primary,
                    paddingVertical: 3,
                    fontSize: 13,
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
                    color: couleurs.dark,
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
                      color: couleurs.primary,
                      paddingVertical: 3,
                      fontSize: 13,
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
                  color: couleurs.dark,
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
                    color: couleurs.dark,
                    paddingVertical: 3,
                    fontSize: 13,
                    fontWeight: '800',
                  }}>
                  Lundi .
                </Text>
                <Text
                  style={{
                    color: couleurs.primary,
                    paddingVertical: 3,
                    fontSize: 13,
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
                    color: couleurs.dark,
                    paddingVertical: 3,
                    fontSize: 13,
                    fontWeight: '600',
                  }}>
                  Maquillage
                </Text>

                <Pressable onPress={() => null}>
                  <Text
                    style={{
                      color: couleurs.primary,
                      paddingVertical: 3,
                      fontSize: 13,
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
                  color: couleurs.dark,
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
                    color: couleurs.dark,
                    paddingVertical: 3,
                    fontSize: 13,
                    fontWeight: '800',
                  }}>
                  Jeudi .
                </Text>
                <Text
                  style={{
                    color: couleurs.primary,
                    paddingVertical: 3,
                    fontSize: 13,
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
                    color: couleurs.dark,
                    paddingVertical: 3,
                    fontSize: 13,
                    fontWeight: '600',
                  }}>
                  Soin ongle
                </Text>

                <Pressable onPress={() => null}>
                  <Text
                    style={{
                      color: couleurs.primary,
                      paddingVertical: 3,
                      fontSize: 13,
                      fontWeight: '600',
                    }}>
                    Annuler
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Welcome text */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
