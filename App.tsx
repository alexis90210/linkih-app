/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='main'>

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
            headerShown: false,
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
            animation: 'slide_from_right',
          }}
        />

        {/* identification_client */}
        <Stack.Screen
          name="identification_client"
          component={IdentificationClientScreen}
          options={{
            title: 'connexion client',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 18, fontWeight: '700'},
            headerShown: true,
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
            headerTitleStyle: {fontSize: 18, fontWeight: '700'},
            headerShown: true,
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
            title: 'connexion proprietaire',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 18, fontWeight: '700'},
            headerShown: true,
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
            title: 'creation du compte proprietaire',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 18, fontWeight: '700'},
            headerShown: true,
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
            title: 'creation du compte proprietaire',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 18, fontWeight: '700'},
            headerShown: true,
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
            title: 'creation du compte proprietaire',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 18, fontWeight: '700'},
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
            headerTitleStyle: {fontSize: 18, fontWeight: '700'},
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
            headerTitleStyle: {fontSize: 18, fontWeight: '700'},
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
            headerTitleStyle: {fontSize: 18, fontWeight: '700'},
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
            headerTitleStyle: {fontSize: 18, fontWeight: '700'},
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
            headerTitleStyle: {fontSize: 18, fontWeight: '700'},
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        {/* end */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
