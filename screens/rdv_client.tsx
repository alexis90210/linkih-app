import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';
import {CustomFont, couleurs} from '../components/color';
import {sous_categories} from '../components/api/categories';
import storage from '../components/api/localstorage';
import axios from 'axios';
import ApiService from '../components/api/service';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RdvClient({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {

 // LOADER
 const [isLoading, setLoading] = useState(false)

 // CURRENT DATE
 const [date , setDate] = useState('');

   // SELECT DATE
   const _selectDate = (date:any) => {
    setDate( date)
    setLoading(true)
    loadRendezvous();
  }

  // GET USER CONNECTED
  const [userConnectedRole, SetUserRole] = useState<any>({})

  storage.load({
    key: 'userconnected', // Note: Do not use underscore("_") in key!
    id: 'userconnected', // Note: Do not use underscore("_") in id!
  }).then( data => {

    SetUserRole(data.role)
  })
  .catch(error => console.log(error)
  );

 //   GET RENDEZ-VOUS
 const [rendezvous, setRendezvous] = useState([]);
 const [isLoadedRendezVous, setLoadedRendezVous] = useState(false);

 const loadRendezvous = () => {
   axios({
     method: 'POST',
     url: ApiService.API_URL_GET_RENDEZ_VOUS,
     data:JSON.stringify({
        utilisateur_id: userConnectedRole.id,
        date: date
     }),
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
   })
     .then((response: {data: any}) => {
       var api = response.data;
       if (api.code == 'success') {
        setLoading(false)
         setLoadedRendezVous(true)
         setRendezvous(api.message);
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

 if ( !isLoadedRendezVous ) loadRendezvous()

  
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
            Mes rendez-vous
          </Text>
        </View>

        {/* NAV */}
        <View style={{paddingHorizontal:12}}>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 10,
            height: 50,
            alignItems: 'center',
            marginTop: 10, borderRadius:10
          }}>
          <TouchableOpacity onPress={ () => {
            setDate(`<${new Date().getDay() -1}/${new Date().getMonth() +1}/${new Date().getFullYear()}`),
            setLoading(true),
            loadRendezvous()
          }}>
          <View>
            <Text>Passé</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={ () => {
            setDate(`<${new Date().getDay() -1}/${new Date().getMonth() +1}/${new Date().getFullYear()}`),
            setLoading(true),
            loadRendezvous()
          }}>
            <View>
            <Text>Hier</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={ () => {
            setDate(`${new Date().getDay()}/${new Date().getMonth() +1}/${new Date().getFullYear()}`),
            setLoading(true),
            loadRendezvous()
          }}>
            <View
            style={{
              backgroundColor: couleurs.primary,
              borderRadius: 20,
              padding: 10,
            }}>
            <Text style={{color: couleurs.white}}>Aujourd'hui</Text>
          </View>
          </TouchableOpacity>
          
        <TouchableOpacity  onPress={ () => {
            setDate(`${new Date().getDay() +1}/${new Date().getMonth() +1}/${new Date().getFullYear()}`),
            setLoading(true),
            loadRendezvous()
          }}>
         <View>
            <Text>Démain</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity  onPress={ () => {
            setDate(`> ${new Date().getDay() }/${new Date().getMonth() +1}/${new Date().getFullYear()}`)
            loadRendezvous()
          }}>
          <View>
            <Text>A vénir</Text>
          </View>
        </TouchableOpacity>
          
          
        </View>
        </View>

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View style={{marginHorizontal: 12, marginVertical: 10}}>
            
            {(rendezvous.length> 0 && !isLoading) && <View style={{
                  marginTop:10}}>
              <View
                style={{
                  borderRadius: 15,
                  backgroundColor: '#fff',
                  padding: 14,
                  width: '100%'
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 14,
                    fontFamily: CustomFont.Poppins,
                    opacity: 0.8,
                  }}>
                  {sous_categories[0]}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      paddingVertical: 3,
                      fontSize: 14,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    Lundi .
                  </Text>
                  <Text
                    style={{
                      color: couleurs.primary,
                      paddingVertical: 3,
                      fontSize: 13,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    15:30:50
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      paddingVertical: 3,
                      fontSize: 13,
                      fontFamily: CustomFont.Poppins,
                    }}>
                    14,00 $
                  </Text>

                  <Pressable onPress={() => null}>
                    <Text
                      style={{
                        color: couleurs.primary,
                        paddingVertical: 3,
                        fontSize: 14,
                        fontFamily: CustomFont.Poppins,
                      }}>
                      Valider
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View
                style={{height: 1, overflow: 'hidden', paddingHorizontal: 10}}>
                <View
                  style={{
                    height: 1,
                    borderWidth: 1,
                    borderColor: couleurs.primary,
                    borderStyle: 'dashed',
                  }}></View>
              </View>
            </View>}

            {isLoading && <View style={{width:'100%', height:200, marginTop:100, display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <ActivityIndicator size={'large'}></ActivityIndicator>
                </View>}

          </View>

          {/* Welcome text */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
