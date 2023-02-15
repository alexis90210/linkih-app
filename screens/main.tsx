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
import FlagPlaceIcon from '../components/flag';
import LanguageIcon from '../components/language';
import WorldIcon from '../components/world';

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
          <AccountIcon color={"#E2C6BB"} />
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
          <ShopIcon color={'#E2C6BB'} />
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
  const [currentCountry, setCurrentCountry] = useState({name: ''});

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

  const selectCountry = (item: any) => {
    setCurrentCountry(item);
    handleCloseModalCountries();
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
            <WorldIcon />
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
        data={countries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  // Categories
  const [modalVisibleCategories, setModalVisibleCategories] = useState(false);
  const [currentCategorie, setCurrentCategorie] = useState({name: ''});

  const categories = [
    {name: 'Categorie 1', flag: 'https://www.countryflags.io/AF/flat/64.png'},
    {name: 'Categorie 2', flag: 'https://www.countryflags.io/AL/flat/64.png'},
    {name: 'Categorie 3', flag: 'https://www.countryflags.io/DZ/flat/64.png'},
    // add more categories here
  ];

  const handleOpenModalCategories = () => {
    setModalVisibleCategories(true);
  };

  const handleCloseModalCategories = () => {
    setModalVisibleCategories(false);
  };

  const selectCategorie = (item: any) => {
    setCurrentCategorie(item);
    handleCloseModalCategories();
  };

  const CategorieList = () => {
    const renderItem = ({item}: {item: any}) => (
      <View>
        <Pressable onPress={() => selectCategorie(item)}>
          <View
            style={{
              display:'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              gap:10
            }}>
            <ShopIcon color={'#841584'}  />
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
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  // etablissement
   const [modalVisibleEtablissement, setModalVisibleEtablissement] = useState(false);
   const [currentEtablissement, setCurrentEtablissement] = useState({name: ''});
 
   const etablissements = [
     {name: 'Etablissement 1', flag: 'https://www.countryflags.io/AF/flat/64.png'},
     {name: 'Etablissement 2', flag: 'https://www.countryflags.io/AL/flat/64.png'},
     {name: 'Etablissement 3', flag: 'https://www.countryflags.io/DZ/flat/64.png'},
     // add more categories here
   ];
 
   const handleOpenModalEtablissement = () => {
     setModalVisibleEtablissement(true);
   };
 
   const handleCloseModalEtablissement = () => {
     setModalVisibleEtablissement(false);
   };
 
   const selectEtablissement = (item: any) => {
     setCurrentEtablissement(item);
     handleCloseModalEtablissement();
   };
 
   const EtablissementList = () => {
     const renderItem = ({item}: {item: any}) => (
       <View>
         <Pressable onPress={() => selectEtablissement(item)}>
           <View
             style={{
               display:'flex',
               flexDirection: 'row',
               alignItems: 'center',
               marginVertical: 10,
               gap:10
             }}>
             <ShopIcon color={'#841584'} />
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
         data={etablissements}
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
                height: 300,
                width: '100%',
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
                fontSize: 20,
                textAlign: 'center',
                color: '#000',
                fontWeight: '700',
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
                        placeholderTextColor={'rgba(100,100,100,.7)'}
                        placeholder="choisir ..."
                        style={{
                          backgroundColor: 'transparent',
                          borderBottomWidth: 1,
                          borderBottomColor: '#E2C6BB',
                          color: '#7B4C7A',
                          width: '100%',
                          fontWeight: '600',
                          padding: 10,
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
                        onPressIn={handleOpenModalCategories}
                        value={currentCategorie.name}
                        placeholderTextColor={'rgba(100,100,100,.7)'}
                        placeholder="choisir ..."
                        style={{
                          backgroundColor: 'transparent',
                          borderBottomWidth: 1,
                          borderBottomColor: '#E2C6BB',
                          color: '#7B4C7A',
                          width: '100%',
                          fontWeight: '600',
                          padding: 10,
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
                      onPressIn={handleOpenModalEtablissement}
                      value={currentEtablissement.name}
                        placeholderTextColor={'rgba(100,100,100,.7)'}
                        placeholder="choisir ..."
                        style={{
                          backgroundColor: 'transparent',
                          borderBottomWidth: 1,
                          borderBottomColor: '#E2C6BB',
                          color: '#7B4C7A',
                          width: '100%',
                          fontWeight: '600',
                          padding: 10,
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
                    paddingHorizontal:10
                  }}>
                  <Text
                    style={{
                      padding: 15,
                      fontSize: 15,
                      paddingTop:30,
                      paddingBottom:20,
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
                          
                          marginBottom:20
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
                        }}></TextInput>
                    </View>

                    <CountryList />

                    <View style={{padding: 15}}>
                      <Pressable onPress={handleCloseModalCountries}>
                        <Text style={{color:'rgba(100,100,100,.8)', marginVertical:10}}>Quitter</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>

            {/* MODAL LANGAGE */}
            <Modal visible={modalVisibleCategories} transparent={true}>
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
                    padding:10
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
                          marginBottom:20
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
                        }}></TextInput>
                    </View>

                    <CategorieList />

                    <View style={{padding: 15, paddingVertical:30}}>
                      <Pressable onPress={handleCloseModalCategories}>
                        <Text style={{color:'rgba(100,100,100,.8)'}}>Quitter</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>

            {/* MODAL ETABLISSEMENT */}
            <Modal visible={modalVisibleEtablissement} transparent={true}>
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
                    padding:10
                  }}>
                  <Text
                    style={{
                      padding: 15,
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'rgba(0,0,0,.6)',
                    }}>
                    Selectionnez un etablissement
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
                          marginBottom:20
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
                        }}></TextInput>
                    </View>

                    <EtablissementList />

                    <View style={{padding: 15, paddingVertical:30}}>
                      <Pressable onPress={handleCloseModalEtablissement}>
                        <Text style={{color:'rgba(100,100,100,.8)'}}>Quitter</Text>
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
