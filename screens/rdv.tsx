import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Slider,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import {CustomFont, couleurs} from '../components/color';
import {sous_categories} from '../components/api/categories';

export default function Rdv({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
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
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: couleurs.primary,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.white} />
          </Pressable>
          <Text
            style={{
              color: couleurs.white,
              fontSize: 16,
              fontFamily: CustomFont.Poppins,
            }}>
            Mes rendez-vous
          </Text>
        </View>

        {/* NAV */}
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 10,
            height: 50,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View>
            <Text>Passé</Text>
          </View>
          <View>
            <Text>Hier</Text>
          </View>
          <View
            style={{
              backgroundColor: couleurs.primary,
              borderRadius: 20,
              padding: 10,
            }}>
            <Text style={{color: couleurs.white}}>Aujourd'hui</Text>
          </View>

          <View>
            <Text>Démain</Text>
          </View>
          <View>
            <Text>A vénir</Text>
          </View>
        </View>

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View style={{marginHorizontal: 12, marginVertical: 10}}>
            <View>
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
                    fontSize: 14,
                    fontFamily: CustomFont.Poppins,
                    opacity: 0.8,
                  }}>
                  {sous_categories[0]}
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
                      fontSize: 14,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Lundi .
                  </Text>
                  <Text
                    style={{
                      color: couleurs.primary,
                      paddingVertical: 3,
                      fontSize: 13,
                      fontFamily: CustomFont.Poppins,
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
                      fontSize: 13,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    14,00 $
                  </Text>

                  <Pressable onPress={() => null}>
                    <Text
                      style={{
                        color: couleurs.primary,
                        paddingVertical: 3,
                        fontSize: 14,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      Valider
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View
                style={{height: 1, overflow: 'hidden', paddingHorizontal: 10}}>
                <View
                  style={{
                    height: 1,
                    borderWidth: 1,
                    borderColor: couleurs.primary,
                    borderStyle: 'dashed',
                  }}></View>
              </View>
            </View>

            <View style={{
                  marginTop:10}}>
              <View
                style={{
                  borderRadius: 15,
                  backgroundColor: '#fff',
                  padding: 14,
                  width: '100%'
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 14,
                    fontFamily: CustomFont.Poppins,
                    opacity: 0.8,
                  }}>
                  {sous_categories[0]}
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
                      fontSize: 14,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Lundi .
                  </Text>
                  <Text
                    style={{
                      color: couleurs.primary,
                      paddingVertical: 3,
                      fontSize: 13,
                      fontFamily: CustomFont.Poppins,
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
                      fontSize: 13,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    14,00 $
                  </Text>

                  <Pressable onPress={() => null}>
                    <Text
                      style={{
                        color: couleurs.primary,
                        paddingVertical: 3,
                        fontSize: 14,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      Valider
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View
                style={{height: 1, overflow: 'hidden', paddingHorizontal: 10}}>
                <View
                  style={{
                    height: 1,
                    borderWidth: 1,
                    borderColor: couleurs.primary,
                    borderStyle: 'dashed',
                  }}></View>
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
