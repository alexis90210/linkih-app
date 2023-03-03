import React from 'react';
import {Text, View, Pressable, SafeAreaView, ScrollView} from 'react-native';

import ShopIcon from '../components/shop';
import LogoutIcon from '../components/logout';
import AccountIcon from '../components/account';
import ArrowLeftIcon from '../components/ArrowLeft';
import ArrowRightIcon from '../components/ArrowRight';
import BillIcon from '../components/bill';
import LawIcon from '../components/Law';
import Law2Icon from '../components/Law2';
import Law3Icon from '../components/Law3';
import CallIcon from '../components/call';
import { CustomFont, couleurs } from '../components/color';

function MenuScreen({navigation}: {navigation: any}) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#f6f6f6',
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
        }}>
        <Text style={{color: couleurs.primary, fontSize: 18, fontFamily: CustomFont.Poppins}}>
          Parametres du compte
        </Text>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowRightIcon color={couleurs.primary} />
        </Pressable>
      </View>
      <ScrollView>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            {/* Informations personnelles */}
            <Text style={{padding: 10, fontSize: 15, paddingHorizontal: 10, color:'rgba(100,100,100,.8)',fontFamily: CustomFont.Poppins}}>
              Informations personnelles
            </Text>
            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 10,
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('compte');
              }}>
              <AccountIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Mon compte
              </Text>
            </Pressable>

            {/*  Mon etablissement */}
            <Text style={{padding: 10, fontSize: 15, paddingHorizontal: 10, color:'rgba(100,100,100,.8)',fontFamily: CustomFont.Poppins}}>
              Mon etablissement
            </Text>

            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                display: 'flex',
                flexDirection: 'row',
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
            </Pressable>

            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate('espace_etab');
              }}>
              <ShopIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Mon etablissement
              </Text>
            </Pressable>

            {/*  A propos de Linkih */}
            <Text style={{padding: 10, fontSize: 15, paddingHorizontal: 10, color:'rgba(100,100,100,.8)',fontFamily: CustomFont.Poppins}}>
              A propos de Linkih
            </Text>

            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => {
                null;
              }}>
              <CallIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Contactez-nous
              </Text>
            </Pressable>



            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                display: 'flex',
                flexDirection: 'row',
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
            </Pressable>

            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                display: 'flex',
                flexDirection: 'row',
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
            </Pressable>

            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                display: 'flex',
                flexDirection: 'row',
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
            </Pressable>

            {/*  Session de connexion */}
            <Text style={{padding: 10, fontSize: 15, paddingHorizontal: 10, color:'rgba(100,100,100,.8)',fontFamily: CustomFont.Poppins}}>
              Session de connexion
            </Text>

            <Pressable
              android_ripple={{color: '7B4C7A'}}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              onPress={() => navigation.navigate('identification_proprietaire')}>
              <LogoutIcon color={couleurs.primary} />
              <Text style={{fontSize: 16, marginVertical: 10, color: '#000',fontFamily: CustomFont.Poppins}}>
                Deconnexion
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MenuScreen;
