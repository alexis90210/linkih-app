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
  Pressable,
} from 'react-native';
import ShopIcon from '../components/shop';
import AccountIcon from '../components/account';
import EntrepreneurIcon from '../components/entrepreuneur';
import {CustomFont, couleurs} from '../components/color';
import ArrowLeftIcon from '../components/ArrowLeft';

// IdentificationScreen
export default function IdentificationScreen({navigation}: {navigation: any}) {
  var pack = [
    {
      icon: <AccountIcon color={couleurs.white} />,
      title: 'Client',
      route: 'identification_client',
      props: 'ROLE_CLIENT',
      color: couleurs.primary,
      bgColor: couleurs.primary
    },
    {
      icon: <ShopIcon color={couleurs.dark} />,
      title: 'Societe',
      route: 'identification_proprietaire',
      props:'ROLE_SOCIETE',
      color: couleurs.dark,
      bgColor: couleurs.primaryLight
    },{
      icon: <ShopIcon color={couleurs.dark} />,
      title: 'Auto\nEntrepreuneur',
      route: 'identification_proprietaire',
      props:'ROLE_AUTO_ENTREPREUNEUR',
      color: couleurs.dark,
      bgColor: couleurs.primaryLight
    },
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
            source={require('../assets/images/1.jpg')}
            style={{
              height: 200,
              width: '100%',
            }}
          />

<View
        style={{
          borderRadius: 100,
          backgroundColor: couleurs.primary,
          padding: 10,
          margin: 4,
          position: 'absolute',
          top: 10,
          left: 10,
        }}>
        <Pressable
          onPress={() =>
            navigation.goBack()
          }>
          <ArrowLeftIcon color={'#fff'} />
        </Pressable>
      </View>
      
          <View
            style={{
              flex: 1,
              padding: 10,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: couleurs.white,
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
                  marginVertical:20,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
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
                    // borderTopWidth:1,
                    // borderBottomWidth:1,
                    // borderStyle:'dashed',
                    // borderColor:couleurs.primary
                  }}>
                  {pack.map((row, key) =>(<TouchableOpacity
                   key={key}
                    style={{
                      borderRadius: 15,
                      paddingHorizontal: 10,
                      backgroundColor: row.bgColor,
                    
                      padding: 18,
                      width: 120,
                      height: 140,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      navigation.navigate(row.route, {is:row.props})
                    }>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // padding:15,
                        gap: 10,
                      }}>
                      {row.icon}
                      <Text
                        style={{
                          textAlign: 'center',
                          color: key == 0 ? couleurs.white :couleurs.dark,
                          fontWeight: 'normal',
                          fontSize: 13,
                          opacity: 0.85,
                          fontFamily:CustomFont.Poppins
                        }}>
                        {row.title}
                      </Text>
                    </View>
                  </TouchableOpacity>))}
                </View>
              </ScrollView>

              
            </View>
            
          </View>

          <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 30,
                }}>
                <Text
                  style={{
                    color: couleurs.dark,
                    fontSize: 13,
                    textAlign:'center',
                    fontFamily: CustomFont.Poppins,
                  }}>
                  {"Je veux plus d'informations par \n rapport a l'identification"}
                </Text>
              </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
