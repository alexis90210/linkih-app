import React, {useRef, useState} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

import MenuIcon from '../components/menu';
import ShopIcon from '../components/shop';
import LogoutIcon from '../components/logout';
import AccountIcon from '../components/account';
import SearchIcon from '../components/search';

function Main({navigation}: {navigation: any}) {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
    'left',
  );

  const [activeTab, setActiveTab] = useState('Tab 1');

  const handleTabPress = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  const navigationView = () => (
    <View
      style={{
        backgroundColor: '#7B4C7A',
        flex: 1,
        padding: 16,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <Pressable
          android_ripple={{color: '7B4C7A'}}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 10,
            alignItems: 'center',
          }}
          onPress={() => {
            drawer.current?.closeDrawer(), navigation.navigate('compte');
          }}>
          <AccountIcon />
          <Text style={{fontSize: 16, marginVertical: 10, color: '#E2C6BB'}}>
            Mon compte
          </Text>
        </Pressable>

        <Pressable
          android_ripple={{color: '7B4C7A'}}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 10,
            alignItems: 'center',
          }}
          onPress={() => {
            drawer.current?.closeDrawer(), navigation.navigate('espace_etab');
          }}>
          <ShopIcon />
          <Text style={{fontSize: 16, marginVertical: 10, color: '#E2C6BB'}}>
            Mon etablissement
          </Text>
        </Pressable>

        <Pressable
          android_ripple={{color: '7B4C7A'}}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 10,
            alignItems: 'center',
          }}
          onPress={() => drawer.current?.closeDrawer()}>
          <LogoutIcon />
          <Text style={{fontSize: 16, marginVertical: 10, color: '#E2C6BB'}}>
            Deconnexion
          </Text>
        </Pressable>
      </View>
    </View>
  );

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
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}      
      renderNavigationView={navigationView}>
      <View>
        <SafeAreaView
          style={{
            width: '100%',
            height: '100%',
          }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{
              backgroundColor: '#fff',
            }}>
            {/* Banner Image */}
            <Image
              source={require('../assets/images/banner.jpeg')}
              style={{
                height: 200,
                width: '100%',
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
              }}
            />

            {/* Hamburger Button */}
            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                position: 'absolute',
                zIndex: 22,
                top: 20,
                left: 20,
              }}
              onPress={() => drawer.current?.openDrawer()}>
              <MenuIcon />
            </Pressable>

            {/* Welcome text */}
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                color: 'rgba(0,0,0,.4)',
                fontWeight: '600',
                paddingHorizontal: 50,
                paddingVertical: 20,
              }}>
              Decouvrez et reservez le salon qui vous correpond !
            </Text>

            <View style={styles.container}>
              <View style={styles.tabsContainer}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === 'Tab 1' && styles.activeTab,
                  ]}
                  onPress={() => handleTabPress('Tab 1')}>
                  <Text style={styles.tabText}>Filtrez</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === 'Tab 2' && styles.activeTab,
                  ]}
                  onPress={() => handleTabPress('Tab 2')}>
                  <Text style={styles.tabText}>Etablissement</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                {activeTab === 'Tab 1' && (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      width: '100%',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingTop: 20,
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#000',
                          fontSize: 15,
                          opacity: 0.85,
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
                          marginTop: 10,
                        }}></TextInput>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingTop: 20,
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#000',
                          fontSize: 15,
                          opacity: 0.85,
                        }}>
                        Categorie
                      </Text>
                      <TextInput
                      onPressIn={handleOpenModalLanguages}
                      value={currentLanguage.name}
                        style={{
                          backgroundColor: 'transparent',
                          borderBottomWidth: 1,
                          borderBottomColor: '#E2C6BB',
                          color: '#7B4C7A',
                          width: '100%',
                          fontWeight: '600',
                          padding: 0,
                          marginTop: 10,
                        }}></TextInput>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: '#7B4C7A',
                        borderRadius: 30,
                        marginVertical: 30,
                        width: '100%',
                      }}>
                      <Pressable
                        android_ripple={{color: '7B4C7A'}}
                        style={{
                          paddingHorizontal: 10,
                        }}
                        onPress={() => navigation.navigate('map')}>
                        <Text
                          style={{
                            textAlign: 'center',
                            padding: 10,
                            paddingHorizontal: 20,
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#fff',
                          }}>
                          Recherchez
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}
                {activeTab === 'Tab 2' && (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      width: '100%',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingTop: 20,
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#000',
                          fontSize: 15,
                          opacity: 0.85,
                        }}>
                        Etablissement
                      </Text>
                      <TextInput
                        style={{
                          backgroundColor: 'transparent',
                          borderBottomWidth: 1,
                          borderBottomColor: '#E2C6BB',
                          color: '#7B4C7A',
                          width: '100%',
                          fontWeight: '600',
                          padding: 0,
                          marginTop: 10,
                        }}></TextInput>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: '#7B4C7A',
                        borderRadius: 30,
                        marginVertical: 30,
                        width: '100%',
                      }}>
                      <Pressable
                        android_ripple={{color: '7B4C7A'}}
                        style={{
                          paddingHorizontal: 10,
                        }}
                        onPress={() => navigation.navigate('map')}>
                        <Text
                          style={{
                            textAlign: 'center',
                            padding: 10,
                            paddingHorizontal: 20,
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#fff',
                          }}>
                          Recherchez
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </View>
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
          </ScrollView>
        </SafeAreaView>        
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f6f6f6f6',
  },
  activeTab: {
    backgroundColor: '#6e3b6e',
  },
  tabText: {
    color: '#E2C6BB',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
