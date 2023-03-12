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

export default function BilanReservation({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
    var data = route.params

  console.log(data);

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
            Recapitulatif de la reservation
          </Text>
        </View>

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View style={{marginHorizontal: 12, marginVertical: 10, borderRadius:20, backgroundColor:'#fff', padding: 20}}>
            <View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  borderBottomWidth:1,
                  borderStyle:'solid',
                  borderColor:'#ddd',
                  paddingVertical:20,
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 15,
                    color: couleurs.primary,
                  }}
                  numberOfLines={1}>
                  Type de prestation
                </Text>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color: couleurs.dark,
                    opacity: 0.6,
                  }}>
                  {data.props.prestation.content} 
                </Text>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color: couleurs.dark,
                    opacity: 0.6,
                  }}>
                  {data.props.prestation.title}
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  borderBottomWidth:1,
                  paddingVertical:20,
                  borderStyle:'solid',
                  borderColor:'#ddd'
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 15,
                    color: couleurs.primary,
                  }}
                  numberOfLines={1}>
                  detail de prestation
                </Text>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color: couleurs.dark,
                    opacity: 0.6,
                  }}
                  numberOfLines={1}>
                  {data.props.detail_prestation.title}
                </Text>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color: couleurs.dark,
                    opacity: 0.6,
                  }}
                  numberOfLines={1}>
                  {data.props.detail_prestation.subtitle}
                </Text>

                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 15,
                    color: couleurs.primary,
                  }}
                  numberOfLines={1}>
                  {data.props.detail_prestation.price}
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  paddingVertical:20,
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 15,
                    color: couleurs.primary,
                  }}
                  numberOfLines={1}>
                  creneau de la prestation
                </Text>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color: couleurs.dark,
                    opacity: 0.6,
                  }}
                  numberOfLines={1}>
                  {data.creneau.date} a {data.creneau.heure }
                </Text>
              </View>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
