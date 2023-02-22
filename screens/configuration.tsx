import React, {useRef, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Modal,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import SearchIcon from '../components/search';
import LanguageIcon from '../components/language';
import CloseIcon from '../components/close';
import countries from '../components/countries.json';
import { couleurs } from '../components/color';
import storage from '../components/api/localstorage';

// ConfigurationScreen
export default function ConfigurationScreen({navigation}: {navigation: any}) {
  // countries
  const [modalVisibleCountries, setModalVisibleCountries] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({name: ''});
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [searchText, setSearchText] = useState('');

  const handleOpenModalCountries = () => {
    setModalVisibleCountries(true);
  };

  const handleCloseModalCountries = () => {
    setModalVisibleCountries(false);
  };

  const selectCountry = (item: any) => {
    setCurrentCountry(item);
    setSearchText(item.name);
    handleCloseModalCountries();
  };

  const filterListCountries = (input: any) => {
    setSearchText(input);

    if (searchText != '') {
      var filtered = countries.filter((country, key) => {
        return country.name
          .toString()
          .toLowerCase()
          .includes(searchText.toString().toLowerCase());
      });
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  };

  const CountryList = () => {
    const renderItem = ({item}: {item: any}) => (
      <View>
        <Pressable onPress={() => selectCountry(item)}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              paddingHorizontal: 18,
              gap: 10,
            }}>
            {/* <WorldIcon /> */}
            <Text> {item.emoji}</Text>
            <Text style={{color: 'rgba(100,100,100,1)'}}>{item.name}</Text>
          </View>
        </Pressable>
        <View style={{height: 1, overflow: 'hidden', paddingHorizontal: 10}}>
          <View
            style={{
              height: 1,
              borderWidth: 1,
              borderColor: '#84158490',
              borderStyle: 'dashed',
            }}></View>
        </View>
      </View>
    );

    return (
      <FlatList
        data={filteredCountries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  // Languages
  const [modalVisibleLanguages, setModalVisibleLanguages] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({name: ''});

  const langages = [
    {name: 'Francais', flag: 'https://www.countryflags.io/AF/flat/64.png'},
    {name: 'Anglais', flag: 'https://www.countryflags.io/AL/flat/64.png'}
    // add more langages here
  ];

  const handleOpenModalLanguages = () => {
    setModalVisibleLanguages(true);
  };

  const handleCloseModalLanguages = () => {
    setModalVisibleLanguages(false);
  };

  const selectLanguage = (item: any) => {
    setCurrentLanguage(item);
    handleCloseModalLanguages();
  };

  const LanguageList = () => {
    const renderItem = ({item}: {item: any}) => (
      <View>
        <Pressable onPress={() => selectLanguage(item)}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              gap: 10,
            }}>
            <LanguageIcon />
            <Text style={{color: 'rgba(100,100,100,1)'}}>{item.name}</Text>
          </View>
        </Pressable>

        <View style={{height: 1, overflow: 'hidden', paddingHorizontal: 10}}>
          <View
            style={{
              height: 1,
              borderWidth: 1,
              borderColor: '#84158490',
              borderStyle: 'dashed',
            }}></View>
        </View>
      </View>
    );

    return (
      <FlatList
        data={langages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };



  // get and save configuration

  const saveConfiguration = () => {

    if ( !currentCountry.name ){
      //
      Alert.alert('Erreur', 'Veuillez selectionner un pays', [        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

      return
    }
    if ( !currentLanguage.name ) {
      //
      Alert.alert('Erreur', 'Veuillez selectionner une langue', [        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);


      return
    }

      storage.save({
        key: 'configuration', // Note: Do not use underscore("_") in key!
        id: 'configuration', // Note: Do not use underscore("_") in id!
        data: {
          pays: currentCountry,
          langage: currentLanguage
    
        },
        expires: 1000 * 60 * 60
      });
  
      navigation.navigate('identification')

         
    
  } 

  return (
    <>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
        }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
            }}>
            <Text
              style={{
                textAlign: 'left',
                color: '#000',
                fontWeight: 'bold',
                fontSize: 25,
                paddingRight: 10,
                width: '90%',
              }}>
              Selectionnez le pays ou region et la langue
            </Text>
            <View
              style={{
                marginVertical: 20,
                backgroundColor: '#fff',
                borderRadius: 11,
                padding: 20,
                width: '90%',
                marginTop: 40,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  paddingTop: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 15,
                    height: 20,
                    opacity: 0.85,
                    marginBottom: 10,
                  }}>
                  Pays/Region
                </Text>
                <TextInput
                  onPressIn={handleOpenModalCountries}
                  value={currentCountry.name}
                  placeholderTextColor={'rgba(100,100,100,.7)'}
                  placeholder="Choisir..."
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    width: '100%',
                    fontWeight: '600',
                    padding: 10,
                  }}></TextInput>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 20,
                  marginBottom: 50,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 15,
                    height: 20,
                    opacity: 0.85,
                    marginBottom: 10,
                  }}>
                  Langue
                </Text>
                <TextInput
                  onPressIn={handleOpenModalLanguages}
                  value={currentLanguage.name}
                  placeholderTextColor={'rgba(100,100,100,.7)'}
                  placeholder="Choisir..."
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    fontWeight: '600',
                    width: '100%',
                    padding: 10,
                  }}></TextInput>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#7B4C7A',
                  borderRadius: 30,
                  marginBottom: 30,
                  display:'flex',
                  flexDirection:'row',
                  justifyContent:'center',
                  width:'100%'
                }}>
                <Pressable
                  android_ripple={{color: '7B4C7A'}}
                  style={{
                    paddingHorizontal: 10,
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    gap:10
                  }}
                  onPress={() => saveConfiguration()}>
                   
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 14,
                      fontWeight: '500',
                      color: couleurs.secondary,
                    }}>

                    continuez 
                  </Text>
                  {/* <ArrowRightIcon color={couleurs.secondary}/> */}
                </Pressable>
              </View>

              {/* MODAL PAYS */}

              <Modal visible={modalVisibleCountries} transparent={true}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#fff',
                      width: '90%',
                      borderRadius: 15,
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        padding: 15,
                        fontSize: 15,
                        paddingTop: 30,
                        paddingBottom: 20,
                        fontWeight: 'bold',
                        color: 'rgba(0,0,0,.6)',
                      }}>
                      Selectionnez un pays/ region
                    </Text>
                    <View style={{width: '100%', paddingHorizontal: 10}}>
                      <View
                        style={[
                          {
                            width: '100%',
                            height: 45,
                            paddingHorizontal: 20,
                            backgroundColor: 'rgba(100,100,100,.2)',
                            borderRadius: 50,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            position: 'absolute',
                            marginBottom: 20,
                          },
                        ]}>
                        <SearchIcon color={'#841584'} />
                        <TextInput
                          value={searchText}
                          onChangeText={text => filterListCountries(text)}
                          placeholderTextColor={'rgba(100,100,100,.7)'}
                          placeholder="Recherchez..."
                          
                          style={{
                            backgroundColor: 'transparent',
                            borderRadius: 50,
                            flex: 1,
                            color:couleurs.primary
                          }}></TextInput>
                      </View>

                      <View style={{height: 300, marginTop: 55}}>
                        <CountryList />
                      </View>

                      <View style={{padding: 15}}>
                        <Pressable
                          onPress={handleCloseModalCountries}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            justifyContent: 'flex-start',
                          }}>
                          <CloseIcon color={'#841584'} />
                          <Text
                            style={{
                              color: 'rgba(100,100,100,.8)',
                              marginVertical: 10,
                            }}>
                            Quitter
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>

              {/* MODAL LANGAGE */}
              <Modal visible={modalVisibleLanguages} transparent={true}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#fff',
                      width: '90%',
                      borderRadius: 15,
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        padding: 15,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'rgba(0,0,0,.6)',
                      }}>
                      Selectionnez une langue
                    </Text>
                    <View style={{width: '100%', paddingHorizontal: 10}}>
                      <View
                        style={[
                          {
                            width: '100%',
                            height: 45,
                            paddingHorizontal: 20,
                            backgroundColor: 'rgba(100,100,100,.2)',
                            borderRadius: 50,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 20,
                          },
                        ]}>
                        <SearchIcon color={'#841584'} />
                        <TextInput
                          placeholderTextColor={'rgba(100,100,100,.7)'}
                          placeholder="Recherchez..."
                          style={{
                            backgroundColor: 'transparent',
                            borderRadius: 50,
                            flex: 1,
                            color:couleurs.primary
                          }}></TextInput>
                      </View>

                      <LanguageList />

                      <View style={{padding: 15, paddingVertical: 30}}>
                        <Pressable onPress={handleCloseModalLanguages} style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      justifyContent: 'flex-start',
                    }}>
                    <CloseIcon color={'#841584'} />
                          <Text style={{color: 'rgba(100,100,100,.8)'}}>
                            Quitter
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
