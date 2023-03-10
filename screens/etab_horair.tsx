import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Slider,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import {CustomFont, couleurs} from '../components/color';
import ApiService from '../components/api/service';
import axios from 'axios';
import storage from '../components/api/localstorage';
import {Picker} from '@react-native-picker/picker';

export default function MesHoraires({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  // LOADER
  const [isLoading, setLoading] = useState(false);
  const [isLoadingHoraire, setLoadingHoraire] = useState(false);

  // GET USER CONNECTED
  const [userConnected, SetUserConnected] = useState<any>({});

  // GET HORAIRES
  const [Horaires, SetHoraires] = useState<any>({});

  storage
    .load({
      key: 'userconnected', // Note: Do not use underscore("_") in key!
      id: 'userconnected', // Note: Do not use underscore("_") in id!
    })
    .then(data => {

      SetHoraires( data.horaire_ouverture );
      
      SetUserConnected(data.etablissement[0]);

      if (!isLoadingHoraire) {
        data.horaire_ouverture.map( (row:any, index:any) => {
          if ( row.jour == 'Lundi') {
            setSelectedHoraireOuvertureLundi( row.heure_ouverture)
            setSelectedHoraireFermetureLundi( row.heure_fermeture)
          }
          if ( row.jour == 'Mardi') {
            setSelectedHoraireOuvertureMardi( row.heure_ouverture)
            setSelectedHoraireFermetureMardi( row.heure_fermeture)
          }
  
          if ( row.jour == 'Mercredi') {
            setSelectedHoraireOuvertureMercredi( row.heure_ouverture)
            setSelectedHoraireFermetureMercredi( row.heure_fermeture)
          }
  
          if ( row.jour == 'Jeudi') {
            setSelectedHoraireOuvertureJeudi( row.heure_ouverture)
            setSelectedHoraireFermetureJeudi( row.heure_fermeture)
          }
  
          if ( row.jour == 'Vendredi') {
            setSelectedHoraireOuvertureVendredi( row.heure_ouverture)
            setSelectedHoraireFermetureVendredi( row.heure_fermeture)
          }
  
          if ( row.jour == 'Samedi') {
            setSelectedHoraireOuvertureSamedi( row.heure_ouverture)
            setSelectedHoraireFermetureSamedi( row.heure_fermeture)
          }
        })

        setLoadingHoraire(true)

      }
            
    })
    .catch(error => console.log(error));

  //   GET GALLERIE
  const [gallerie, setGallerie] = useState([]);
  const [isLoadedGallerie, setLoadedGallerie] = useState(false);

  const loadGallerie = () => {
    axios({
      method: 'POST',
      url: ApiService.API_URL_GET_GALLERIE,
      data: JSON.stringify({
        vendeur_id: userConnected.id,
        // date: date
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;

        if (api.code == 'success') {
          setLoading(false);
          setLoadedGallerie(true);
          setGallerie(api.message);
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

  //  if ( !isLoadedGallerie ) loadGallerie()

  // Horaire debut
  const [selectedHoraireOuvertureLundi, setSelectedHoraireOuvertureLundi] =
    useState<any>(null);
  const [selectedHoraireOuvertureMardi, setSelectedHoraireOuvertureMardi] =
    useState<any>(null);
  const [
    selectedHoraireOuvertureMercredi,
    setSelectedHoraireOuvertureMercredi,
  ] = useState<any>(null);
  const [selectedHoraireOuvertureJeudi, setSelectedHoraireOuvertureJeudi] =
    useState<any>(null);
  const [
    selectedHoraireOuvertureVendredi,
    setSelectedHoraireOuvertureVendredi,
  ] = useState<any>(null);
  const [selectedHoraireOuvertureSamedi, setSelectedHoraireOuvertureSamedi] =
    useState<any>(null);

  // Horaire fin
  const [selectedHoraireFermetureLundi, setSelectedHoraireFermetureLundi] =
    useState<any>(null);
  const [selectedHoraireFermetureMardi, setSelectedHoraireFermetureMardi] =
    useState<any>(null);
  const [
    selectedHoraireFermetureMercredi,
    setSelectedHoraireFermetureMercredi,
  ] = useState<any>(null);
  const [selectedHoraireFermetureJeudi, setSelectedHoraireFermetureJeudi] =
    useState<any>(null);
  const [
    selectedHoraireFermetureVendredi,
    setSelectedHoraireFermetureVendredi,
  ] = useState<any>(null);
  const [selectedHoraireFermetureSamedi, setSelectedHoraireFermetureSamedi] =
    useState<any>(null);

  // HANDLE TIME

  const handleTimeLundiOuverture = (time: any) => {
    setSelectedHoraireOuvertureLundi(time);
  };

  const handleTimeMardiOuverture = (time: any) => {
    setSelectedHoraireOuvertureMardi(time);
  };

  const handleTimeMercrediOuverture = (time: any) => {
    setSelectedHoraireOuvertureMercredi(time);
  };

  const handleTimeJeudiOuverture = (time: any) => {
    setSelectedHoraireOuvertureJeudi(time);
  };

  const handleTimeVendrediOuverture = (time: any) => {
    setSelectedHoraireOuvertureVendredi(time);
  };

  const handleTimeSamediOuverture = (time: any) => {
    setSelectedHoraireOuvertureSamedi(time);
  };

  // FERMETURE

  const handleTimeLundiFermeture = (time: any) => {
    setSelectedHoraireFermetureLundi(time);
  };

  const handleTimeMardiFermeture = (time: any) => {
    setSelectedHoraireFermetureMardi(time);
  };

  const handleTimeMercrediFermeture = (time: any) => {
    setSelectedHoraireFermetureMercredi(time);
  };

  const handleTimeJeudiFermeture = (time: any) => {
    setSelectedHoraireFermetureJeudi(time);
  };

  const handleTimeVendrediFermeture = (time: any) => {
    setSelectedHoraireFermetureVendredi(time);
  };

  const handleTimeSamediFermeture = (time: any) => {
    setSelectedHoraireFermetureSamedi(time);
  };

  // VISIBLE
  const [visibleLundi, setVisibleLundi] = useState(false);

  const onDismissLundi = () => {
    setVisibleLundi(false);
  };

  // SAVE HORAIRE
   
  const saveHoraire = () => {

  }
  
  

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
            Mes Horaires
          </Text>
        </View>

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View style={{paddingHorizontal: 12, marginVertical: 10}}>
          <View
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 5,
                            flexDirection: 'column',
                          }}>
                          {/* LUNDI */}
                          <View style={{
                            borderBottomColor: couleurs.primary,
                            borderBottomWidth:1,
                            borderStyle:'solid',
                            padding:20

                          }}>
                            <Text
                              style={{
                                fontFamily: CustomFont.Poppins,
                                fontSize: 15,
                                color: couleurs.dark,
                                alignSelf:'center'
                              }}>
                              Lundi
                            </Text>
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 10,
                                flexDirection: 'row',
                              }}>
                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={selectedHoraireOuvertureLundi}
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireOuvertureLundi(itemValue)
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>

                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={selectedHoraireFermetureLundi}
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireFermetureLundi(itemValue)
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>
                            </View>
                          </View>

                          {/* MARDI */}

                          <View style={{borderBottomColor: couleurs.primary,
                            borderBottomWidth:1,
                            borderStyle:'solid',
                            padding:20}}>
                            <Text
                              style={{
                                fontFamily: CustomFont.Poppins,
                                fontSize: 15,
                                color: couleurs.dark,
                                alignSelf:'center'
                              }}>
                              Mardi
                            </Text>
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 10,
                                flexDirection: 'row',
                              }}>
                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={selectedHoraireOuvertureMardi}
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireOuvertureMardi(itemValue)
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>

                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={selectedHoraireFermetureMardi}
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireFermetureMardi(itemValue)
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>
                            </View>
                          </View>

                          {/* MERCREDI */}
                          <View style={{borderBottomColor: couleurs.primary,
                            borderBottomWidth:1,
                            borderStyle:'solid',
                            padding:20}}>
                            <Text
                              style={{
                                fontFamily: CustomFont.Poppins,
                                fontSize: 15,
                                color: couleurs.dark,
                                alignSelf:'center'
                              }}>
                              Mercredi
                            </Text>
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 10,
                                flexDirection: 'row',
                              }}>
                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={
                                    selectedHoraireOuvertureMercredi
                                  }
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireOuvertureMercredi(
                                      itemValue,
                                    )
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>

                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={
                                    selectedHoraireFermetureMercredi
                                  }
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireFermetureMercredi(
                                      itemValue,
                                    )
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>
                            </View>
                          </View>

                          {/* JEUDDI */}
                          <View style={{borderBottomColor: couleurs.primary,
                            borderBottomWidth:1,
                            borderStyle:'solid',
                            padding:20}}>
                            <Text
                              style={{
                                fontFamily: CustomFont.Poppins,
                                fontSize: 15,
                                color: couleurs.dark,
                                alignSelf:'center'
                              }}>
                              Jeudi
                            </Text>
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 10,
                                flexDirection: 'row',
                              }}>
                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={selectedHoraireOuvertureJeudi}
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireOuvertureJeudi(itemValue)
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>

                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={selectedHoraireFermetureJeudi}
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireFermetureJeudi(itemValue)
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>
                            </View>
                          </View>

                          {/* VENDREDI */}
                          <View style={{borderBottomColor: couleurs.primary,
                            borderBottomWidth:1,
                            borderStyle:'solid',
                            padding:20}}>
                            <Text
                              style={{
                                fontFamily: CustomFont.Poppins,
                                fontSize: 15,
                                color: couleurs.dark,
                                alignSelf:'center'
                              }}>
                              Vendredi
                            </Text>
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 10,
                                flexDirection: 'row',
                              }}>
                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={
                                    selectedHoraireOuvertureVendredi
                                  }
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireOuvertureVendredi(
                                      itemValue,
                                    )
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>

                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={
                                    selectedHoraireFermetureVendredi
                                  }
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireFermetureVendredi(
                                      itemValue,
                                    )
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>
                            </View>
                          </View>

                          {/* SAMEDI */}
                          <View style={{borderBottomColor: couleurs.primary,
                            borderBottomWidth:1,
                            borderStyle:'solid',
                            padding:20}}>
                            <Text
                              style={{
                                fontFamily: CustomFont.Poppins,
                                fontSize: 15,
                                color: couleurs.dark,
                                alignSelf:'center'
                              }}>
                              Samedi
                            </Text>
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 10,
                                flexDirection: 'row',
                              }}>
                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={selectedHoraireOuvertureSamedi}
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireOuvertureSamedi(itemValue)
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>

                              <View
                                style={{
                                  borderStyle: 'solid',
                                  borderColor: couleurs.primary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                }}>
                                <Picker
                                  style={{
                                    width: 170,
                                    height: 30,
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 10,
                                  }}
                                  selectedValue={selectedHoraireFermetureSamedi}
                                  onValueChange={(
                                    itemValue: any,
                                    itemIndex: any,
                                  ) =>
                                    setSelectedHoraireFermetureSamedi(itemValue)
                                  }>
                                  
                                  <Picker.Item
                                    label={'Selectionner une heure'}
                                    value={''}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label={'MATIN'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_matin.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}

                                  <Picker.Item
                                    label={'SOIR'}
                                    value={'-1'}
                                    enabled={false}
                                  />
                                  {hours_apresmidi.map((row, index) => (
                                    <Picker.Item
                                      key={index}
                                      label={row.hour}
                                      value={row.hour}
                                    />
                                  ))}
                                </Picker>
                              </View>
                            </View>
                          </View>
                        </View>
          </View>

        </ScrollView>

        <View style={{padding:10}}>
        <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  backgroundColor: couleurs.primary,
                  borderRadius: 30,
                  width: '100%',
                }}
                onPress={() => saveHoraire()   }>
                <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 15,
                      fontWeight: '500',
                      color: couleurs.secondary,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Enregistrer
                  </Text>
              </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
