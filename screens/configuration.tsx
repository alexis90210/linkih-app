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
  StatusBar,
} from 'react-native';

import countries from '../components/countries.json';
import {CustomFont, couleurs} from '../components/color';
import storage from '../components/api/localstorage';
import ArrowLeftIcon from '../components/ArrowLeft';
import ArrowRightIcon from '../components/ArrowRight';
import translations from '../translations/translations';
import SearchIcon from '../components/search';
import ApiService from '../components/api/service';
import secureStorage from '../components/api/secureStorage';

// ConfigurationScreen
export default function ConfigurationScreen({navigation}: {navigation: any}) {

  //////////////////////// LANGUAGE HANDLER //////////////////////////
  const [preferredLangage , setPreferredLangage] = useState('fr');

  const t = (key:any , langage:any) => {
    return translations[langage][key] || key
  }

  secureStorage.getKey('defaultlang').then(res => {
    if ( res ) {
      setPreferredLangage(res);
    } else {
      setPreferredLangage(preferredLangage);
    }
  }, (err) => {
    console.log(err)
  })

  /////////////////////////////////////////////////////////////////////

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
      setCountries( countries );
      setLoadedCountries(true); 
  }


  // Languages
  const [currentLanguage, setCurrentLanguage] = useState<any>({name: ''});

  const langages = [
    {name: 'Francais', flag:  "🇫🇷", code : "fr"},
    {name: 'Anglais',  flag:  "🇺🇸",  code : "en"},
    // add more langages here
  ];


  const selectLanguage = (item: any) => {
    setCurrentLanguage(item);
    if(currentLanguage.code) {
      saveConfiguration()
    }
  };

  // Load and filter country
  const [countryKey, SetCountryKey] = useState('');
  const applyFilter = () => {
    let etabs = countries;

    if ( !countryKey ) {
      setCountries( etabs );      
      return;
    }

    setCountries(etabs.filter((row, i) => {
      return row.name.toString().toLowerCase().includes( countryKey.toString().toLowerCase() )
    }))

  }

  // get and save configuration

  const saveConfiguration = () => {

    secureStorage.setKey('defaultlang',currentLanguage.code)

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
          <StatusBar backgroundColor={'#9c702b'}></StatusBar>
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
            {Stepper == 0 && t('quel_est_votre_pays', preferredLangage)}
            {Stepper == 1 && t('quel_est_votre_langue', preferredLangage)}
          </Text>
        </View>


          {/* INPUT RESEARCH */}
          {(Stepper == 0)  &&  <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap:4,
                  padding:10,
                  borderRadius:20,
                  marginVertical:4,
                  width:'100%'
                }}>
                <TextInput
                  defaultValue={countryKey}
                  onChangeText={input => {
                    SetCountryKey( input )                   
                  }}                  
                  placeholder={ t('Recherchez_un_pays', preferredLangage) }
                  style={{
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: '#E2C6BB',
                    color: couleurs.primary,
                   flex:1,
                    padding: 8,
                    paddingHorizontal:20,
                    borderRadius:30,
                    fontFamily: CustomFont.Poppins,
                  }}></TextInput>
                  <TouchableOpacity style={{width:40, height:40, backgroundColor:couleurs.primary, 
                    alignContent:'center', borderRadius:20, display:'flex', flexDirection:'row', justifyContent:'center', 
                    paddingTop:7}} 
                    onPress={ () => { applyFilter() }}>
                    <SearchIcon color={couleurs.white} />
                  </TouchableOpacity>
          </View>}

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

             {!_isLoadedcountries && <View style={{marginTop:300}}>
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