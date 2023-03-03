import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import { CustomFont, couleurs } from '../components/color';
import CloseIcon from '../components/close';

export default function Reabonnement({navigation, route}: {navigation: any, route:any}) {

  const [isVisibleModalAbonnement , setVisibleModalAbonnement ] = useState(true)
  return (
    <View>
      <SafeAreaView>  
         {/* MODAL ABONNEMENT */}
      <Modal visible={isVisibleModalAbonnement}>
        <View style={{flex: 1, backgroundColor: couleurs.dark, paddingHorizontal: 20, paddingVertical:20}}>
          <View
            style={{
              display: 'flex',
              marginBottom: 30,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}>
            
            <TouchableOpacity onPress={ () => navigation.goBack()}>
            <CloseIcon color={couleurs.white} />
            </TouchableOpacity>
          </View>

          <ScrollView>
          <Text
            style={{
              fontFamily: CustomFont.Poppins,
              fontSize: 17,
              width: '70%',
              color: couleurs.white,
            }}>
            Votre abonnement expire bientot, re-abonnez vous maintenant
          </Text>

          <View
            style={{
              borderWidth: 2,
              marginTop: 30,
              borderColor: couleurs.primary,
              borderRadius: 20,
            }}>
            <View
              style={{
                backgroundColor: couleurs.primary,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingVertical: 10,
              }}>
              <Text style={{color: couleurs.dark, alignSelf: 'center'}}>
                Abonnement starter
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 30,
              }}>
              <Text
                style={{
                  color: couleurs.white,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Mensuel
              </Text>
              <View>
                <Text
                  style={{
                    color: couleurs.white,
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  $10.99/mo
                </Text>
                <Text
                  style={{
                    color: couleurs.white,
                    fontSize: 15,
                    fontWeight: '400',
                    textDecorationLine: 'line-through',
                    textDecorationColor: couleurs.primary,
                    textDecorationStyle:'solid',
                    alignSelf:'flex-end'
                  }}>
                  $39.99/mo
                </Text>
              </View>
            </View>

            <View
              style={{
                marginBottom:20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: couleurs.primary,
                borderRadius: 30,
                marginHorizontal:40
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  width: '80%',
                }}
                onPress={() => null}>
                <Text
                  style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontWeight: '500',
                    color: couleurs.dark,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                  }}>                   
                    Se re-abonner maintenant
                  
                </Text>
              </TouchableOpacity>              
            </View>


            {/* BADGE CURRENT ABONNEMENT */}
            <View style={{backgroundColor: 'transparent', borderWidth:1, borderColor:couleurs.primary, borderBottomLeftRadius:20, borderTopRightRadius:20, width:100}}>
                <Text style={{color:couleurs.primary , padding:5, alignSelf:'center'}}>En cours</Text>
            </View>
            
          </View>

          <View
            style={{
              borderWidth: 2,
              marginTop: 30,
              borderColor: couleurs.primaryLight,
              borderRadius: 20,
            }}>
            <View
              style={{
                backgroundColor: couleurs.primaryLight,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingVertical: 10,
              }}>
              <Text style={{color: couleurs.dark, alignSelf: 'center'}}>
                Abonnement Flex
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 30,
              }}>
              <Text
                style={{
                  color: couleurs.primaryLight,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Mensuel
              </Text>
              <View>
                <Text
                  style={{
                    color: couleurs.primaryLight,
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  $10.99/mo
                </Text>
                <Text
                  style={{
                    color: couleurs.primaryLight,
                    fontSize: 15,
                    fontWeight: '400',
                    textDecorationLine: 'line-through',
                    textDecorationColor: couleurs.primaryLight,
                    textDecorationStyle:'solid',
                    alignSelf:'flex-end'
                  }}>
                  $39.99/mo
                </Text>
              </View>
            </View>

            <View
              style={{
                marginBottom:20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: couleurs.primaryLight,
                borderRadius: 30,
                marginHorizontal:40
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  width: '80%',
                }}
                onPress={() => null}>
                <Text
                  style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontWeight: '500',
                    color: couleurs.dark,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                  }}>                   
                    Commencez !
                  
                </Text>
              </TouchableOpacity>              
            </View>
            
          </View>

          </ScrollView>
        </View>
      </Modal> 
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
