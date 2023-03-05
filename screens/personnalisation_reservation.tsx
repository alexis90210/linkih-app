import React, {useState} from 'react';
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
// import RadioButton from "react-native-animated-radio-button";

export default function PersonnalisationReservation({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
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
                      fontSize: 15,
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
                      fontSize: 15,
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
                  color: '#000',
                  paddingVertical: 15,
                  fontSize: 15,
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
                        fontSize: 15,
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
                  <BouncyCheckbox
                    size={20}
                    fillColor={couleurs.primary}
                    unfillColor={couleurs.white}
                    iconStyle={{borderColor: couleurs.primary}}
                    innerIconStyle={{borderWidth: 2}}
                    textStyle={{fontFamily: CustomFont.Poppins}}
                    onPress={(isChecked: boolean) => {}}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Welcome text */}
        </ScrollView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundColor:couleurs.white, 
            borderTopWidth:1,
            borderTopColor:'#ddd',
            padding:10
          }}>
          <Text style={{alignSelf: 'center', fontFamily: CustomFont.Poppins}}>
            Duree de la prestation : 02h30
          </Text>
          <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: couleurs.primary,
                      borderRadius: 30,
                      paddingHorizontal:30,
                      width: '100%',
                      height: 40,

                    }}>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 10,
                        position: 'relative',
                        bottom: -3,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        flexWrap:'nowrap'
                      }}
                      onPress={() => navigation.navigate('personnalisation_reservation_creneau')}>
                      
                      <Text
                        style={{
                          textAlign: 'center',
                          padding: 5,
                          fontSize: 14,
                          color: couleurs.white,
                          fontFamily: CustomFont.Poppins,
                        }}>
                        CONTINUER
                      </Text>
                    </TouchableOpacity>
                  </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
