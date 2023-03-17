import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Slider,
  TouchableOpacity,
  Alert,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import {CustomFont, couleurs} from '../components/color';
import EyeIcon from '../components/eye';
import axios from 'axios';
import ApiService from '../components/api/service';

export default function AbonnementActivation({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  var abonnement: any = route.params;

  console.log(abonnement);

  const saveAbonnement = () => {

    navigation.navigate('paiement_screen')
    return
    
    axios({
      method: 'POST',
      url: ApiService.API_URL_ADD_ABONNEMENT_VENDEUR,
      data: JSON.stringify({
        vendeur_id: abonnement.vendeur_id,
        abonnement_id: abonnement.id,
        expiration: Date.now(),
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        if (api.code == 'success') {
          Alert.alert('', api.message);
        }
        if (api.code == 'error') {
          Alert.alert('', 'Erreur survenue');
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

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
            Abonnement
          </Text>
        </View>

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View style={{marginHorizontal: 5, marginVertical: 10}}>
            {/* ABONNEMENT */}
            <View
              style={{
                borderRadius: 15,
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontFamily: CustomFont.Poppins,
                  fontSize: 15,
                  paddingBottom: 12,
                  color: couleurs.dark,
                }}>
                Veuillez confirmer l'activation de l'abonnement suivant pour
                activer votre compte
              </Text>

              <View
                style={{
                  marginVertical: 10,
                  backgroundColor: couleurs.white,
                  borderTopRightRadius: 11,
                  borderBottomRightRadius: 11,
                  padding: 6,
                  marginTop: 10,
                  borderLeftWidth: 3,
                  borderColor: couleurs.primary,
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 15,
                    paddingBottom: 12,
                    color: couleurs.dark,
                  }}>
                  {abonnement.title}
                </Text>

                <Text
                  style={{
                    color: couleurs.primary,
                    fontSize: 15,
                  }}>
                  {abonnement.prix}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  backgroundColor: couleurs.primary,
                  borderRadius: 30,
                  width: '100%',
                  marginTop: 30,
                }}
                onPress={() => saveAbonnement()}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: 200,
                    gap: 5,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 15,
                      fontWeight: '500',
                      color: couleurs.secondary,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Valider
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Welcome text */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
