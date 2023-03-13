import React, { useState } from 'react';
import {Text, View, TouchableOpacity, SafeAreaView, ScrollView, Linking} from 'react-native';

import ShopIcon from '../components/shop';
import LogoutIcon from '../components/logout';
import AccountIcon from '../components/account';
import ArrowRightIcon from '../components/ArrowRight';
import BillIcon from '../components/bill';
import LawIcon from '../components/Law';
import Law2Icon from '../components/Law2';
import Law3Icon from '../components/Law3';
import CallIcon from '../components/call';
import { CustomFont, couleurs } from '../components/color';
import storage from '../components/api/localstorage';

function MenuScreen({navigation}: {navigation: any}) {

  const [isVendeur, SetVendeur] = useState( false)
  const [isClient, SetClient] = useState( false)

  storage
  .load({
    key: 'userconnected', // Note: Do not use underscore("_") in key!
    id: 'userconnected', // Note: Do not use underscore("_") in id!
  })
  .then(data => {

    // console.log(data);


    if ( data.role == 'ROLE_VENDEUR' ) {
      SetVendeur(true)
    }

    else if ( data.role == 'ROLE_CLIENT' ) {
      SetClient(true)
    }

    else {
      navigation.navigate('identification')
    }

  })
  .catch(error => console.log(error));
  
  return (
    <SafeAreaView
      style={{
        backgroundColor: couleurs.white,
        flex: 1,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 30,
          paddingVertical: 15,
          paddingHorizontal: 10,
          backgroundColor: couleurs.primary
        }}>
        <Text style={{color: couleurs.white, fontSize: 17, fontFamily: CustomFont.Poppins}}>
          Parametres du compte
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowRightIcon color={couleurs.white} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            {/* Mon compte */}
           
          { !isVendeur && <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottomWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                alignItems: 'center',
                marginTop:0
              }}
              onPress={() => {
                navigation.navigate('compte');
              }}>
              <AccountIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Mon compte
              </Text>
            </TouchableOpacity>}

            {/*  Mon etablissement */}

            {isVendeur && (<TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate('mes_prestations')
              }}>
              <BillIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Mes prestations
              </Text>
            </TouchableOpacity>)}
{/* 
            {isVendeur && (<TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => {
               navigation.navigate('mes_categories')
              }}>
              <BillIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Mes Categories
              </Text>
            </TouchableOpacity>)} */}

            {isVendeur && (<TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => {
               navigation.navigate('mes_horaires')
              }}>
              <BillIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Horaire
              </Text>
            </TouchableOpacity>)}

            {/* {isVendeur && (<TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate('ma_gallerie')
              }}>
              <BillIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Gallerie
              </Text>
            </TouchableOpacity>)} */}
          
            {/* {isVendeur && (<TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate('reabonnement')
              }}>
              <BillIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Reabonnement
              </Text>
            </TouchableOpacity>)} */}

           { isVendeur && ( <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate('MonEtablissement');
              }}>
              <ShopIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Mon etablissement
              </Text>
            </TouchableOpacity>)}

         

            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => 
                Linking.openURL(`tel:242069500886`)
              }>
              <CallIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Contactez-nous
              </Text>
            </TouchableOpacity>



            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => {
                null;
              }}>
              <Law3Icon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Condition generale d'utilisation
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => {
                null;
              }}>
              <LawIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Politique de confidentialite
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => {
                null;
              }}>
              <Law2Icon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Mentions legales
              </Text>
            </TouchableOpacity>

            {/*  Session de connexion */}
         
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopWidth:1,
                borderColor: '#9c702b20',
                borderStyle:'solid',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() =>  navigation.navigate(isVendeur ? 'identification_proprietaire' : 'identification_client' )}>
              <LogoutIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Deconnexion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MenuScreen;
