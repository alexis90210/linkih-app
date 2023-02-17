import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  PixelRatio,
  TextInput,
} from 'react-native';
import CloseIcon from '../components/close';
import { couleurs } from '../components/color';

// InscriptionProprietaireScreen2
export default function InscriptionProprietaireScreen2({
  navigation,
}: {
  navigation: any;
}) {
  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f6f6f6f6',
        }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View style={{marginTop: 20}}></View>
          <View style={{paddingVertical: 10}}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 15,
                paddingBottom: 12,
                color: '#000',
                paddingLeft: 20,
              }}>
              Adresse de l'etablissement
            </Text>
            <View style={{backgroundColor: '#fff', paddingLeft: 20}}>
              <TextInput  style={{color:'#7B4C7A', fontWeight:'500'}}  placeholderTextColor={'rgba(100,100,100,.7)'}  placeholder="Entrez votre adresse"></TextInput>
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
              Categories selectionnees
            </Text>
            <View style={{backgroundColor: '#fff', paddingLeft: 20}}>
              <TextInput  style={{color:'#7B4C7A', fontWeight:'500'}}  placeholderTextColor={'rgba(100,100,100,.7)'}  placeholder="choisir ..."></TextInput>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 4,
              paddingHorizontal: 10,
            }}>
            {[1, 1, 1, 1, 1, 1, 1, 1].map((row, key) => (
              <View
                key={key}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 50,
                }}>
                <Text style={{color: '#000'}}>Categorie 1</Text>
                <CloseIcon color={'#841584'} />
              </View>
            ))}
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
            <View style={{backgroundColor: '#fff', paddingLeft: 20}}>
              <TextInput  style={{color:'#7B4C7A', fontWeight:'500'}}  placeholderTextColor={'rgba(100,100,100,.7)'}  placeholder="choisir ..."></TextInput>
            </View>
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
                <CloseIcon color={'#841584'} />
              </View>
            ))}
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
              Lien reseaux sociaux
            </Text>
            <View style={{backgroundColor: '#fff', paddingLeft: 20}}>
              <TextInput  style={{color:'#7B4C7A', fontWeight:'500'}}  placeholderTextColor={'rgba(100,100,100,.7)'}  placeholder="choisir ..."></TextInput>
            </View>
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
                <CloseIcon color={'#841584'} />
              </View>
            ))}
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#7B4C7A',
                borderRadius: 30,
                marginBottom: 30,
                height:45,
                width: '100%'
              }}>
              <Pressable
                android_ripple={{color: '7B4C7A'}}
                style={{
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                onPress={() => navigation.navigate('inscription_proprietaire_3')}>
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    fontWeight: '500',
                    color: couleurs.secondary,
                  }}>
                  Valider
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
