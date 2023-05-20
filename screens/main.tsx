import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';

import GetLocation from 'react-native-get-location';
import ShopIcon from '../components/shop';
import SearchIcon from '../components/search';
import CloseIcon from '../components/close';
import AccountIcon from '../components/account';
import RdvIcon from '../components/rdv';
import FilterIcon from '../components/filter';
import {CustomFont, couleurs} from '../components/color';
import MapIcon from '../components/map';
import axios from 'axios';
import ApiService from '../components/api/service';
import storage from '../components/api/localstorage';
import translations from '../translations/translations';
import secureStorage from '../components/api/secureStorage';


function Main({navigation}: {navigation: any}) {
  /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////////

  const [preferredLangage, setPreferredLangage] = useState('fr');

  const t = (key: any, langage: any) => {
    return translations[langage][key] || key;
  };

  secureStorage.getKey('defaultlang').then(res => {
    if ( res ) {
      setPreferredLangage(res);
    } else {
      setPreferredLangage(preferredLangage);
    }
  }, (err) => {
    console.log(err)
  })

  //////////////////////////////////////////////////////////////////////////////////////

  // GET USER CONNECTED
  const [userConnectedRole, SetUserRole] = useState('');

  storage
    .load({
      key: 'userconnected', // Note: Do not use underscore("_") in key!
      id: 'userconnected', // Note: Do not use underscore("_") in id!
    })
    .then(data => {
      console.log('role=======', data.role);

      SetUserRole(data.role);
    })
    .catch(error => console.log(error));

  // LOAD CATEGORIES
  const [sous_categories, setCategories] = useState([]);
  const [isLoadedCategorie, setLoadedCategorie] = useState(false);

  const loadCategories = () => {
    axios({
      method: 'GET',
      url: ApiService.API_URL_GET_CATEGORIES,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        if (api.code == 'success') {
          setLoadedCategorie(true);
          setCategories(api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  if (!isLoadedCategorie) loadCategories();

  // USER POSITION
  const [myPosition, SetMyPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  // GET USER POSITION
  const getUserPosition = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);

        SetMyPosition({
          latitude: Number(location.latitude),
          longitude: Number(location.longitude),
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  //  NAVIGATE TO A NEW SCREEN
  const goTo = (screen: any, params: any) => {
    getUserPosition();
    setTimeout(() => {
      navigation.navigate(screen, {...myPosition});
    }, 1000);
  };

  const [activeTab, setActiveTab] = useState('Tab 1');

  const handleTabPress = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  // Categories
  const [modalVisibleCategories, setModalVisibleCategories] = useState(false);
  const [currentCategorie, setCurrentCategorie] = useState<any>({});

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
        <TouchableOpacity onPress={() => selectCategorie(item)}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              gap: 10,
            }}>
            <ShopIcon color={couleurs.primary} />
            <Text
              style={{
                fontFamily: CustomFont.Poppins,
              }}>
              {item.nom}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{height: 1, overflow: 'hidden', paddingHorizontal: 10}}>
          <View
            style={{
              height: 1,
              borderWidth: 1,
              borderColor: couleurs.primary,
              borderStyle: 'dashed',
            }}></View>
        </View>
      </View>
    );

    return (
      <FlatList
        data={sous_categories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  // LISTE DES ETABLISSEMENT

  const [modalVisibleEtablissement, setModalVisibleEtablissement] =
    useState(false);
  const [currentEtablissement, setCurrentEtablissement] = useState({nom: ''});
  const [etablissements, setEtablissements] = useState([]);
  const [etablissementsTmp, setEtablissementsTmp] = useState([]);
  const [searchVal, setSearchVal] = useState('');

  const loadEtablissements = () => {
    axios({
      method: 'GET',
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
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleOpenModalEtablissement = () => {
    loadEtablissements();
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
        <TouchableOpacity onPress={() => selectEtablissement(item)}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              gap: 10,
            }}>
            <ShopIcon color={couleurs.secondary} />
            <Text
              style={{
                color: 'rgba(100,100,100,1)',
                fontFamily: CustomFont.Poppins,
              }}>
              {item.nom}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{height: 1, overflow: 'hidden', paddingHorizontal: 10}}>
          <View
            style={{
              height: 1,
              borderWidth: 1,
              borderColor: couleurs.primary,
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

  // SEARCH SALON BY REGION + CATEGORIE

  const searchSalon = () => {
    navigation.navigate('resultat_recherche', {
      title: t('Resultat_recherche', preferredLangage),
      currentCategorie: currentCategorie.nom,
      activateSearch: true,
    });
  };

  // SEARCH BY ETAB
  const searchOnlybYName = () => {
    navigation.navigate('resultat_recherche', {
      title: t('Resultat_recherche', preferredLangage),
      currentEtablissement: currentEtablissement.nom,
      activateSearch: true,
    });
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
          backgroundColor: couleurs.primary,
          width: '100%',
          paddingVertical: 8,
        }}>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
          onPress={() => navigation.navigate('menu')}>
          <AccountIcon color={couleurs.secondary} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontFamily: CustomFont.Poppins,
            color: couleurs.secondary,
          }}>
          Linkih
        </Text>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
          onPress={() =>
            userConnectedRole != 'ROLE_CLIENT'
              ? navigation.navigate('rdv')
              : navigation.navigate('rdv_client')
          }>
          <RdvIcon color={couleurs.secondary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          backgroundColor: '#fff',
        }}>
        {/* Banner Image */}
        <Image
          source={require('../assets/images/1.jpg')}
          style={{
            height: 200,
            width: '100%',
          }}
        />

        <View
          style={{
            position: 'relative',
            top: -40,
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 20,
          }}>
          {/* Welcome text */}

          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              padding: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'transparent',
                borderRadius: 15,
                overflow: 'hidden',
              }}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'Tab 1' && styles.activeTab]}
                onPress={() => handleTabPress('Tab 1')}>
                <FilterIcon
                  color={activeTab === 'Tab 1' ? couleurs.primary : couleurs.dark}
                />
                <Text
                  style={[
                    styles.tabText,
                    {fontFamily: CustomFont.Poppins},
                    activeTab === 'Tab 1' && styles.colorActive,
                  ]}>
                  {t('Categorie', preferredLangage)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'Tab 2' && styles.activeTab]}
                onPress={() => handleTabPress('Tab 2')}>
                <ShopIcon
                  color={activeTab === 'Tab 2' ? couleurs.primary : couleurs.dark}
                />
                <Text
                  style={[
                    styles.tabText,
                    {fontFamily: CustomFont.Poppins},
                    activeTab === 'Tab 2' && styles.colorActive,
                  ]}>
                  {t('Etablissement', preferredLangage)}
                </Text>
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
                        color: couleurs.dark,
                        fontSize: 13,
                        opacity: 0.85,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      {t('Categorie', preferredLangage)}
                    </Text>
                    <TextInput
                      onPressIn={handleOpenModalCategories}
                      value={currentCategorie.nom}
                      placeholderTextColor={'rgba(100,100,100,.7)'}
                      placeholder={t(
                        'Selectionnez_une_categorie',
                        preferredLangage,
                      )}
                      style={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 1,
                        borderBottomColor: couleurs.primaryLight,
                        color: couleurs.primary,
                        width: '100%',
                        fontWeight: '600',
                        fontSize: 13,
                        padding: 10,
                        fontFamily: CustomFont.Poppins,
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
                        color: couleurs.dark,
                        fontSize: 13,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      {t('Etablissement', preferredLangage)}
                    </Text>

                    <TextInput
                      onPressIn={handleOpenModalEtablissement}
                      value={currentEtablissement.nom}
                      placeholderTextColor={'rgba(100,100,100,.7)'}
                      placeholder={t(
                        'Selectionnez_un_etablissement',
                        preferredLangage,
                      )}
                      style={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 1,
                        borderBottomColor: couleurs.primaryLight,
                        color: couleurs.primary,
                        width: '100%',
                        fontWeight: '600',
                        padding: 10,
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                      }}></TextInput>
                  </View>
                </View>
              )}
            </View>

            <View
              style={{
                alignItems: 'center',
                marginVertical: 50,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 10,
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  borderRadius: 30,
                  width: '100%',

                  borderWidth: 1,
                  borderColor: couleurs.primary,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
                onPress={() =>
                  activeTab === 'Tab 1' ? searchSalon() : searchOnlybYName()
                }>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 5,
                    width: 200,
                  }}>
                  <SearchIcon color={couleurs.primary} />
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 13,
                      color: couleurs.primary,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    {t('Valider_la_recherche', preferredLangage)}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  backgroundColor: couleurs.dark,
                  borderRadius: 30,
                  width: '100%',
                }}
                onPress={() =>
                  goTo('map', {
                    ...myPosition,
                  })
                }>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: 200,
                    gap: 5,
                  }}>
                  <MapIcon color={couleurs.secondary} />
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 13,
                      fontWeight: '500',
                      color: couleurs.secondary,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    {t('Explorer_sur_la_map', preferredLangage)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* MODAL CATEGORIE */}
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
                fontSize: 13,
                fontWeight: 'bold',
                color: 'rgba(0,0,0,.6)',
                fontFamily: CustomFont.Poppins,
              }}>
              {t('Selectionnez_une_categorie', preferredLangage)}
            </Text>
            <View style={{width: '100%', paddingHorizontal: 10}}>
              <View style={{height: 300}}>
                <CategorieList />

              </View>

              <View style={{padding: 15, paddingVertical: 30}}>
                <TouchableOpacity
                  onPress={handleCloseModalCategories}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    justifyContent: 'flex-start',
                  }}>
                  <CloseIcon color={couleurs.primary} />
                  <Text
                    style={{
                      color: 'rgba(100,100,100,.8)',
                      fontFamily: CustomFont.Poppins,
                    }}>
                    {t('Quitter', preferredLangage)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL ETABLISSEMENT */}
      <Modal visible={modalVisibleEtablissement} transparent={false}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            width: '100%',
            borderRadius: 15,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: couleurs.primary,
              width: '100%',
              padding: 10,
              height: 50,
            }}>
            <Text
              style={{
                fontSize: 13,
                color: couleurs.white,
                fontFamily: CustomFont.Poppins,
              }}>
              {t('Selectionnez_un_etablissement', preferredLangage)}
            </Text>
            <TouchableOpacity onPress={handleCloseModalEtablissement}>
              <CloseIcon color={couleurs.white} />
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', paddingHorizontal: 10}}>
            <View style={{height: Dimensions.get('screen').height - 50}}>
              {etablissements.length> 0 && <EtablissementList />}
              {etablissements.length == 0 && (
              <>
                <Image
                  source={require('../assets/images/vide.png')}
                  style={{
                    marginTop: 150,
                    width: 150,
                    height: 150,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontFamily: CustomFont.Poppins,
                    color:couleurs.dark,
                    fontSize: 13,
                  }}>
                  {t('aucun_etab', preferredLangage)}
                </Text>
              </>
            )}
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
    fontFamily: CustomFont.Poppins,
  },
  activeTab: {
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderColor: couleurs.primary,
    fontFamily: CustomFont.Poppins,
  },
  colorActive: {
    color: couleurs.primary,
    fontFamily: CustomFont.Poppins,
  },
  tabText: {
    color: couleurs.dark,
    fontFamily: CustomFont.Poppins,
    fontSize: 13,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: CustomFont.Poppins,
  },
});

export default Main;
