import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import {CustomFont, couleurs} from '../components/color';
import CalendarStrip from 'react-native-calendar-strip';

export default function PersonnalisationReservationCreneau({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
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
  const [ selectedDate, setDate ] = useState( '' );

  // handler
  const _setDate = (date: any) => {
    console.log( date.toLocalString() );
    
    setDate( date.toLocalString() );
  };

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
            choisir un creaneau
          </Text>
        </View>

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

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          {selectedDate != '' && (
            <View style={{marginVertical: 10, paddingHorizontal: 10}}>
              <Text
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: '#ddd',
                  backgroundColor: 'couleurs.white',
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
                    onPress={() =>
                      navigation.navigate('bilan_reservation', {
                        props: route.params.props,
                        creneau: {
                          date: selectedDate,
                          heure: h.hour,
                        },
                      })
                    }>
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
                  backgroundColor: 'couleurs.white',
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
                    onPress={() =>
                      navigation.navigate('bilan_reservation', {
                        props: route.params.props,
                        creneau: {
                          date: selectedDate,
                          heure: h.hour,
                        },
                      })
                    }>
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

          {/* Welcome text */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
