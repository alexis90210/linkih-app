import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  PixelRatio,
  TextInput,
  Alert,
} from 'react-native';
import ArrowLeftIcon from '../components/ArrowLeft';
import SearchIcon from '../components/search';
import FlagPlaceIcon from '../components/flag';
import {useNavigation} from '@react-navigation/native';
import {couleurs} from '../components/color';
import axios from 'axios';
import ApiService from '../components/api/service';

// ResultatRechercheScreen
export default function ResultatRechercheScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  var title = 'Ma recherche';

  const [etablissements, setEtablissements] = useState([]);

  const loadEtablissements = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_VENDEURS,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        if (api.code == 'success') {
         
          
          setEtablissements(api.message);
        }

        if (api.code == 'error') {
          Alert.alert('Erreur', api.message, [
            {text: 'OK', onPress: () => null},
          ]);
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('Erreur', error, [{text: 'OK', onPress: () => null}]);
      });
  };

  loadEtablissements();

  const distance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    const R = 6371; // rayon de la Terre en kilomètres
    const dLat = ((lat2 - lat1) * Math.PI) / 180; // différence de latitude en radians
    const dLon = ((lon2 - lon1) * Math.PI) / 180; // différence de longitude en radians

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // distance en kilomètres

    console.log(c);

    return d;
  };

  const LoadDistance = (data: any) => {
    
    let d = distance(
      Number(data.data.latitude),
      Number(data.data.longitude),
      Number(route.params?.latitude),
      Number(route.params?.longitude),
    ).toFixed(2);
    return (
      <Text style={{fontWeight: '600', fontSize: 15, color: '#841584'}}>
        {d} km
      </Text>
    );
  };

  var LoadResultatRecherche = ({
    navigation,
    data,
  }: {
    navigation: any;
    data: any;
  }) => {
    return (
      <Pressable onPress={() => navigation.navigate('espace_etab')}>
        <View
          style={{
            borderRadius: 15,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            backgroundColor: '#fff',
            flex: 1,
            marginRight: 10,
            height: 210,
          }}>
          <View
            style={{
              backgroundColor: 'rgba(200,200,200,.5)',
              width: '100%',
              borderRadius: 15,
              height: 80,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{paddingTop: 30}}>
              <FlagPlaceIcon />
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              justifyContent: 'flex-start',
              gap: 4,
              paddingTop: 10,
              width: '100%',
              paddingHorizontal: 10,
              height: 80,
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 15,
                letterSpacing: 0.7,
                color: '#000',
              }}>
              {data.nom}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
                gap: 10,
              }}>
              <Text style={{fontWeight: '600', fontSize: 15, color: '#000'}}>
                5.0
              </Text>
              <Text style={{fontWeight: '600', fontSize: 15, color: '#841584'}}>
                ( 450 avis )
              </Text>
            </View>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#000',
                opacity: 0.8,
              }}>
              Brzzaville, Congo , Boulevard Denis
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'flex-end',
                gap: 10,
              }}>
              <LoadDistance  data={data}/>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f6f6f6f6',
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
            <ArrowLeftIcon />
          </Pressable>
          <Text style={{color: '#000', fontSize: 18, fontWeight: '700'}}>
            {title}
          </Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View style={{width: '100%', paddingHorizontal: 10}}>
            <View
              style={[
                {
                  width: '100%',
                  height: 45,
                  paddingHorizontal: 20,
                  backgroundColor: 'rgba(255,255,255,.74)',
                  borderRadius: 50,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                },
              ]}>
              <SearchIcon color={'#841584'} />
              <TextInput
                placeholder="Recherchez..."
                style={{
                  backgroundColor: 'rgba(255,255,255,.74)',
                  borderRadius: 50,
                  color: couleurs.primary,
                  flex: 1,
                }}></TextInput>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              gap: 10,
              paddingHorizontal: 10,
              marginTop: 15,
              marginBottom: 40,
            }}>
            {etablissements.map((prop, key) => {
              return (
                <LoadResultatRecherche
                  key={key}
                  data={prop}
                  navigation={navigation}
                />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
