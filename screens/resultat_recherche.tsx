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
import SearchIcon from '../components/search';
import FlagPlaceIcon from '../components/flag';
import {useNavigation} from '@react-navigation/native';

var LoadResultatRecherche = () => {
  return (
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
          Maison de beaute
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
          <Text style={{fontWeight: '600', fontSize: 15, color: '#841584'}}>
            140 km
          </Text>
        </View>
      </View>
    </View>
  );
};
// ResultatRechercheScreen
export default function ResultatRechercheScreen({
  navigation,
}: {
  navigation: any;
}) {
  var title = 'Ma recherche';

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
            {[1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 11, 1].map((prop, key) => {
              return <LoadResultatRecherche key={key} />;
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
