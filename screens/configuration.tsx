import React, {useRef, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  FlatList,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import SearchIcon from '../components/search';
import LanguageIcon from '../components/language';
import CloseIcon from '../components/close';
import countries from '../components/countries.json';
import {CustomFont, couleurs} from '../components/color';
import storage from '../components/api/localstorage';
import ArrowLeftIcon from '../components/ArrowLeft';
import ArrowRightIcon from '../components/ArrowRight';

// ConfigurationScreen
export default function ConfigurationScreen({navigation}: {navigation: any}) {
  // countries
  const [currentCountry, setCurrentCountry] = useState({name: ''});

  const [Stepper, setStepper] = useState(0);

  const selectCountry = (item: any) => {
    setCurrentCountry(item);
    setStepper(1)
  };

  const [_countries, setCountries] = useState<any>([]);
  const [_isLoadedcountries, setLoadedCountries] = useState(false);

  if ( !_isLoadedcountries) {
    setTimeout(() => {
      setCountries( countries );
      setLoadedCountries(true)
    }, 400);

  }


  // Languages
  const [currentLanguage, setCurrentLanguage] = useState({name: ''});

  const langages = [
    {name: 'Francais', flag:  "🇫🇷"},
    {name: 'Anglais', flag: "🇺🇸"},
    // add more langages here
  ];


  const selectLanguage = (item: any) => {
    setCurrentLanguage(item);
    saveConfiguration()
  };

  // get and save configuration

  const saveConfiguration = () => {

    storage.save({
      key: 'configuration', // Note: Do not use underscore("_") in key!
      id: 'configuration', // Note: Do not use underscore("_") in id!
      data: {
        pays: currentCountry,
        langage: currentLanguage,
      },
    });

    navigation.navigate('identification');
  };

  // saveConfiguration()

  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
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
          <Pressable onPress={() => Stepper > 0 ? setStepper(Stepper-1): navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.white} />
          </Pressable>
          <Text
            style={{
              color: couleurs.white,
              fontSize: 16,
              fontFamily: CustomFont.Poppins,
            }}>
            {Stepper == 0 && 'Quel est votre pays ?'}
            {Stepper == 1 && 'Vous parlez quelle langue ?'}
          </Text>
        </View>

        <ScrollView
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>

             {!_isLoadedcountries && <View style={{marginTop:100}}>
              <ActivityIndicator  color={couleurs.primary} style={{alignSelf:'center'}} size={'large'}></ActivityIndicator>
             </View>}
            {Stepper == 0 && (
              <View style={{width: '100%',
              marginTop:2,}}>
                {_countries.map((item: any, index: any) => (
                  <View key={index}>
                    <TouchableOpacity onPress={() => selectCountry(item)}>
                      <View style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'space-between',
                          paddingVertical: 16,
                          gap: 10,
                          width:'100%',
                          paddingHorizontal:20
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,    
                            flex:1                      
                          }}>
                          {/* <WorldIcon /> */}
                          <Text> {item.emoji}</Text>
                          <Text style={{color: 'rgba(100,100,100,1)'}}>
                            {item.name}
                          </Text>
                        </View>
                        <ArrowRightIcon color={'#ddd'}/>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        height: 1,
                        overflow: 'hidden',
                        paddingHorizontal: 10,
                      }}>
                      <View
                        style={{
                          height: 2,
                          borderWidth: 1,
                          borderColor: '#ddd',
                          borderStyle: 'solid',
                        }}></View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {Stepper == 1 && (
              langages.map( (item:any, index:any) => (
                <View key={index} style={{width:'100%'}}>
              <TouchableOpacity onPress={() => selectLanguage(item)}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width:'100%',                   
                    paddingVertical: 16,
                paddingHorizontal:20,
                marginTop:2,
                    gap: 10,
                  }}>
                  <Text style={{color: 'rgba(100,100,100,1)'}}>{item.flag}</Text>
                  <Text style={{color: 'rgba(100,100,100,1)'}}>{item.name}</Text>
                </View>
              </TouchableOpacity>
      
              <View style={{height: 1, overflow: 'hidden', paddingHorizontal: 10}}>
                <View
                  style={{
                    height: 2,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderStyle: 'solid',
                  }}></View>
              </View>
            </View>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}