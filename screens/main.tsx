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
  FlatList,
  Modal,
  ImageBackground,
  Alert,
} from 'react-native';

import GetLocation from 'react-native-get-location';

import ShopIcon from '../components/shop';
import SearchIcon from '../components/search';
import WorldIcon from '../components/world';
import CloseIcon from '../components/close';
import AccountIcon from '../components/account';
import RdvIcon from '../components/rdv';
import FilterIcon from '../components/filter';
import {couleurs} from '../components/color';
import MapIcon from '../components/map';
import axios from 'axios';
import ApiService from '../components/api/service';

function Main({navigation}: {navigation: any}) {
  const [myPosition, SetMyPosition] = useState({
    latitude: 0,
    longitude: 0
  });
  const getUserPosition = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);

        SetMyPosition({
          latitude: Number(location.latitude),
          longitude: Number(location.longitude)
        })

        // let url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+location.latitude+','+location.longitude+'&sensor=true&key=' + ApiService.GEOCODE_KEY
        // axios.get(url)
        // .then( cities => {
        //   console.log(cities);          
        // })
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };


  const goTo = (screen:any, params:any) => {
    getUserPosition()
    setTimeout(() => {
      
      navigation.navigate(screen, {...myPosition})
    }, 1000);
  }

  


  const [activeTab, setActiveTab] = useState('Tab 1');

  const handleTabPress = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  // Ville
  const [modalVisibleVille, setModalVisibleVille] = useState(false);
  const [currentVille, setCurrentVille] = useState({name: ''});

  const Ville = [
    {name: 'Brazzaville', flag: 'https://www.countryflags.io/AF/flat/64.png'},
    {name: 'Pointe-noire', flag: 'https://www.countryflags.io/AL/flat/64.png'},
    {name: 'Nkayi', flag: 'https://www.countryflags.io/DZ/flat/64.png'},
    // add more Ville here
  ];

  const handleOpenModalVille = () => {
    setModalVisibleVille(true);
  };

  const handleCloseModalVille = () => {
    setModalVisibleVille(false);
  };

  const selectVille = (item: any) => {
    setCurrentVille(item);
    handleCloseModalVille();
  };

  const VilleList = () => {
    const renderItem = ({item}: {item: any}) => (
      <View>
        <Pressable onPress={() => selectVille(item)}>
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
        data={Ville}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  // Categories
  const [modalVisibleCategories, setModalVisibleCategories] = useState(false);
  const [currentCategorie, setCurrentCategorie] = useState({name: ''});

  const categories = [

    {
      name: "Esthétique",
      sous_categorie: [
          "Techniciennes de Blanchiment dentaire",
          "Traitement du visage et corps",
          "Techniciennes de cils",
          "prothésiste ongulaire",
          "tatouage / détatouage ",
          "maquilleuse",
          "massage",
          "ventes produits pour le corps ",
          "ventes produits pour le visage"
      ]
    },
  {
      name: "Capillaire",
      sous_categorie: [
          "coiffeur/euse Afro",
          "coiffeur/euse lissage",
          "coiffeur/euse lace wig",
          "ventes produits pour les cheveux"
      ]
    },
  {
      name: "Texttiles",
      sous_categorie: [
          "Boutique en ligne féminine",
          "Boutique en ligne masculine",
          "Boutique enfants",
          "Boutique mixte"
      ]
    }


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
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              gap: 10,
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
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  // etablissement
  const [modalVisibleEtablissement, setModalVisibleEtablissement] =
    useState(false);
  const [currentEtablissement, setCurrentEtablissement] = useState({name: ''});
  const [etablissements, setEtablissements] = useState([]);

  const loadEtablissements = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_VENDEURS,
      headers: {
        Accept: 'application/json',
       'Content-Type': 'application/json'
     }
    })
      .then((response: {data: any}) => {
        var api = response.data;        
        if ( api.code == "success") { 
          setEtablissements(api.message)}
        if ( api.code == "error") {
          Alert.alert('Erreur', api.message, [        
            {text: 'OK', onPress: () => null},
          ]);
        }         
      })
      .catch((error: any) => {
       console.log(error);
       Alert.alert('Erreur', error, [        
        {text: 'OK', onPress: () => null},
      ]);
       
      });
  }

  const handleOpenModalEtablissement = () => {
    loadEtablissements()
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
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              gap: 10,
            }}>
            <ShopIcon color={'#841584'} />
            <Text style={{color: 'rgba(100,100,100,1)'}}>{item.nom}</Text>
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
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
      }}>
      {/* Hamburger Button */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#7B4C7A',
          width: '100%',
          paddingVertical: 8,
        }}>
        <Pressable
          android_ripple={{color: '7B4C7A'}}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
          onPress={() => navigation.navigate('menu')}>
          <AccountIcon color={couleurs.secondary} />
        </Pressable>
        <Text
          style={{fontSize: 22, fontWeight: '800', color: couleurs.secondary}}>
          Linkih
        </Text>
        <Pressable
          android_ripple={{color: '7B4C7A'}}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
          onPress={() => navigation.navigate('rdv')}>
          <RdvIcon color={couleurs.secondary} />
        </Pressable>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          backgroundColor: '#fff',
        }}>
        {/* Banner Image */}
        <ImageBackground
          resizeMode="cover"
          source={require('../assets/images/banner.jpeg')}
          style={{
            height: 200,
            width: '100%',
          }}
        />

        <View>
          {/* Welcome text */}

          <View
            style={{
              padding: 20,
              backgroundColor: '#fff',
              borderRadius: 15,
              width: '95%',
              alignSelf: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'transparent',
                borderRadius: 15,
                overflow: 'hidden',
              }}>
              <Pressable
                style={[styles.tab, activeTab === 'Tab 1' && styles.activeTab]}
                onPress={() => handleTabPress('Tab 1')}>
                <FilterIcon
                  color={activeTab === 'Tab 1' ? couleurs.main : '#000'}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'Tab 1' && styles.colorActive,
                  ]}>
                  Filtrez
                </Text>
              </Pressable>
              <Pressable
                style={[styles.tab, activeTab === 'Tab 2' && styles.activeTab]}
                onPress={() => handleTabPress('Tab 2')}>
                <ShopIcon
                  color={activeTab === 'Tab 2' ? couleurs.main : '#000'}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'Tab 2' && styles.colorActive,
                  ]}>
                  Etablissement
                </Text>
              </Pressable>
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
                      onPressIn={handleOpenModalVille}
                      value={currentVille.name}
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
                </View>
              )}
            </View>

            <View
              style={{
                alignItems: 'center',
                marginVertical: 30,
                marginHorizontal: 50,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 30,
              }}>
              <Pressable
                android_ripple={{color: '7B4C7A'}}
                style={{
                  paddingHorizontal: 30,
                  backgroundColor: '#7B4C7A',
                  borderRadius: 30,
                }}
                onPress={() =>  goTo('map', {
                  ...myPosition
                })}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 5,
                  }}>
                  <SearchIcon color={couleurs.secondary} />
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 14,
                      fontWeight: '500',
                      color: couleurs.secondary,
                    }}>
                    Recherchez
                  </Text>
                </View>
              </Pressable>
              <Pressable
                android_ripple={{color: '7B4C7A'}}
                style={{
                  paddingHorizontal: 30,
                  // width: 260,
                  backgroundColor: '#7B4C7A',
                  borderRadius: 30,
                }}
                onPress={() => goTo('map', {
                  ...myPosition
                })}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 5,
                    padding: 8,
                  }}>
                  <MapIcon color={couleurs.secondary} />
                  {/* <Text
              style={{
                textAlign: 'center',
                padding: 10,
                paddingHorizontal: 20,
                fontSize: 14,
                fontWeight: '500',
                color: couleurs.secondary,
              }}>
              Explorer sur la carte
            </Text> */}
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* MODAL VILLE */}

      <Modal visible={modalVisibleVille} transparent={true}>
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
              Selectionnez une ville
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
                    color: couleurs.primary,
                    flex: 1,
                  }}></TextInput>
              </View>

              <VilleList />

              <View style={{padding: 15}}>
                <Pressable
                  onPress={handleCloseModalVille}
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
              padding: 10,
            }}>
            <Text
              style={{
                padding: 15,
                fontSize: 15,
                fontWeight: 'bold',
                color: 'rgba(0,0,0,.6)',
              }}>
              Selectionnez une categorie
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
                    color: couleurs.primary,
                    flex: 1,
                  }}></TextInput>
              </View>

              <CategorieList />

              <View style={{padding: 15, paddingVertical: 30}}>
                <Pressable
                  onPress={handleCloseModalCategories}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    justifyContent: 'flex-start',
                  }}>
                  <CloseIcon color={'#841584'} />
                  <Text style={{color: 'rgba(100,100,100,.8)'}}>Quitter</Text>
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
              padding: 10,
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
                    color: couleurs.primary,
                    flex: 1,
                  }}></TextInput>
              </View>

              <EtablissementList />

              <View style={{padding: 15, paddingVertical: 30}}>
                <Pressable
                  onPress={handleCloseModalEtablissement}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    justifyContent: 'flex-start',
                  }}>
                  <CloseIcon color={'#841584'} />
                  <Text style={{color: 'rgba(100,100,100,.8)'}}>Quitter</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    color: couleurs.secondary,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderColor: couleurs.main,
  },
  colorActive: {
    color: couleurs.main,
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
