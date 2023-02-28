import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import EditIcon from '../components/Edit';
import { CustomFont, couleurs } from '../components/color';
import storage from '../components/api/localstorage';

export default function Compte({navigation}: {navigation: any}) {

  const [proprietaire, setProprietaire] = useState<any>({});
  storage.load({
    key: 'userconnected', // Note: Do not use underscore("_") in key!
    id: 'userconnected', // Note: Do not use underscore("_") in id!
  }).then( data => {

    setProprietaire( data.utilisateur[0] )

    console.log(proprietaire);   
  })
  .catch(error => console.log(error)
  );

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
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.primary} />
          </Pressable>
          <Text style={{color: couleurs.primary, fontSize: 18}}>
            Mon compte
          </Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          {/* Banner Image */}
          <View style={{paddingHorizontal: 12, width: '100%'}}>
            <Image
              source={require('../assets/images/1.jpg')}
              style={{
                height: 200,
                width: '100%',
                borderRadius: 15,
                marginTop: 2,
              }}
            />
          </View>

          <View
            style={{
              borderRadius: 15,
              width: '100%',
              position: 'absolute',
              top: 145,
              left: 0,
              paddingHorizontal: 24,
              zIndex: 10,
            }}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                shadowColor: 'gray',
                height: 155,
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                {proprietaire.nom}
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 15,
                  fontFamily:CustomFont.Poppins,
                }}>
                {proprietaire.email}
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontFamily:CustomFont.Poppins,
                }}>
                {proprietaire.mobile}
              </Text>

              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontFamily:CustomFont.Poppins,
                }}>
                Identifiant de connexion : <Text style={{color:couleurs.primary}}>{proprietaire.login}</Text>
              </Text>

              

              
            </View>
          </View>

          <View style={{marginHorizontal: 12, marginBottom: 60, marginTop:120}}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily:CustomFont.Poppins,
                }}>
                Client depuis
              </Text>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily:CustomFont.Poppins,
                }}>
                1{proprietaire.date_creation}
              </Text>
            </View>

            <Text
              style={{
                color: '#000',
                paddingVertical: 3,
                fontSize: 16,
                fontFamily:CustomFont.Poppins,
                marginVertical: 15,
              }}>
              Adresse
            </Text>


     

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontFamily:CustomFont.Poppins,
                  opacity: 0.8,
                }}>
                {proprietaire.pays}
              </Text>
            </View>

          </View>

          {/* Welcome text */}
        </ScrollView>
        <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  position:'relative',
                  bottom:10,
                  right:10
                }}>
                <View
                  style={{
                    backgroundColor: couleurs.primary,
                    padding: 7,
                    borderRadius: 15,
                  }}>
                  <EditIcon />
                </View>
              </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
