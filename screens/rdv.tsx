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
import { CustomFont, couleurs } from '../components/color';

export default function Rdv({navigation, route}: {navigation: any, route:any}) {

  
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
          <Text style={{color: couleurs.primary, fontSize: 18, fontFamily: CustomFont.Poppins}}>
            Mes rendez-vous
          </Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
        
          {/* <View style={{marginHorizontal: 12, marginBottom: 60}}>
           {route.params.rdvs.map( (row:any,key:any) => (<View>
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
                  fontFamily: CustomFont.Poppins,
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
                    fontFamily: CustomFont.Poppins
                  }}>
                  Lundi .
                </Text>
                <Text
                  style={{
                    color: couleurs.primary,
                    paddingVertical: 3,
                    fontSize: 14,
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
                    fontSize: 15,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Maquillage
                </Text>

                <Pressable onPress={() => null}>
                  <Text
                    style={{
                      color: couleurs.primary,
                      paddingVertical: 3,
                      fontSize: 15,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Annuler
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={{height:1, overflow:'hidden', paddingHorizontal:10}}>
              <View style={{height:1,  borderWidth:1, borderColor:couleurs.primary, borderStyle:'dashed'}}></View>
            </View>
           </View>)) }


          </View> */}

          {/* Welcome text */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
