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
import ArrowLeftIcon from '../components/ArrowLeft';

// InscriptionClientScreen
export default function InscriptionClientScreen({
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
          <View style={{paddingVertical: 10}}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 15,
                paddingBottom: 12,
                color: '#000',
                paddingLeft: 20,
              }}>
              Identifiant
            </Text>
            <View style={{backgroundColor: '#fff', paddingLeft: 20}}>
              <TextInput placeholder="Identifiant ..."></TextInput>
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
              Mot de passe
            </Text>
            <View style={{backgroundColor: '#fff', paddingLeft: 20}}>
              <TextInput placeholder="Mot de passe ..."></TextInput>
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
              Nom 
            </Text>
            <View style={{backgroundColor: '#fff', paddingLeft: 20}}>
              <TextInput placeholder="Nom  ..."></TextInput>
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
              Prenom 
            </Text>
            <View style={{backgroundColor: '#fff', paddingLeft: 20}}>
              <TextInput placeholder="Nom  ..."></TextInput>
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
              Email 
            </Text>
            <View style={{backgroundColor: '#fff', paddingLeft: 20}}>
              <TextInput placeholder="Email  ..."></TextInput>
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
              Mobile 
            </Text>
            <View style={{backgroundColor: '#fff', paddingLeft: 20}}>
              <TextInput placeholder="Mobile  ..."></TextInput>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'flex-end',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#7B4C7A',
                borderRadius: 30,
                marginVertical: 30,
              }}>
              <Pressable
                android_ripple={{color: '7B4C7A'}}
                style={{
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                onPress={() =>
                  navigation.navigate('inscription_proprietaire_3')
                }>
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#fff',
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
