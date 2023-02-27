import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  Modal,
} from 'react-native';
import EditIcon from '../components/Edit';
import RdvIcon from '../components/rdv';
import { AirbnbRating} from 'react-native-ratings';
import CloseIcon from '../components/close';
import AddIcon from '../components/add';
import MinusIcon from '../components/minus';
import { CustomFont, couleurs } from '../components/color';
import HomeIcon from '../components/home';
import storage from '../components/api/localstorage';
import MapIcon from '../components/map';
import { FacebookIcon } from '../components/network';

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

  const activeModal = () => setVisibleModal(true);
  const desactiveModal = () => setVisibleModal(false);
  const [etablissement, setEtablissement] = useState<any>({});
  const [proprietaire, setProprietaire] = useState<any>({});
  const [lien_reseaux_sociaux, setLien_reseaux_sociaux] = useState<any[]>([]);
  const [horaire_ouverture, setHoraire_ouverture] = useState<any[]>([]);
  const [rendez_vous, setRendez_vous] = useState<any[]>([]);
  
  storage.load({
    key: 'userconnected', // Note: Do not use underscore("_") in key!
    id: 'userconnected', // Note: Do not use underscore("_") in id!
  }).then( data => {

    setEtablissement(data.etablissement[0])
    setProprietaire( data.utilisateur[0] )
    setLien_reseaux_sociaux(data.lien_reseaux_sociaux)
    setHoraire_ouverture(data.horaire_ouverture)
    setRendez_vous( data.rendez_vous)

    console.log(lien_reseaux_sociaux);   
  })
  .catch(error => console.log(error)
  );

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
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}>
          <Pressable onPress={() => navigation.navigate('main')}>
            <HomeIcon color={couleurs.primary} />
          </Pressable>
          <Text style={{color: couleurs.primary, fontSize: 18,fontFamily:CustomFont.Poppins}}>
            {title}
          </Text>
          <MapIcon color={couleurs.primary}/>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          {/* Banner Image */}
          <View style={{paddingHorizontal: 12, width: '100%'}}>
            <Image
              source={require('../assets/images/banner.jpeg')}
              style={{
                height: 200,
                width: '100%',
                borderRadius: 15,
                marginTop: 2,
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
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
                shadowColor: 'gray',
                height: 155,
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 17,fontFamily:CustomFont.Poppins
                }}>
                {etablissement.nom}
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  opacity: 0.7,
                  fontSize: 15,fontFamily:CustomFont.Poppins
                }}>
                {etablissement.mail}
              </Text>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,fontFamily:CustomFont.Poppins
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
                  fontFamily:CustomFont.Poppins
                }}>
                Client depuis
              </Text>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily:CustomFont.Poppins
                }}>
                {proprietaire.date_creation}
              </Text>
            </View>

            <Text
              style={{
                color: "#000",
                paddingVertical: 3,
                fontSize: 15,
                fontFamily:CustomFont.Poppins,
                marginVertical: 15,
              }}>
              Pays et region de l'etablissement
            </Text>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 15,
                  fontFamily:CustomFont.Poppins,
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
                  fontFamily:CustomFont.Poppins
                }}>
                {etablissement.adresse}
              </Text>
            </View>

            <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      color: '#000',
                      paddingVertical: 3,
                      fontSize: 15,
                      fontFamily:CustomFont.Poppins,
                      marginVertical: 15,
                    }}>
                    Mon abonnement
                  </Text>
                </View>
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
                      fontFamily:CustomFont.Poppins
                    }}>
                    expire le
                  </Text>
                  <Text
                    style={{
                      color: couleurs.primary,
                      paddingVertical: 3,
                      fontSize: 15,
                      fontFamily:CustomFont.Poppins
                    }}>
                    xx-xx-xxxx
                  </Text>
                </View>
              </View>
          
              <View
                style={{
                  borderRadius: 15,
                  backgroundColor: '#fff',
                  padding: 14,
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontFamily:CustomFont.Poppins
                  }}>
                  Pack Proprietaire
                </Text>
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
                      fontFamily:CustomFont.Poppins
                    }}>
                    xx
                  </Text>
                  <Text
                    style={{
                      color: couleurs.primary,
                      paddingVertical: 3,
                      fontSize: 14,
                      fontFamily:CustomFont.Poppins
                    }}>
                    € TTC / mois
                  </Text>
                </View>
              </View>
           
             

            <Text
              style={{
                color: '#000',
                paddingVertical: 3,
                fontSize: 15,
                fontFamily:CustomFont.Poppins,
                marginVertical: 15,
              }}>
              Heure d'ouverture
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
                paddingHorizontal: 5,
                marginBottom: 40,
              }}>
              {horaire_ouverture.map((row, key) => (
                <View
                  key={Math.random()}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    backgroundColor: '#fff',
                    padding: 5,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                      backgroundColor: '#fff',
                      padding: 6,
                      borderRadius: 50,
                    }}>
                    <Text style={{color: '#000',fontFamily:CustomFont.Poppins}}>{row.jour}</Text>
                    <Text style={{color: couleurs.primary, fontSize: 11,fontFamily:CustomFont.Poppins}}>
                      {row.heure_ouverture}-{row.heure_fermeture}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={{paddingVertical: 10}}>
              <Text
                style={{
                  fontFamily:CustomFont.Poppins,
                  fontSize: 15,
                  paddingBottom: 12,
                  color: '#000',
                  paddingLeft: 20,
                }}>
                Lien reseaux sociaux
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
                paddingHorizontal: 5,
                marginBottom: 40,
              }}>
              {lien_reseaux_sociaux.map((row, key) => (
                <View
                  key={Math.random()}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    backgroundColor: '#fff',
                    padding: 5,
                    paddingHorizontal: 15,
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
                      padding: 5,
                      width: '100%',
                      alignItems:'center'
                    }}>
                    {row.nom == "facebook" && <Image source={require(`../assets/social/facebook.png`)} />}
                    {row.nom == "twitter" && <Image source={require(`../assets/social/twitter.png`)} />}
                    {row.nom == "instagram" && <Image source={require(`../assets/social/instagram.png`)} />}
                    {row.nom == "linkedin" && <Image source={require(`../assets/social/linkedin.png`)} />}
                    {row.nom == "youtube" && <Image source={require(`../assets/social/youtube.png`)} />}
                    <Text style={{flex:1, color: couleurs.dark, fontSize: 13, fontFamily:CustomFont.Poppins}}>
                      {row.username ? row.username : "Vous n'ave pas encore rensiegne votre username"}
                    </Text>
                  </View>
                </View>
              ))}
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
          <Pressable
            android_ripple={{color: '7B4C7A'}}
            style={{
              padding: 8,
              backgroundColor: '#7B4C7A',
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
          </Pressable>
          <Pressable
            android_ripple={{color: '7B4C7A'}}
            style={{
              paddingHorizontal: 30,
              width: 230,
              backgroundColor: '#7B4C7A',
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
          </Pressable>
        </View>

        
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
