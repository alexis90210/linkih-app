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
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import EditIcon from '../components/Edit';
import {CustomFont, couleurs} from '../components/color';
import storage from '../components/api/localstorage';
import translations from '../translations/translations';

export default function Compte({navigation}: {navigation: any}) {
  /////////////////////////////////// LANGUAGE HANDLER //////////////////////////////////

  const [preferredLangage, setPreferredLangage] = useState('fr');

  const t = (key: any, langage: any) => {
    return translations[langage][key] || key;
  };

  storage
    .load({
      key: 'defaultlang', // Note: Do not use underscore("_") in key!
      id: 'defaultlang', // Note: Do not use underscore("_") in id!
    })
    .then((data: any) => {
      setPreferredLangage(data);
    });

  //////////////////////////////////////////////////////////////////////////////////////

  const [proprietaire, setProprietaire] = useState<any>({});
  const [isLoadedProprietaire, setisLoadedProprietaire] = useState(false);

  if (!isLoadedProprietaire) {
    storage
      .load({
        key: 'userconnected', // Note: Do not use underscore("_") in key!
        id: 'userconnected', // Note: Do not use underscore("_") in id!
      })
      .then(data => {
        if (data.utilisateur) setProprietaire(data.utilisateur[0]);
        else
          setProprietaire({
            nom: data.message.nom,
            prenom: data.message.prenom,
            client: true,
            vendeur_id: '',
            data: data.message,
          });

        setisLoadedProprietaire(true);
      })
      .catch(error => console.log(error));
  }

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
            backgroundColor: couleurs.primary,
            paddingHorizontal: 10,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.white} />
          </Pressable>
          <Text style={{color: couleurs.white, fontSize: 18}}>
            {t('Mon_compte', preferredLangage)}
          </Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          {/* Banner Image */}
          <View style={{paddingHorizontal: 12, marginTop: 10, width: '100%'}}>
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
                backgroundColor: couleurs.primary,
                padding: 14,
                width: '100%',
                shadowColor: 'gray',
              }}>
              <Text
                style={{
                  color: couleurs.white,
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '700',
                  fontFamily: CustomFont.Poppins,
                }}>
                {proprietaire.nom}
              </Text>
              <Text
                style={{
                  color: couleurs.white,
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                {proprietaire.email}
              </Text>
              <Text
                style={{
                  color: couleurs.white,
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                {proprietaire.mobile}
              </Text>
            </View>
          </View>

          <View style={{marginHorizontal: 12, marginBottom: 60, marginTop: 80}}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                gap: 10,
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                {t('Client_depuis', preferredLangage)}
              </Text>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                {proprietaire.date_creation}
              </Text>
            </View>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '700',
                  fontFamily: CustomFont.Poppins,
                }}>
                {t('Identifiant', preferredLangage)}
              </Text>

              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                  opacity: 0.8,
                }}>
                {proprietaire.login}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('edit_adresse', {
                  ...proprietaire,
                })
              }>
              <View
                style={{
                  borderRadius: 15,
                  backgroundColor: '#fff',
                  padding: 14,
                  width: '100%',
                  alignSelf: 'center',
                  shadowColor: 'gray',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 16,
                    fontWeight: '700',
                    fontFamily: CustomFont.Poppins,
                  }}>
                  {t('Adresse', preferredLangage)}
                </Text>

                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontFamily: CustomFont.Poppins,
                    opacity: 0.8,
                  }}>
                  {proprietaire.pays}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Welcome text */}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('edit_client', {
              ...proprietaire,
            });
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              position: 'absolute',
              bottom: 10,
              right: 10,
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
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
