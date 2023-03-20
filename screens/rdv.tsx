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

export default function Rdv({
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
  const [userConnected, SetUserConnected] = useState<any>({})

  storage.load({
    key: 'userconnected', // Note: Do not use underscore("_") in key!
    id: 'userconnected', // Note: Do not use underscore("_") in id!
  }).then( data => {

    SetUserConnected(data.etablissement[0])
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
        setLoading(false)
         setLoadedRendezVous(true)
         setRendezvous(api.message.reverse());
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


 const confirmRdv = (id:any) => {
  axios({
    method: 'POST',
    url: ApiService.API_URL_CONFIRM_RDV,
    data:JSON.stringify({
      rendez_vous_id: id,
      statut:1
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
       loadRendezvous()
      }
      if (api.code == 'error') {
        Alert.alert('', 'Erreur survenue');
      }
    })
    .catch((error: any) => {
      console.log(error);
      Alert.alert('', 'Erreur Network');
    });
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
            
            {(rendezvous.length> 0 && !isLoading) && 
            rendezvous.map( (row:any, key:any) =>(<View key={key} style={{
              marginTop:10}}>
          <View
            style={{
              borderRadius: 15,
              backgroundColor: '#fff',
              padding: 14,
              width: '100%',
              borderWidth: 1,
              borderColor: couleurs.primary,
              borderStyle: 'dashed',
            }}>
            <Text
              style={{
                color: '#000',
                paddingVertical: 3,
                fontSize: 16,
                fontFamily: CustomFont.Poppins,
                opacity: 0.8,
              }}>
              {row.client}
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
                {new Date(row.date).toLocaleDateString()} .
              </Text>
              <Text
                style={{
                  color: couleurs.primary,
                  paddingVertical: 3,
                  fontSize: 13,
                  fontFamily: CustomFont.Poppins,
                }}>
                {row.heure}
              </Text>
            </View>
            {route.prix && <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 13,
                  fontFamily: CustomFont.Poppins,
                }}>
                {row.prix}
              </Text>}

              <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
              <Pressable onPress={() => null}>
                <Text
                  style={{
                    color: couleurs.primary,
                    paddingVertical: 3,
                    fontSize: 14,
                    fontFamily: CustomFont.Poppins,
                  }}>
                  {row.statut == 0 ? "Attente de confirmation" : (row.statut == 1 ? "Confirme" : "Annule")}
                </Text>
              </Pressable>

              {row.statut == 0 && <Pressable
            style={{
              paddingHorizontal: 10,
              backgroundColor: couleurs.primary,
              borderRadius: 30,
            }}
            onPress={() => confirmRdv(row.id)  }>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 10,
                  paddingHorizontal: 10,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#fff',
                }}>
                Confirmer ?
              </Text>
            </View>
          </Pressable>}

              </View>
          </View>

        </View>))
            }

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
