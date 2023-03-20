import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {CustomFont, couleurs} from '../components/color';

export default function Reabonnement({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [abonnements, setAbonnements] = useState<any>([
    {
      id: '1',
      nom: 'Abonnement starter',
      code: 'Mensuel',
      montant: '100',
      devise: '$',
      description: '',
    },
    {
      id: '2',
      nom: 'Abonnement pro',
      code: 'Annuel',
      montant: '2500',
      devise: '$',
      description: '',
    },
  ]);

  const [mon_abonnement, setMonAbonnement] = useState({
    id: '3',
    nom: 'Abonnement pro',
    activation: '12/03/2023',
    expiration: '20/03/2023',
    montant: '2400',
    devise: '$',
  });

  const sabonnerMaintenant = () => {
    navigation.navigate('paiement_screen', {
      route: 'google.com',
    })
  }

  return (
    <View>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f6f6f6',
        }}>
        <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 20}}>
          <ScrollView>
            <View
              style={{
                borderRadius: 20,
                backgroundColor: '#fff',
                padding: 20,
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 15,
                    color: couleurs.primary,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#ddd',
                  }}
                  numberOfLines={1}>
                  Detail de prestation
                </Text>

                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 14,
                      color: couleurs.dark,
                    }}>
                    Abonnement
                  </Text>

                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 14,
                      color: couleurs.primary,
                    }}>
                    {mon_abonnement.nom}
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
                      fontSize: 14,
                      color: couleurs.dark,
                    }}>
                    Debut d'activation
                  </Text>

                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 14,
                      color: couleurs.dark,
                      opacity: 0.6,
                    }}>
                    {mon_abonnement.activation}
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
                      fontSize: 14,
                      color: couleurs.dark,
                    }}>
                    Date d'expiration
                  </Text>

                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 14,
                      color: couleurs.dark,
                      opacity: 0.6,
                    }}>
                    {mon_abonnement.expiration}
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={{
                fontFamily: CustomFont.Poppins,
                fontSize: 15,
                color: couleurs.primary,
                marginVertical: 20,
                paddingHorizontal: 15,
              }}>
              Tous les abonnements
            </Text>

            {abonnements.map((row: any, key: any) => (
              <View
                key={key}
                style={{
                  borderWidth: 1,
                  borderColor: couleurs.primary,
                  borderRadius: 10,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    backgroundColor: couleurs.primary,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingVertical: 10,
                  }}>
                  <Text style={{color: couleurs.white, alignSelf: 'center'}}>
                    {row.nom}
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: couleurs.primary,
                      fontSize: 15,
                    }}>
                    {row.code}
                  </Text>
                  <View>
                    <Text
                      style={{
                        color: couleurs.primary,
                        fontSize: 16,
                      }}>
                      {row.devise} {row.montant}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginBottom: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: couleurs.primary,
                    borderRadius: 30,
                    marginHorizontal: 40,
                  }}>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      width: '80%',
                    }}
                    onPress={() =>
                     sabonnerMaintenant()
                    }>
                    <Text
                      style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: couleurs.white,
                        padding: 10,
                        paddingHorizontal: 20,
                        fontSize: 14,
                      }}>
                      S'abonner maintenant
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
