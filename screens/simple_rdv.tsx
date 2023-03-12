import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import {CustomFont, couleurs} from '../components/color';
import CalendarStrip from 'react-native-calendar-strip';
import axios from 'axios';
import ApiService from '../components/api/service';
import storage from '../components/api/localstorage';

export default function SimpleRdv({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  // GET USER CONNECTED
  const [userConnected, SetUserConnected] = useState<any>({});

  storage
    .load({
      key: 'userconnected', // Note: Do not use underscore("_") in key!
      id: 'userconnected', // Note: Do not use underscore("_") in id!
    })
    .then(data => {
      SetUserConnected(data.utilisateur[0]);
    })
    .catch(error => console.log(error));

  // horaire
  var hours_matin = [
    {
      hour: '07:00',
    },
    {
      hour: '07:15',
    },
    {
      hour: '07:30',
    },
    {
      hour: '07:45',
    },
    {
      hour: '08:00',
    },
    {
      hour: '08:15',
    },
    {
      hour: '08:30',
    },
    {
      hour: '08:45',
    },
    {
      hour: '09:00',
    },
    {
      hour: '09:15',
    },
    {
      hour: '09:30',
    },
    {
      hour: '09:45',
    },
    {
      hour: '10:00',
    },
    {
      hour: '10:15',
    },
    {
      hour: '10:30',
    },
    {
      hour: '10:45',
    },
    {
      hour: '11:00',
    },
    {
      hour: '11:15',
    },
    {
      hour: '11:30',
    },
    {
      hour: '11:45',
    },
  ];

  var hours_apresmidi = [
    {
      hour: '12:00',
    },
    {
      hour: '12:15',
    },
    {
      hour: '12:30',
    },
    {
      hour: '12:45',
    },
    {
      hour: '13:00',
    },
    {
      hour: '13:15',
    },
    {
      hour: '13:30',
    },
    {
      hour: '13:45',
    },
    {
      hour: '15:00',
    },
    {
      hour: '15:15',
    },
    {
      hour: '15:30',
    },
    {
      hour: '15:45',
    },
    {
      hour: '16:00',
    },
    {
      hour: '16:15',
    },
    {
      hour: '16:30',
    },
    {
      hour: '16:45',
    },
    {
      hour: '17:00',
    },
    {
      hour: '17:15',
    },
    {
      hour: '17:30',
    },
    {
      hour: '17:45',
    },
  ];

  // selected date
  const [selectedDate, setDate] = useState('');

  // handler
  const _setDate = (date: any) => {
    setDate(date);
  };

  // stepper
  const [stepper, SetStepper] = useState(0);

  // reservation data
  const [Heure, SetHeure] = useState('');
  const [Prestation, SetPrestation] = useState('');

  // LOAD CATEGORIES
  const [sous_categories, setCategories] = useState([]);
  const [isLoadedCategorie, setLoadedCategorie] = useState(false);

  const loadCategories = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_VENDEURS_SOUS_PRESTATIONS,
      data: JSON.stringify({
        vendeur_id: route.params.id,
      }),
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
        if (api.code == 'error') {
          Alert.alert('', 'Erreur survenue');
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert('', 'Erreur Network');
      });
  };

  if (!isLoadedCategorie) loadCategories();

  // SAVE RDV
  const [loadingActivity, SetActivityActive] = useState(false);
  const saveRdv = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_SAVE_RDV,
      data: JSON.stringify({
        vendeur_id: route.params.id,
        heure: Heure,
        prestation: Prestation,
        date: selectedDate,
        utilisateur_id: userConnected.id,
        prix: '',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        SetActivityActive(false);
        if (api.code == 'success') {
          Alert.alert(
            '',
            "Votre rendez-vous a ete enregistre avec succes et en attente de confirmation par l'etablissement",
            [
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate('main', {
                    utilisateur_id: userConnected.id,
                    isProprietaire: false,
                  }),
              },
            ],
          );
        }
        if (api.code == 'error') {
          Alert.alert('', api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        SetActivityActive(false);
        Alert.alert('', 'Erreur Network');
      });
  };

  return (
    <View>
      {
        <SafeAreaView
          style={{
            width: '100%',
            height: '100%',
          }}>
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
              {stepper == 0 ? 'choisir un creaneau' : 'Objet du rendez-vous'}
            </Text>
          </View>

          {stepper == 0 && (
            <CalendarStrip
              scrollable
              style={{height: 100, paddingTop: 20, paddingBottom: 10}}
              calendarColor={couleurs.primary}
              calendarHeaderStyle={{color: couleurs.white}}
              dateNumberStyle={{color: couleurs.white}}
              dateNameStyle={{color: couleurs.white}}
              iconContainer={{flex: 0.1}}
              onDateSelected={date => _setDate(date)}
            />
          )}

          {/* main */}
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{
              backgroundColor: '#f6f6f6f6',
            }}>
            {stepper == 0 && (
              <View>
                {selectedDate != '' && (
                  <View style={{marginVertical: 10, paddingHorizontal: 10}}>
                    <Text
                      style={{
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: '#ddd',
                        backgroundColor: couleurs.white,
                        padding: 10,
                        marginVertical: 0,
                        textAlign: 'center',
                      }}>
                      MATIN
                    </Text>

                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 20,
                        gap: 10,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      {hours_matin.map((h, i) => (
                        <TouchableOpacity
                          onPress={() => {
                            SetHeure(h.hour);
                            SetStepper(1);
                          }}>
                          <Text
                            key={i}
                            style={{
                              borderWidth: 1,
                              borderColor: '#ddd',
                              borderRadius: 30,
                              padding: 10,
                              paddingHorizontal: 20,
                            }}>
                            {h.hour}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <Text
                      style={{
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: '#ddd',
                        backgroundColor: couleurs.white,
                        padding: 10,
                        marginVertical: 20,
                        textAlign: 'center',
                      }}>
                      MIDI + APRES MIDI
                    </Text>

                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 20,
                        gap: 10,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      {hours_apresmidi.map((h, i) => (
                        <TouchableOpacity
                          onPress={() => {
                            SetHeure(h.hour);
                            SetStepper(1);
                          }}>
                          <Text
                            key={i}
                            style={{
                              borderWidth: 1,
                              borderColor: '#ddd',
                              borderRadius: 30,
                              padding: 10,
                              paddingHorizontal: 20,
                            }}>
                            {h.hour}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {selectedDate == '' && (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      height: 300,
                      width: '100%',
                      marginTop: 200,
                    }}>
                    <Text style={{fontSize: 15, textAlign: 'center'}}>
                      {'Veuillez selectionner une date \npour continuer'}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {stepper == 1 && (
              <View>
                <View
                  style={{
                    marginVertical: 10,
                    backgroundColor: '#fff',
                    borderRadius: 11,
                    padding: 20,
                    width: '90%',
                    marginTop: 20,
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      defaultValue={Prestation}
                      onChangeText={input => SetPrestation(input)}
                      numberOfLines={10}
                      placeholder="Ecrire ici"
                      multiline={true}
                      underlineColorAndroid="transparent"
                      style={{
                        backgroundColor: 'transparent',

                        borderBottomWidth: 1,
                        borderBottomColor: couleurs.primary,
                        color: couleurs.primary,
                        width: '100%',
                        height: 200,
                        justifyContent: 'flex-start',
                        textAlignVertical: 'top',
                        fontFamily: CustomFont.Poppins,
                        fontSize: 15,
                      }}></TextInput>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: couleurs.primary,
                      borderRadius: 30,
                      paddingHorizontal: 30,
                      width: 220,
                      height: 40,
                      marginTop: 30,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 10,
                        position: 'relative',
                        bottom: -3,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                      }}
                      onPress={() => saveRdv()}>
                      <Text
                        style={{
                          textAlign: 'center',
                          padding: 5,
                          fontSize: 15,
                          color: couleurs.white,
                          fontFamily: CustomFont.Poppins,
                        }}>
                        Valider
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {loadingActivity && (
                    <View style={{alignSelf: 'center', marginTop: 30}}>
                      <ActivityIndicator size={'large'}></ActivityIndicator>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Welcome text */}
          </ScrollView>
        </SafeAreaView>
      }
    </View>
  );
}

const styles = StyleSheet.create({});
