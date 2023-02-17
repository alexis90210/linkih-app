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
  ImageBackground,
} from 'react-native';
import ShopIcon from '../components/shop';
import AccountIcon from '../components/account';
import EntrepreneurIcon from '../components/entrepreuneur';

// IdentificationScreen
export default function IdentificationScreen({navigation}: {navigation: any}) {
  return (
    <>
      <SafeAreaView
        style={{
          flex:1,
          justifyContent:'center',
          alignContent:'center',
        }}>
         <ScrollView>
         <ImageBackground
          resizeMode="cover"
          source={require('../assets/images/banner.jpeg')}
          style={{
            height: 200,
            width: '100%',
          }}
        />

          <View
            style={{
              flex:1,
              padding: 10,
              width: '100%',
              height: '100%',
              display:'flex',
              justifyContent:'center',
              backgroundColor:'#f6f6f6f6'
            }}>
      
            <View>
              <View style={{display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center', marginVertical:30}}>
                <Text style={{color:'#000', fontSize:16}}>Veuillez-vous identifier pour continuer</Text>
              </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 20,
              }}>

              <Pressable
                android_ripple={{color: '7B4C7A'}}
                style={{
                  borderRadius: 15,
                  paddingHorizontal: 10,
                  backgroundColor: '#fff',
                  borderWidth: 1.6,
                  borderColor: '#E2C6BB',
                  padding: 18,
                  width: 150,
                  height: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('identification_client')}>
                <View style={{display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',gap:10}}>
                  <AccountIcon color={'#7B4C7A'}/>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#7B4C7A',
                      fontWeight: 'normal',
                      fontSize: 15,
                      opacity: 0.85,
                    }}>
                    Client
                  </Text>
                </View>
              </Pressable>

              <Pressable
                android_ripple={{color: '7B4C7A'}}
                style={{
                  borderRadius: 15,
                  paddingHorizontal: 10,
                  backgroundColor: '#fff',
                  borderWidth: 1.6,
                  borderColor: '#E2C6BB',
                  padding: 18,
                  width: 150,
                  height: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('identification_proprietaire')
                }>
               <View style={{display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',gap:10}}>
                  <ShopIcon color={'#7B4C7A'}/>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#7B4C7A',
                      fontWeight: 'normal',
                      fontSize: 15,
                      opacity: 0.85,
                    }}>
                    Societe
                  </Text>
                </View>
              </Pressable>

              <Pressable
                android_ripple={{color: '7B4C7A'}}
                style={{
                  borderRadius: 15,
                  paddingHorizontal: 10,
                  backgroundColor: '#fff',
                  borderWidth: 1.6,
                  borderColor: '#E2C6BB',
                  padding: 18,
                  width: 150,
                  height: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('identification_proprietaire')
                }>
               <View style={{display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',gap:10}}>
                  <EntrepreneurIcon color={'#7B4C7A'}/>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#7B4C7A',
                      fontWeight: 'normal',
                      fontSize: 15,
                      opacity: 0.85,
                    }}>
                    Auto-entrepreneur
                  </Text>
                </View>
              </Pressable>
            </View>

            </View>

          </View>
         </ScrollView>
      </SafeAreaView>
    </>
  );
}
