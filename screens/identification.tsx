import React, { useState } from 'react';

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
  Dimensions,
} from 'react-native';
import ShopIcon from '../components/shop';
import AccountIcon from '../components/account';
import {CustomFont, couleurs} from '../components/color';
import ArrowLeftIcon from '../components/ArrowLeft';
import ApiService from '../components/api/service';
import translations from '../translations/translations';
import storage from '../components/api/localstorage';

// IdentificationScreen
export default function IdentificationScreen({navigation}: {navigation: any}) {


  /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////////
  
  const [preferredLangage , setPreferredLangage] = useState('fr');

  const t = (key:any , langage:any) => {
    return translations[langage][key] || key
  }

  storage.load({
    key: 'defaultlang', // Note: Do not use underscore("_") in key!
    id: 'defaultlang' // Note: Do not use underscore("_") in id!
  }).then( ( data:any) => {
    setPreferredLangage(data)
  })

  //////////////////////////////////////////////////////////////////////////////////////


  var pack = [
    {
      icon: <AccountIcon color={couleurs.white} />,
      title: t('client', preferredLangage),
      route: 'identification_client',
      props: 'ROLE_CLIENT',
      color: couleurs.primary,
      bgColor: couleurs.primary,
      type:0, // ROLE_CLIENT
    },
    {
      icon: <ShopIcon color={couleurs.dark} />,
      title: t('societe', preferredLangage),
      route: 'identification_proprietaire',
      props: 'ROLE_SOCIETE',
      color: couleurs.dark,
      bgColor: couleurs.primaryLight,
      type:1, // SOCIETE
    },
    {
      icon: <ShopIcon color={couleurs.dark} />,
      title: t('auto_entrepreuneur', preferredLangage),
      route: 'identification_proprietaire',
      props: 'ROLE_AUTO_ENTREPREUNEUR',
      color: couleurs.dark,
      bgColor: couleurs.primaryLight,
      type:2 // AUTO_ENTREPREUNEUR
    },
  ];
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#f6f6f6',
        }}>
        <ScrollView>
          <Image
            source={require('../assets/images/1.jpg')}
            style={{
              height: 260,
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
            <Pressable onPress={() => navigation.goBack()}>
              <ArrowLeftIcon color={'#fff'} />
            </Pressable>
          </View>

          <View
            style={{
              flex: 1,
              padding: 10,
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#f6f6f6',
              position: 'relative',
              marginTop: 5,
              borderRadius: 20,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginVertical: 20,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  { t('veuillez_vous_identifier', preferredLangage)}
                </Text>
              </View>

              <ScrollView horizontal={true} style={{width: '100%'}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                    padding: 10,
                    alignSelf: 'center',
                    width: Dimensions.get('window').width,
                  }}>
                  {pack.map((row, key) => (
                    <TouchableOpacity
                      key={key}
                      style={{
                        borderRadius: 15,
                        paddingHorizontal: 10,
                        backgroundColor: row.bgColor,
                        padding: 18,
                        width: 105,
                        height: 140,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        navigation.navigate(row.route, {
                          is: row.type
                        })
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
                            color: key == 0 ? couleurs.white : couleurs.dark,
                            fontWeight: 'normal',
                            fontSize: 12,
                            opacity: 0.85,
                            fontFamily: CustomFont.Poppins,
                          }}>
                          {row.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 30,
                  paddingHorizontal:30
                }}>
                <Text
                  style={{
                    color: couleurs.dark,
                    fontSize: 13,
                    textAlign: 'center',
                    fontFamily: CustomFont.Poppins,
                  }}>
                   { t('je_veux_info', preferredLangage)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
