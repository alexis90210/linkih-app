/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './screens/splashScreen';
import ConfigurationScreen from './screens/configuration';
import IdentificationScreen from './screens/identification';
import IdentificationClientScreen from './screens/identfication_client';
import InscriptionClientScreen from './screens/inscription_client';
import Main from './screens/main';
import Compte from './screens/compte';
import Rdv from './screens/rdv';
import Map from './screens/map';
import ResultatRechercheScreen from './screens/resultat_recherche';
import InscriptionProprietaireScreen2 from './screens/inscription_proprietaire_2';
import InscriptionProprietaireScreen1 from './screens/inscription_proprietaire_1';
import InscriptionProprietaire3 from './screens/inscription_proprietaire_3';
import IdentificationProprietaireScreen from './screens/identfication_proprietaire';
import CompteProprietaire from './screens/compte_proprietaire';
import MonEtablissement from './screens/mon_etablissement';
import AutreEtablissement from './screens/autre_etablissement';
import MenuScreen from './screens/menu';
import { CustomFont, couleurs } from './components/color';
import InscriptionProprietaire4 from './screens/inscription_proprietaire_4';
import InscriptionProprietaire5 from './screens/inscription_proprietaire_5';
import storage from './components/api/localstorage';
import Reabonnement from './screens/reabonnement';
import ConfirmationCompteScreen from './screens/confirmation_screen';
import PersonnalisationReservation from './screens/personnalisation_reservation';
import PersonnalisationReservationCreneau from './screens/personnalisation_reservation_creneau';
import EditClientScreen from './screens/_edit_client';
import EditAdresse from './screens/_edit_adresse';
import BilanReservation from './screens/_bilan_reservation';
import RdvClient from './screens/rdv_client';
import SimpleRdv from './screens/simple_rdv';
import AbonnementActivation from './screens/abonnement';
import Gallerie from './screens/etab_gallery';
import MesHoraires from './screens/etab_horair';
import MaCategorie from './screens/etab_categorie';
import MesPrestations from './screens/etab_prestations';
import ConfigurationDefaultCategorie from './screens/prestation_list';
import PaiementScreen from './screens/paiement_screen_stripe';


