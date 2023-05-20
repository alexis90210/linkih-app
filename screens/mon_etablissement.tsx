import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import RdvIcon from '../components/rdv';
import {AirbnbRating} from 'react-native-ratings';
import {CustomFont, couleurs} from '../components/color';
import HomeIcon from '../components/home';
import storage from '../components/api/localstorage';
import MapIcon from '../components/map';
import ArrowRightIcon from '../components/ArrowRight';
import translations from '../translations/translations';
import * as Progress from 'react-native-progress';
import secureStorage from '../components/api/secureStorage';


export default function MonEtablissement({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////

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

  const propsTitle = route.params?.nomEtab;
  var title = t('mon_etablissement', preferredLangage);

  const [etablissement, setEtablissement] = useState<any>({});
  const [proprietaire, setProprietaire] = useState<any>({});
  const [lien_reseaux_sociaux, setLien_reseaux_sociaux] = useState<any[]>([]);
  const [horaire_ouverture, setHoraire_ouverture] = useState<any[]>([]);

  storage
    .load({
      key: 'userconnected', // Note: Do not use underscore("_") in key!
      id: 'userconnected',  // Note: Do not use underscore("_") in id!
    })
    .then(data => {
      if (data.role != 'ROLE_VENDEUR') {
        navigation.navigate('identification_proprietaire');
      }

      setEtablissement(data.etablissement[0]);
      setProprietaire(data.utilisateur[0]);
      setLien_reseaux_sociaux(data.lien_reseaux_sociaux);
      setHoraire_ouverture(data.horaire_ouverture);
    })
    .catch(error => console.log('ERREUR RECUP DATA', error));

  return (
    <View>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 30,
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: couleurs.primary,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('main')}>
            <HomeIcon color={couleurs.white} />
          </TouchableOpacity>
          <Text
            style={{
              color: couleurs.white,
              fontSize: 18,
              fontFamily: CustomFont.Poppins,
            }}>
            {title}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('map')}>
            <MapIcon color={couleurs.white} />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          {/* Banner Image */}
          <View style={{width: '100%'}}>
            <Image
              source={
                etablissement.logo
                  ? {uri: 'data:image/png;base64,' + etablissement.logo}
                  : require('../assets/images/cover.jpg')
              }
              style={{
                height: 200,
                width: '100%',
                // borderRadius: 15,
                // marginTop: 2,
                borderWidth: 1,
                borderColor: couleurs.primary,
              }}
            />
          </View>

          <View
            style={{
              borderRadius: 15,
              width: '100%',
              position: 'absolute',
              top: 130,
              left: 0,
              paddingHorizontal: 14,
              zIndex: 10,
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
            }}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: couleurs.white,
                padding: 14,
                width: '100%',
                shadowColor: 'gray',
                height: 155,
              }}>
              <Text
                style={{
                  color: couleurs.dark,
                  paddingVertical: 3,
                  fontSize: 17,
                  fontFamily: CustomFont.Poppins,
                }}>
                {etablissement.nom}
              </Text>
              <Text
                style={{
                  color: couleurs.dark,
                  paddingVertical: 3,
                  fontSize: 14,
                  fontFamily: CustomFont.Poppins,
                }}>
                {etablissement.mail}
              </Text>
              <Text
                style={{
                  color: couleurs.dark,
                  paddingVertical: 3,
                  fontSize: 14,
                  fontFamily: CustomFont.Poppins,
                }}>
                {etablissement.mobile}
              </Text>

              <View style={{display: 'flex', flexDirection: 'row', marginTop:6, justifyContent:'flex-start', alignItems:'center'}}>
           
                <Progress.Bar progress={etablissement.note || 0} width={Dimensions.get('screen').width - 100} height={8}
                color={couleurs.success}
                style={{backgroundColor:couleurs.Light, borderColor:couleurs.Light}} />

                <Text style={{fontFamily:CustomFont.Poppins, color:couleurs.dark}}>{'  '}{etablissement.note || 0} Avis</Text>
              </View>
            </View>

            
          </View>

          <View
            style={{marginHorizontal: 12, marginBottom: 60, marginTop: 100}}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                gap: 10,
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color:couleurs.dark,
                  fontFamily: CustomFont.Poppins,
                }}>
                {t('Vendeur_depuis', preferredLangage)}
              </Text>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 13,
                  fontFamily: CustomFont.Poppins,
                }}>
                {proprietaire.date_creation}
              </Text>
            </View>

            {/* ADRESSE */}
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 13,
                  fontFamily: CustomFont.Poppins,
                }}>
                {t('Pays_et_region_de_l_etablissement', preferredLangage)}
              </Text>

              <Text
                style={{
                  color: couleurs.dark,
                  paddingVertical: 3,
                  fontSize: 13,
                  opacity: 0.8,
                }}>
                {proprietaire.pays}
              </Text>
              <Text
                style={{
                  color: couleurs.dark,
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 13,
                }}>
                {etablissement.adresse}
              </Text>
            </View>

            {/* HORAIRE OUVERTURE */}
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
                marginTop: 10,
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    paddingBottom: 12,
                    color: couleurs.primary,
                  }}>
                  {t('Heure_d_ouverture', preferredLangage)}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('mes_horaires')}>
                  <ArrowRightIcon color={couleurs.primary} />
                </TouchableOpacity>
              </View>

              {horaire_ouverture.map((row, key) => (
                <View
                  key={Math.random()}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    backgroundColor: '#fff',
                    padding: 8,
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                    borderBottomColor: '#ddd',
                    borderBottomWidth:
                      key + 1 != horaire_ouverture.length ? 1 : 0,
                    marginBottom: 2,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 3,
                      backgroundColor: '#fff',
                      borderRadius: 50,
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: couleurs.dark,
                        fontSize: 13,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      {row.jour}
                    </Text>
                    <Text
                      style={{
                        color: !(row.heure_ouverture && row.heure_fermeture) ? 'rgba(240,20,25,.8)' : couleurs.primary,
                        fontSize: 13,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      {(row.heure_ouverture && row.heure_fermeture ) && `${row.heure_ouverture}-${row.heure_fermeture}`}
                      {!(row.heure_ouverture && row.heure_fermeture) && t('Ferme', preferredLangage) }
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/*GALLERIE */}

            {/* <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
                marginTop: 10,
              }}>
             <View style={{display: 'flex', justifyContent:'space-between', flexDirection:'row'}}>
             <Text
                style={{
                  fontFamily: CustomFont.Poppins,
                  fontSize: 13,
                  paddingBottom: 12,
                  color: couleurs.dark,
                }}>
                Gallerie
              </Text>
              <TouchableOpacity onPress={() => null}>
                <ArrowRightIcon color={couleurs.primary}/>
              </TouchableOpacity>
             </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 10,
                }}>
                {[].map((row, key) => (
                  <ImageModal
                    key={key}
                    swipeToDismiss={true}
                    resizeMode="contain"
                    imageBackgroundColor={couleurs.primary}
                    overlayBackgroundColor={'rgba(200,200,200,.5)'}
                    source={require('../assets/images/cover.jpg')}
                    style={{width: 150, height: 100}}
                  />
                ))}
              </View>
            </View> */}

            {/* LIEN RESEAUX SOCIAUX */}

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                alignSelf: 'center',
                shadowColor: 'gray',
                marginTop: 10,
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    paddingBottom: 12,
                    color: couleurs.primary,
                  }}>
                  {t('lien_reseaux_sociaux', preferredLangage)}
                </Text>
                <TouchableOpacity onPress={() => null}>
                  <ArrowRightIcon color={couleurs.primary} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 10,
                }}>
                {lien_reseaux_sociaux.map(
                  (row: any, key: any) =>
                    row.nom == 'facebook' && (
                      <Image
                        key={key}
                        source={require('../assets/social/facebook.png')}
                        style={{width: 30, height: 30}}
                      />
                    ),
                )}

                {lien_reseaux_sociaux.map(
                  (row: any, key: any) =>
                    row.nom == 'twitter' && (
                      <Image
                        key={key}
                        source={require('../assets/social/twitter.png')}
                        style={{width: 30, height: 30}}
                      />
                    ),
                )}

                {lien_reseaux_sociaux.map(
                  (row: any, key: any) =>
                    row.nom == 'instagram' && (
                      <Image
                        key={key}
                        source={require('../assets/social/instagram.png')}
                        style={{width: 30, height: 30}}
                      />
                    ),
                )}

                {lien_reseaux_sociaux.map(
                  (row: any, key: any) =>
                    row.nom == 'linkedin' && (
                      <Image
                        key={key}
                        source={require('../assets/social/linkedin.png')}
                        style={{width: 30, height: 30}}
                      />
                    ),
                )}

                {lien_reseaux_sociaux.map(
                  (row: any, key: any) =>
                    row.nom == 'youtube' && (
                      <Image
                        key={key}
                        source={require('../assets/social/youtube.png')}
                        style={{width: 30, height: 30}}
                      />
                    ),
                )}

                {lien_reseaux_sociaux.map(
                  (row: any, key: any) =>
                    row.nom == 'tik-tok' && (
                      <Image
                        key={key}
                        source={require('../assets/social/tik-tok.png')}
                        style={{width: 30, height: 30}}
                      />
                    ),
                )}
              </View>
            </View>
          </View>

          {/* Welcome text */}
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: couleurs.white,
            position: 'absolute',
            bottom: -10,
            width: '100%',
            paddingVertical: 7,
            gap: 30,
            zIndex: 100,
          }}>
          <Pressable
            style={{
              paddingHorizontal: 30,
              width: 230,
              backgroundColor: couleurs.primary,
              borderRadius: 30,
            }}
            onPress={() => navigation.navigate('rdv')}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 5,
              }}>
              <RdvIcon color={'#fff'} />
              <Text
                style={{
                  textAlign: 'center',
                  padding: 10,
                  paddingHorizontal: 20,
                  fontSize: 13,
                  fontWeight: '500',
                  color: '#fff',
                }}>
                {t('Mes_Rendez_vous', preferredLangage)}
              </Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
