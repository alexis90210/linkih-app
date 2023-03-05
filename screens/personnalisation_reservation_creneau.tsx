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
        />

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
            <Text style={{borderTopWidth:1, borderBottomWidth: 1, borderColor:'#ddd', backgroundColor:'couleurs.white', padding:10,marginVertical:0, textAlign:'center'}}>MATIN</Text>
          <View style={{marginVertical: 10, paddingHorizontal: 10}}>
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
              ))}
            </View>

            <Text style={{borderTopWidth:1, borderBottomWidth: 1, borderColor:'#ddd', backgroundColor:'couleurs.white', padding:10,marginVertical:20, textAlign:'center'}}>MIDI + APRES MIDI</Text>

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
              ))}
            </View>
          </View>

          {/* Welcome text */}
        </ScrollView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundColor: couleurs.white,
            borderTopWidth: 1,
            borderTopColor: '#ddd',
            padding: 10,
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 10,
            }}>
            <Text style={{alignSelf: 'center', fontFamily: CustomFont.Poppins}}>
              Lundi 06 mars 2022 a 02h30
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: CustomFont.Poppins,
                color: couleurs.primary,
              }}>
              50 $
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: couleurs.primary,
              borderRadius: 30,
              paddingHorizontal: 30,
              width: '100%',
              height: 40,
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
              onPress={() =>
                navigation.navigate('personnalisation_reservation_creneau')
              }>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 5,
                  fontSize: 14,
                  color: couleurs.white,
                  fontFamily: CustomFont.Poppins,
                }}>
                SUIVANT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