const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {

  
  const [initialRouteName, setInitialRouteName] = useState('splash')

  storage.load({
    key: 'firstusage', // Note: Do not use underscore("_") in key!
    id: 'firstusage', // Note: Do not use underscore("_") in id!
  }).then( data => {
       if ( data.isClient) {
        setInitialRouteName('identification_client')  
       } else {
        setInitialRouteName('identification_proprietaire')  
       }  
  }).catch( error => {
    console.log(error);
    
  });
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName={initialRouteName}
      >

        {/* splash */}
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* configuration */}
        <Stack.Screen
          name="configuration"
          component={ConfigurationScreen}
          options={{
            title:'Configuration',
            headerTitleStyle: {fontSize: 16, color:couleurs.white, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.white,
            headerShown: false,
            headerStyle: {
      backgroundColor: couleurs.primary,
    },
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* identification */}
        <Stack.Screen
          name="identification"
          component={IdentificationScreen}
          options={{
            headerShown: false,

            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right'
          }}
        />

        {/* confirmation_screen */}
        <Stack.Screen
          name="confirmation_screen"
          component={ConfirmationCompteScreen}
          options={{
            headerShown: false,

            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right'
          }}
        />



        {/* identification_client */}
        <Stack.Screen
          name="identification_client"
          component={IdentificationClientScreen}
          options={{
            title: 'Connexion client',
            
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.white, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.white,
            headerShown: true,
            headerStyle: {
      backgroundColor: couleurs.primary,
    },
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* personnalisation_reservation */}
        <Stack.Screen
          name="personnalisation_reservation"
          component={PersonnalisationReservation}
          options={{
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.white, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.white,
            headerShown: false,
            headerStyle: {
      backgroundColor: couleurs.primary,
    },
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* personnalisation_reservation_creneau */}
        <Stack.Screen
          name="personnalisation_reservation_creneau"
          component={PersonnalisationReservationCreneau}
          options={{
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.white, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.white,
            headerShown: false,
            headerStyle: {
      backgroundColor: couleurs.primary,
    },
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* creation_compte_client */}
        <Stack.Screen
          name="creation_compte_client"
          component={InscriptionClientScreen}
          options={{
            title: 'Inscription client',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.white, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.white,
            headerShown: true,
            headerStyle: {
      backgroundColor: couleurs.primary,
    },
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* reabonnement */}
        <Stack.Screen
          name="reabonnement"
          component={Reabonnement}
          options={{
            title: 'Re/Abonnement',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.white, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.white,
            headerShown: true,
            headerStyle: {
      backgroundColor: couleurs.primary,
    },
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />




        {/* identification_proprietaire */}
        <Stack.Screen
          name="identification_proprietaire"
          component={IdentificationProprietaireScreen}
          options={{
            title: 'Connexion proprietaire',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.white, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.white,
            headerShown: true,
            headerStyle: {
      backgroundColor: couleurs.primary,
    },
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* inscription_proprietaire */}
        <Stack.Screen
          name="inscription_proprietaire_1"
          component={InscriptionProprietaireScreen1}
          options={{
            title: 'Creation du compte proprietaire',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.white, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.white,
            headerShown: true,
            headerStyle: {
      backgroundColor: couleurs.primary,
    },
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* inscription_proprietaire_2 */}
        <Stack.Screen
          name="inscription_proprietaire_2"
          component={InscriptionProprietaireScreen2}
          options={{
            title: 'Creation du compte proprietaire',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* inscription_proprietaire_3 */}
        <Stack.Screen
          name="inscription_proprietaire_3"
          component={InscriptionProprietaire3}
          options={{
            title: 'Image de couverture',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* inscription_proprietaire_4 */}
        <Stack.Screen
          name="inscription_proprietaire_4"
          component={InscriptionProprietaire4}
          options={{
            title: '',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* inscription_proprietaire_5 */}
        <Stack.Screen
          name="inscription_proprietaire_5"
          component={InscriptionProprietaire5}
          options={{
            title: '',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* main */}
        <Stack.Screen
          name="main"
          component={Main}
          options={{
            headerShadowVisible: true,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* compte */}
        <Stack.Screen
          name="compte"
          component={Compte}
          options={{
            title: 'Mon compte',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* rdv */}
        <Stack.Screen
          name="rdv"
          component={Rdv}
          options={{
            title: 'Mon rdv',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/*  map  */}
        <Stack.Screen
          name="map"
          component={Map}
          options={{
            title: 'La carte',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* resultat_recherche */}
        <Stack.Screen
          name="resultat_recherche"
          component={ResultatRechercheScreen}
          options={{
            title: 'Resultat de la recherche',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

         {/* compte directeur */}
         <Stack.Screen
          name="CompteProprietaire"
          component={CompteProprietaire}
          options={{
            title: 'Resultat de la recherche',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* espace etablissement */}
        <Stack.Screen
          name="MonEtablissement"
          component={MonEtablissement}
          options={{
            title: 'Espace etablissement',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* espace autre etablissement */}
        <Stack.Screen
          name="autre_etab"
          component={AutreEtablissement}
          options={{
            title: 'Espace etablissement',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* espace autre etablissement */}
        <Stack.Screen
          name="edit_client"
          component={EditClientScreen}
          options={{
            title: 'Edition compte',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: true,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* Menu */}
        <Stack.Screen
          name="menu"
          component={MenuScreen}
          options={{
            title: 'Menu screen',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />


        {/* EditAdresse */}
        <Stack.Screen
          name="edit_adresse"
          component={EditAdresse}
          options={{
            title: 'Selectionnez l\'addresse',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />

        {/* BilanReservation */}
        <Stack.Screen
          name="bilan_reservation"
          component={BilanReservation}
          options={{
            title: 'Bilan reservation',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />

        {/* RdvClient */}
        <Stack.Screen
          name="rdv_client"
          component={RdvClient}
          options={{
            title: 'rdv client',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />


        {/* SimpleRdv */}
        <Stack.Screen
          name="simple_rdv"
          component={SimpleRdv}
          options={{
            title: 'rdv client',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />

          {/* AbonnementActivation */}
          <Stack.Screen
          name="abonnement_activation"
          component={AbonnementActivation}
          options={{
            title: 'rdv client',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />

         {/* Gallerie */}
         <Stack.Screen
          name="ma_gallerie"
          component={Gallerie}
          options={{
            title: 'Gallerie',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />

        {/* MesHoraires */}
        <Stack.Screen
          name="mes_horaires"
          component={MesHoraires}
          options={{
            title: 'Mes Horaires',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />


        {/* MaCategorie */}
        <Stack.Screen
          name="mes_categories"
          component={MaCategorie}
          options={{
            title: 'Mes Horaires',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />

        {/* MesPrestations */}
        <Stack.Screen
          name="mes_prestations"
          component={MesPrestations}
          options={{
            title: 'Mes Horaires',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />

        {/* ConfigurationDefaultCategorie */}
        <Stack.Screen
          name="prestations_list"
          component={ConfigurationDefaultCategorie}
          options={{
            title: 'Choisir une prestation',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />


         {/* PaiementScreen */}
         <Stack.Screen
          name="paiement_screen"
          component={PaiementScreen}
          options={{
            title: 'Portail de paiement',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 16, color:couleurs.primary, fontFamily: CustomFont.Poppins,},
            headerTintColor:couleurs.primary,
            headerShown: true,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />






        {/* end */} 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
