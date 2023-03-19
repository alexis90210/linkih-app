import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { CustomFont, couleurs } from '../components/color';

export default function Reabonnement({navigation, route}: {navigation: any, route:any}) {

  return (
    <View>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor:couleurs.dark
        }}>  
      <View style={{flex: 1, paddingHorizontal: 20, paddingVertical:20}}>
        <ScrollView>
          <Text
            style={{
              fontFamily: CustomFont.Poppins,
              fontSize: 16,
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
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingVertical: 10,
              }}>
              <Text style={{color: couleurs.white, alignSelf: 'center'}}>
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
                  color: couleurs.primary,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Mensuel
              </Text>
              <View>
                <Text
                  style={{
                    color: couleurs.primary,
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  $10.99/mo
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
                onPress={() => navigation.navigate('paiement_screen')}>
                <Text
                  style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontWeight: '500',
                    color: couleurs.white,
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
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
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
                onPress={() => navigation.navigate('paiement_screen')}>
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
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
