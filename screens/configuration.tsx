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
} from 'react-native';

import SearchIcon from '../components/search';

// ConfigurationScreen
export default function ConfigurationScreen({navigation}: {navigation: any}) {
 
  // countries
  const [modalVisibleCountries, setModalVisibleCountries] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({name:''});


  const countries = [
    {name: 'Afghanistan', flag: 'https://www.countryflags.io/AF/flat/64.png'},
    {name: 'Albania', flag: 'https://www.countryflags.io/AL/flat/64.png'},
    {name: 'Algeria', flag: 'https://www.countryflags.io/DZ/flat/64.png'},
    // add more countries here
  ];

  const handleOpenModalCountries = () => {
    setModalVisibleCountries(true);
  };

  const handleCloseModalCountries = () => {
    setModalVisibleCountries(false);
  };

  const selectCountry = ( item: any) => {
    setCurrentCountry(item)
    handleCloseModalCountries()    
    
  }

  const CountryList = () => {
    const renderItem = ({item}: {item: any}) => (
    <Pressable onPress={() => selectCountry(item)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Image
          source={{uri: item.flag}}
          style={{width: 30, height: 20, marginRight: 10}}
        />
        <Text>{item.name}</Text>
      </View>

      </Pressable>
    );

    return (
      <FlatList
        data={countries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };


  // Languages
  const [modalVisibleLanguages, setModalVisibleLanguages] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({name:''});

  const langages = [
    {name: 'Francais', flag: 'https://www.countryflags.io/AF/flat/64.png'},
    {name: 'Anglais', flag: 'https://www.countryflags.io/AL/flat/64.png'},
    {name: 'Espagnol', flag: 'https://www.countryflags.io/DZ/flat/64.png'},
    // add more langages here
  ];

  const handleOpenModalLanguages = () => {
    setModalVisibleLanguages(true);
  };

  const handleCloseModalLanguages = () => {
    setModalVisibleLanguages(false);
  };

  const selectLanguage = ( item: any) => {
    setCurrentLanguage(item)
    handleCloseModalLanguages()    
    
  }

  const LanguageList = () => {
    const renderItem = ({item}: {item: any}) => (
    <Pressable onPress={() => selectLanguage(item)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Image
          source={{uri: item.flag}}
          style={{width: 30, height: 20, marginRight: 10}}
        />
        <Text>{item.name}</Text>
      </View>

      </Pressable>
    );

    return (
      <FlatList
        data={langages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };



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
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    width: '100%',
                    fontWeight: '600',
                    padding: 0,
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
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2C6BB',
                    color: '#7B4C7A',
                    fontWeight: '600',
                    width: '100%',
                    padding: 0,
                  }}></TextInput>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#7B4C7A',
                  borderRadius: 30,
                  marginBottom: 30,
                }}>
                <Pressable
                  android_ripple={{color: '7B4C7A'}}
                  style={{
                    paddingHorizontal: 10,
                    width: '70%',
                  }}
                  onPress={() => navigation.navigate('identification')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#fff',
                    }}>
                    Contiunez
                  </Text>
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
                    }}>
                    <Text
                      style={{
                        padding: 15,
                        fontSize: 15,
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

                      <CountryList/>

                      <View style={{padding: 15}}>

                        <Pressable onPress={handleCloseModalCountries}>
                          <Text>Close</Text>
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

                      <LanguageList/>

                      <View style={{padding: 15}}>

                        <Pressable onPress={handleCloseModalLanguages}>
                          <Text>Close</Text>
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
