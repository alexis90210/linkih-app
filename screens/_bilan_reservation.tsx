import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import {CustomFont, couleurs} from '../components/color';
import axios from 'axios';
import ApiService from '../components/api/service';
import storage from '../components/api/localstorage';

export default function BilanReservation({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  var data = route.params;
  console.log(data);

  const [proprietaire, setProprietaire] = useState<any>({});
  const [isLoadedProprietaire, setisLoadedProprietaire] = useState(false);

  if (!isLoadedProprietaire) {
    storage
      .load({
        key: 'userconnected', // Note: Do not use underscore("_") in key!
        id: 'userconnected', // Note: Do not use underscore("_") in id!
      })
      .then(data => {
        console.log('//////////////////', data);

        if (data.utilisateur) setProprietaire(data.utilisateur[0]);
        else
          setProprietaire({
            id: data.message.id,
            nom: data.message.nom,
            prenom: data.message.prenom,
            client: true,
            vendeur_id: '',
            data: data.message,
          });

        setisLoadedProprietaire(true);
      })
      .catch(error => console.log(error));
  }

  const [isProccessing, setIsProccessing] = useState(false);

  const saveCommande = () => {
      setIsProccessing(true);
      axios({
        method: 'POST',
        url: ApiService.API_URL_SAVE_RDV,
        data: JSON.stringify({
          vendeur_id: data.props.vendeur_id,
          heure: data.creneau.heure,
          prestation: data.props.produit,
          date: new Date(data.creneau.date).toLocaleDateString(),
          utilisateur_id: proprietaire.id,
          prix: data.props.prix,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response: {data: any}) => {
        var api = response.data;
        setIsProccessing(false);
        if (api.code == 'success') {

          var devise = data.props.devise ? data.props.devise : "$";

          var paiement = `${ApiService.API_BASE_URL}stripe/paiement/${data.props.prix}/${devise}/${data.props.vendeur_id}`;
          
          Alert.alert('', 'Votre commande a ete enregistre avec succes', [
            {
              text: 'Je procede au paiement',
              onPress: () =>
                navigation.navigate('paiement_screen', {
                  route: paiement
                })
            },
          ]);
        }
        if (api.code == 'error') {
          Alert.alert('', api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setIsProccessing(false);
        Alert.alert('', 'Erreur Network');
      });
  };

  return (
    <View>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
        }}>
        {/* LOADING MODAL */}

        <Modal transparent={true} visible={isProccessing}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'column',
              backgroundColor: 'rgba(200,200,200,.5)',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <ActivityIndicator
              color={couleurs.primary}
              style={{alignSelf: 'center'}}
              size={'large'}></ActivityIndicator>
          </View>
        </Modal>

        {/* END LOADING */}

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
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.white} />
          </Pressable>
          <Text
            style={{
              color: couleurs.white,
              fontSize: 16,
              fontFamily: CustomFont.Poppins,
            }}>
            Recapitulatif de la reservation
          </Text>
        </View>

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View
            style={{
              marginHorizontal: 12,
              marginVertical: 10,
              borderRadius: 20,
              backgroundColor: '#fff',
              padding: 20,
            }}>
            <View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ddd',
                  paddingVertical: 20,
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 15,
                    color: couleurs.primary,
                  }}
                  numberOfLines={1}>
                  Detail de prestation
                </Text>

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
                      color: couleurs.dark,
                    }}>
                    Prestation
                  </Text>

                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 13,
                      color: couleurs.primary,
                    }}>
                    {data.props.produit}
                  </Text>
                </View>

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
                      color: couleurs.dark,
                    }}>
                    Duree de la prestation
                  </Text>

                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 13,
                      color: couleurs.primary,
                    }}>
                    {data.props.duree}
                  </Text>
                </View>

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
                      color: couleurs.dark,
                    }}>
                    Montant de la prestation
                  </Text>

                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 13,
                      color: couleurs.dark,
                      opacity: 0.6,
                    }}>
                    {data.props.prix},00 {data.props.devise}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  paddingVertical: 20,
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 15,
                    color: couleurs.primary,
                  }}
                  numberOfLines={1}>
                  creneau de la prestation
                </Text>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    color: couleurs.dark,
                    opacity: 0.6,
                  }}
                  numberOfLines={1}>
                  {new Date(data.creneau.date).toLocaleDateString()} a{' '}
                  {data.creneau.heure}
                </Text>
              </View>

              <View style={{padding: 10}}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 15,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    backgroundColor: couleurs.primary,
                    borderRadius: 30,
                  }}
                  onPress={() => saveCommande()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 14,
                      color: couleurs.secondary,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Je valide ma commande - {data.props.prix},00 {data.props.devise}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
            style={{
              alignItems: 'center',
              backgroundColor: 'transparent',
              borderRadius: 30,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
              marginTop: 60,
            }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
              }}
              onPress={() => navigation.navigate('resultat_recherche', {
                title: 'Les etablissements',
              })}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '500',
                  color: couleurs.primary,
                  fontFamily: CustomFont.Poppins,
                }}>
                Revenir a la recherche
              </Text>
            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});