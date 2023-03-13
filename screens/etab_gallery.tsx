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

export default function Gallerie({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {

   // LOADER
 const [isLoading, setLoading] = useState(false)

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

 //   GET GALLERIE
 const [gallerie, setGallerie] = useState([]);
 const [isLoadedGallerie, setLoadedGallerie] = useState(false);

 const loadGallerie = () => {
   axios({
     method: 'POST',
     url: ApiService.API_URL_GET_GALLERIE,
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
         setLoadedGallerie(true)
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

//  if ( !isLoadedGallerie ) loadGallerie()



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
            Ma Gallerie
          </Text>
        </View>



        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
          <View style={{marginHorizontal: 12, marginVertical: 10}}>


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
