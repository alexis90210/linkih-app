import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import {CustomFont, couleurs} from '../components/color';
import MinusIcon from '../components/minus';
import AddIcon from '../components/add';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import translations from '../translations/translations';
import storage from '../components/api/localstorage';
// import RadioButton from "react-native-animated-radio-button";

export default function PersonnalisationReservation({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {

    /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////

    const [preferredLangage, setPreferredLangage] = useState('fr');

    const t = (key: any, langage: any) => {
      return translations[langage][key] || key;
    };
  
   
  useEffect(async () => {
    let lang = await secureStorage.getKey('defaultlang')
      if ( lang ) {
        setPreferredLangage(lang);
      } 
  })
 
  var data = route.params.props;

  console.log(data);

  //  good to know
  const [isCollapsedGoodToKnow, setIsCollapsedGoodToKnow] = useState(false);
  const toggleCollapseGoodToKnow = () => {
    setIsCollapsedGoodToKnow(!isCollapsedGoodToKnow);
  };

  //  Important info
  const [isCollapsedImportantInfo, setIsCollapsedImportantInfo] =
    useState(true);
  const toggleCollapseImportantInfo = () => {
    setIsCollapsedImportantInfo(!isCollapsedImportantInfo);
  };

  // prestation list

  var prestation = [
    {
      title: 'title 1',
      subtitle: ' sous titre 1',
      price: '70 €',
    },
    {
      title: 'title 2',
      subtitle: ' sous titre 2',
      price: '100 €',
    },
    {
      title: 'title 3',
      subtitle: ' sous titre 3',
      price: '130 €',
    },
  ];

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
            {data.title}
          </Text>
        </View>

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View style={{marginVertical: 10, paddingHorizontal: 10}}>
            {/* good to know */}
            <View
              style={{
                flex: 1,
                marginBottom: 10,
                backgroundColor: '#fff',
                padding: 10,
              }}>
              <TouchableOpacity onPress={toggleCollapseGoodToKnow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    borderBottomWidth: !isCollapsedGoodToKnow ? 1 : 0,
                    borderColor: '#ddd',
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: CustomFont.Poppins,
                      color: !isCollapsedGoodToKnow
                        ? couleurs.primary
                        : couleurs.dark,
                    }}>
                    Tout a savoir sur {data.title}
                  </Text>
                  {!isCollapsedGoodToKnow ? (
                    <MinusIcon color={couleurs.primary} />
                  ) : (
                    <AddIcon color={couleurs.primary} />
                  )}
                </View>
              </TouchableOpacity>
              {!isCollapsedGoodToKnow && (
                <View
                  style={{
                    paddingVertical: 10,
                  }}>
                  <Text
                    numberOfLines={15}
                    style={{fontFamily: CustomFont.Poppins}}>
                    {' '}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem excepturi natus perferendis necessitatibus magnam
                    tempore aperiam blanditiis! Omnis repellendus officiis saepe
                    possimus distinctio veniam eius porro? Voluptas, aut fugiat.
                    Nam.
                  </Text>
                </View>
              )}
            </View>

            {/* Important info */}
            <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
              <TouchableOpacity onPress={toggleCollapseImportantInfo}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    borderBottomWidth: !isCollapsedImportantInfo ? 1 : 0,
                    borderColor: '#ddd',
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: CustomFont.Poppins,
                      color: !isCollapsedImportantInfo
                        ? couleurs.primary
                        : couleurs.dark,
                    }}>
                    Informations importantes
                  </Text>
                  {!isCollapsedImportantInfo ? (
                    <MinusIcon color={couleurs.primary} />
                  ) : (
                    <AddIcon color={couleurs.primary} />
                  )}
                </View>
              </TouchableOpacity>
              {!isCollapsedImportantInfo && (
                <View
                  style={{
                    paddingVertical: 10,
                  }}>
                  <Text
                    numberOfLines={15}
                    style={{fontFamily: CustomFont.Poppins}}>
                    {' '}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem excepturi natus perferendis necessitatibus magnam
                    tempore aperiam blanditiis! Omnis repellendus officiis saepe
                    possimus distinctio veniam eius porro? Voluptas, aut fugiat.
                    Nam.
                  </Text>
                </View>
              )}
            </View>

            {/* Personnalisation votre prestation */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                padding: 10,
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: couleurs.dark,
                  paddingVertical: 15,
                  fontSize: 13,
                  fontFamily: CustomFont.Poppins,
                  width: '100%',
                  textAlign: 'center',
                }}>
                Personnaliser votre prestation
              </Text>

              {prestation.map((row: any, i: any) => (
                <View
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '100%',
                    paddingVertical: 10,
                    borderBottomColor: 'rgba(0,0,0,.1)',
                    borderBottomWidth: prestation.length != i + 1 ? 1 : 0,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.primary,
                      }}
                      numberOfLines={1}>
                      {row.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.dark,
                        opacity: 0.6,
                      }}
                      numberOfLines={1}>
                      {row.subtitle}
                    </Text>
                  </View>
                  <View style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      alignItems:'center',
                      gap:10
                    }}>
                    <Text style={{fontFamily: CustomFont.Poppins, color:couleurs.primary}}>{row.price}</Text>
                  <BouncyCheckbox
                    size={20}
                    fillColor={couleurs.primary}
                    unfillColor={couleurs.white}
                    iconStyle={{borderColor: couleurs.primary}}
                    innerIconStyle={{borderWidth: 2}}
                    textStyle={{fontFamily: CustomFont.Poppins}}
                    onPress={(isChecked: boolean) => {
                      if (isChecked) {
                        navigation.navigate('personnalisation_reservation_creneau', {
                          props:{
                            prestation: route.params.props,
                            detail_prestation: row
                            
                          }
                        })
                      }
                    }}
                  />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Welcome text */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
