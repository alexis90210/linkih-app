import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  Modal,
} from 'react-native';
import EditIcon from '../components/Edit';
import RdvIcon from '../components/rdv';
import {AirbnbRating} from 'react-native-ratings';
import CloseIcon from '../components/close';
import AddIcon from '../components/add';
import MinusIcon from '../components/minus';
import {CustomFont, couleurs} from '../components/color';
import HomeIcon from '../components/home';
import storage from '../components/api/localstorage';
import MapIcon from '../components/map';
import {FacebookIcon} from '../components/network';

export default function MonEtablissement({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const propsTitle = route.params?.nomEtab;
  var title = 'Mon Etablissement';

  const [isVisibleModal, setVisibleModal] = useState(false);
  const [isVisibleModalAbonnement,setVisibleModalAbonnement ] = useState(true)
  const activeModal = () => setVisibleModal(true);
  const desactiveModal = () => setVisibleModal(false);
  const [etablissement, setEtablissement] = useState<any>({});
  const [proprietaire, setProprietaire] = useState<any>({});
  const [lien_reseaux_sociaux, setLien_reseaux_sociaux] = useState<any[]>([]);
  const [horaire_ouverture, setHoraire_ouverture] = useState<any[]>([]);
  const [rendez_vous, setRendez_vous] = useState<any[]>([]);

  storage
    .load({
      key: 'userconnected', // Note: Do not use underscore("_") in key!
      id: 'userconnected', // Note: Do not use underscore("_") in id!
    })
    .then(data => {
      setEtablissement(data.etablissement[0]);
      setProprietaire(data.utilisateur[0]);
      setLien_reseaux_sociaux(data.lien_reseaux_sociaux);
      setHoraire_ouverture(data.horaire_ouverture);
      setRendez_vous(data.rendez_vous);

      console.log(lien_reseaux_sociaux);
    })
    .catch(error => console.log(error));

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
          <View style={{paddingHorizontal: 12, marginTop: 15, width: '100%'}}>
            <Image
              source={require('../assets/images/cover.jpg')}
              style={{
                height: 200,
                width: '100%',
                borderRadius: 15,
                marginTop: 2,
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
              top: 145,
              left: 0,
              paddingHorizontal: 24,
              zIndex: 10,
            }}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: couleurs.primary,
                padding: 14,
                width: '100%',
                shadowColor: 'gray',
                height: 155,
              }}>
              <Text
                style={{
                  color: couleurs.white,
                  paddingVertical: 3,
                  fontSize: 17,
                  fontFamily: CustomFont.Poppins,
                }}>
                {etablissement.nom}
              </Text>
              <Text
                style={{
                  color: couleurs.white,
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                {etablissement.mail}
              </Text>
              <Text
                style={{
                  color: couleurs.white,
                  paddingVertical: 3,
                  fontSize: 16,
                  fontFamily: CustomFont.Poppins,
                }}>
                {etablissement.mobile}
              </Text>

              <View style={{display: 'flex', flexDirection: 'row'}}>
                <AirbnbRating
                  reviewSize={10}
                  reviewColor={couleurs.primary}
                  showRating={false}
                  count={10}
                  reviews={['Terrible', 'Bad', 'Good', 'Very Good']}
                  onFinishRating={rate => console.log(rate)}
                  defaultRating={5}
                  size={14}
                />
              </View>
            </View>
          </View>

          <View
            style={{marginHorizontal: 12, marginBottom: 60, marginTop: 120}}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                Client depuis
              </Text>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 15,
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
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 17,
                  fontFamily: CustomFont.Poppins,
                }}>
                Pays et region de l'etablissement
              </Text>

              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                {proprietaire.pays}
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                {etablissement.adresse}
              </Text>
            </View>

            {/* ABONNEMENT */}
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
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                Mon abonnement
              </Text>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      paddingVertical: 3,
                      fontSize: 15,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    expire le
                  </Text>
                  <Text
                    style={{
                      color: couleurs.primary,
                      paddingVertical: 3,
                      fontSize: 15,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    xx-xx-xxxx
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                20 € TTC / mois
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
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily: CustomFont.Poppins,
                }}>
                Heure d'ouverture
              </Text>

              {horaire_ouverture.map((row, key) => (
                <View
                  key={Math.random()}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    backgroundColor: '#fff',
                    padding: 5,
                    borderRadius: 20,
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
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
                      style={{color: '#000', fontFamily: CustomFont.Poppins}}>
                      {row.jour}
                    </Text>
                    <Text
                      style={{
                        color: couleurs.primary,
                        fontSize: 11,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      {row.heure_ouverture}-{row.heure_fermeture}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

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
              <Text
                style={{
                  fontFamily: CustomFont.Poppins,
                  fontSize: 15,
                  paddingBottom: 12,
                  color: '#000',
                }}>
                Lien reseaux sociaux
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 10,
                }}>
                <Image
                  source={require('../assets/social/facebook.png')}
                  style={{width: 30, height: 30}}
                />

                <Image
                  source={require('../assets/social/twitter.png')}
                  style={{width: 30, height: 30}}
                />

                <Image
                  source={require('../assets/social/instagram.png')}
                  style={{width: 30, height: 30}}
                />

                <Image
                  source={require('../assets/social/linkedin.png')}
                  style={{width: 30, height: 30}}
                />

                <Image
                  source={require('../assets/social/youtube.png')}
                  style={{width: 30, height: 30}}
                />
              </View>
            </View>

            {/*GALLERIE */}

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
                  fontFamily: CustomFont.Poppins,
                  fontSize: 15,
                  paddingBottom: 12,
                  color: '#000',
                }}>
                Gallerie
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 10,
                }}>
                {[1, 2, , 5, 3].map((row, key) => (
                  <Image
                    key={key}
                    source={require('../assets/images/cover.jpg')}
                    style={{width: 150, height: 100}}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Welcome text */}
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 30,
          }}>
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: couleurs.primary,
              borderRadius: 30,
            }}
            onPress={() => Linking.openURL('tel:2522334444')}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 5,
              }}>
              <EditIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 30,
              width: 230,
              backgroundColor: couleurs.primary,
              borderRadius: 30,
            }}
            onPress={() => navigation.navigate('rdv', {rdvs: rendez_vous})}>
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
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#fff',
                }}>
                Mes Rendez-vous
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* MODAL ABONNEMENT */}
      <Modal visible={isVisibleModalAbonnement}>
        <View style={{flex: 1, backgroundColor: couleurs.dark, padding: 20}}>
          <View
            style={{
              display: 'flex',
              marginBottom: 50,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}>
            
            <TouchableOpacity onPress={ () => setVisibleModalAbonnement(false)}>
            <CloseIcon color={couleurs.white} />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontFamily: CustomFont.Poppins,
              fontSize: 17,
              width: '70%',
              color: couleurs.white,
            }}>
            Achetez votre abonnement maintenant
          </Text>

          <View
            style={{
              borderWidth: 2,
              marginTop: 30,
              borderColor: couleurs.primary,
              borderRadius: 20,
            }}>
            <View
              style={{
                backgroundColor: couleurs.primary,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingVertical: 10,
              }}>
              <Text style={{color: couleurs.dark, alignSelf: 'center'}}>
                Abonnement starter
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 30,
              }}>
              <Text
                style={{
                  color: couleurs.white,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Mensuel
              </Text>
              <View>
                <Text
                  style={{
                    color: couleurs.white,
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  $10.99/mo
                </Text>
                <Text
                  style={{
                    color: couleurs.white,
                    fontSize: 15,
                    fontWeight: '400',
                    textDecorationLine: 'line-through',
                    textDecorationColor: couleurs.primary,
                    textDecorationStyle:'solid',
                    alignSelf:'flex-end'
                  }}>
                  $39.99/mo
                </Text>
              </View>
            </View>

            <View
              style={{
                marginBottom:20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: couleurs.primary,
                borderRadius: 30,
                marginHorizontal:40
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  width: '80%',
                }}
                onPress={() => null}>
                <Text
                  style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontWeight: '500',
                    color: couleurs.dark,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                  }}>                   
                    Commencez !
                  
                </Text>
              </TouchableOpacity>              
            </View>
            
          </View>

          <View
            style={{
              borderWidth: 2,
              marginTop: 30,
              borderColor: couleurs.primaryLight,
              borderRadius: 20,
            }}>
            <View
              style={{
                backgroundColor: couleurs.primaryLight,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingVertical: 10,
              }}>
              <Text style={{color: couleurs.dark, alignSelf: 'center'}}>
                Abonnement Flex
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 30,
              }}>
              <Text
                style={{
                  color: couleurs.primaryLight,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Mensuel
              </Text>
              <View>
                <Text
                  style={{
                    color: couleurs.primaryLight,
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  $10.99/mo
                </Text>
                <Text
                  style={{
                    color: couleurs.primaryLight,
                    fontSize: 15,
                    fontWeight: '400',
                    textDecorationLine: 'line-through',
                    textDecorationColor: couleurs.primaryLight,
                    textDecorationStyle:'solid',
                    alignSelf:'flex-end'
                  }}>
                  $39.99/mo
                </Text>
              </View>
            </View>

            <View
              style={{
                marginBottom:20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: couleurs.primaryLight,
                borderRadius: 30,
                marginHorizontal:40
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  width: '80%',
                }}
                onPress={() => null}>
                <Text
                  style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontWeight: '500',
                    color: couleurs.dark,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                  }}>                   
                    Commencez !
                  
                </Text>
              </TouchableOpacity>              
            </View>
            
          </View>

        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({});
