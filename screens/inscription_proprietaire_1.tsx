import React, {useState} from 'react';

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
import EyeSlashIcon from '../components/eye_slash';
import EyeIcon from '../components/eye';
import {couleurs} from '../components/color';

// InscriptionProprietaireScreen1
export default function InscriptionProprietaireScreen1({
  navigation,
}: {
  navigation: any;
}) {
  var [isVisible, setVisible] = useState(false);

  const _setVisible = () => {
    if (isVisible) setVisible(false);
    if (!isVisible) setVisible(true);
  };
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                marginVertical: 10,
                backgroundColor: '#fff',
                borderRadius: 11,
                padding: 20,
                width: '90%',
                marginTop: 10,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 15,
                    height: 30,
                    opacity: 0.85,
                  }}>
                  Nom entreprise
                </Text>
                <TextInput
                  placeholderTextColor={'rgba(100,100,100,.7)'}
                  placeholder="Entrez le nom entreprise"
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    width: '100%',
                    fontWeight: '600',
                    padding: 10,
                  }}></TextInput>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop:20
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 15,
                    height: 30,
                    opacity: 0.85,
                  }}>
                 Email
                </Text>
                <TextInput
                  placeholderTextColor={'rgba(100,100,100,.7)'}
                  placeholder="Entrez l'email entreprise"
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    width: '100%',
                    fontWeight: '600',
                    padding: 10,
                  }}></TextInput>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop:20
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 15,
                    height: 30,
                    opacity: 0.85,
                  }}>
                 Mobile
                </Text>
                <TextInput
                  placeholderTextColor={'rgba(100,100,100,.7)'}
                  placeholder="Entrez le mobile entreprise"
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    width: '100%',
                    fontWeight: '600',
                    padding: 10,
                  }}></TextInput>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 20,
                  marginBottom: 40,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 15,
                    height: 30,
                    opacity: 0.85,
                  }}>
                  Mot de passe
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    flexWrap: 'nowrap',
                  }}>
                  <TextInput
                    textContentType="password"
                    keyboardType="default"
                    secureTextEntry={!isVisible}
                    placeholderTextColor={'rgba(100,100,100,.7)'}
                    placeholder="Entrer votre mot de Passe..."
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: '#E2C6BB',
                      color: '#7B4C7A',
                      fontWeight: '600',
                      width: '93%',
                      padding: 10,
                    }}></TextInput>
                  <Pressable style={{padding: 15}} onPress={_setVisible}>
                    {isVisible && <EyeSlashIcon />}
                    {!isVisible && <EyeIcon />}
                  </Pressable>
                </View>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#7B4C7A',
                  borderRadius: 30,
                  marginBottom: 20,
                }}>
                <Pressable
                  android_ripple={{color: '7B4C7A'}}
                  style={{
                    paddingHorizontal: 10,
                    width: '70%',
                  }}
                  onPress={() =>
                    navigation.navigate('inscription_proprietaire_2')
                  }>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 14,
                      fontWeight: '500',
                      color: couleurs.secondary,
                    }}>
                    Suivant
                  </Text>
                </Pressable>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                borderRadius: 30,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginVertical: 10,
              }}>
              <Pressable
                android_ripple={{color: '7B4C7A'}}
                style={{
                  paddingHorizontal: 10,
                }}
                onPress={() => null}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#841584',
                  }}>
                  Avez-vous besoin d'aide ?
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
