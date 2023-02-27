import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio,
  TextInput,
  ImageBackground,
  Image,
} from 'react-native';
import ShopIcon from '../components/shop';
import AccountIcon from '../components/account';
import EntrepreneurIcon from '../components/entrepreuneur';
import {CustomFont, couleurs} from '../components/color';

// IdentificationScreen
export default function IdentificationScreen({navigation}: {navigation: any}) {
  var pack = [
    {
      icon: <AccountIcon color={'#FFF'} />,
      title: 'Client',
      route: 'identification_client',
      color: couleurs.primary,
      bgColor: couleurs.primary
    },
    {
      icon: <ShopIcon color={'#FFF'} />,
      title: 'Societe ou Auto\nEntrepreuneur',
      route: 'identification_proprietaire',
      color: couleurs.primary,
      bgColor: couleurs.secondary
    },
    // {
    //   icon: <EntrepreneurIcon color={'#FFF'} />,
    //   title: 'Auto\nEntrepreuneur',
    //   route: 'identification_proprietaire',
    //   color: couleurs.primary,
    //   bgColor: "#413031"
    // },
  ];
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <ScrollView>
          <Image
            source={require('../assets/images/banner.jpeg')}
            style={{
              height: 200,
              width: '100%',
            }}
          />

          <View
            style={{
              flex: 1,
              padding: 10,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#fff',
              position:'relative',
              marginTop:-20,
              borderRadius:20,
            }}>
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 30,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Veuillez-vous identifier pour continuer
                </Text>
              </View>

              <ScrollView horizontal={true}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    gap: 10,
                    padding: 10,
                    borderTopWidth:1,
                    borderBottomWidth:1,
                    borderStyle:'dashed',
                    borderColor:couleurs.primary
                  }}>
                  {pack.map((row, key) =>(<TouchableOpacity
                   key={key}
                    style={{
                      borderRadius: 15,
                      paddingHorizontal: 10,
                      backgroundColor: row.bgColor,
                      borderWidth: 1.6,
                      borderColor: '#E2C6BB',
                      padding: 18,
                      width: 180,
                      height: 170,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      navigation.navigate(row.route)
                    }>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      {row.icon}
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#FFF',
                          fontWeight: 'normal',
                          fontSize: 15,
                          opacity: 0.85,
                          fontFamily:CustomFont.Poppins
                        }}>
                        {row.title}
                      </Text>
                    </View>
                  </TouchableOpacity>))}
                </View>
              </ScrollView>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 30,
                }}>
                <Text
                  style={{
                    color: couleurs.primary,
                    fontSize: 16,
                    textAlign:'center',
                    fontFamily: CustomFont.Poppins,
                  }}>
                  Je veux plus d'informations par rapport a l'identification
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
