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
import IdentificationVendeurScreen from './screens/identfication_vendeur';
import InscriptionVendeurScreen from './screens/inscription_vendeur';
import InscriptionVendeurScreen2 from './screens/inscription_vendeur_2';
import InscriptionVendeurScreen3 from './screens/inscription_vendeur_3';
import Main from './screens/main';
import Compte from './screens/compte';
import Rdv from './screens/rdv';
import Map from './screens/map';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="identification_client"
          component={IdentificationClientScreen}
          options={{
            title:'connexion client',
            headerShadowVisible:false,
            headerTitleStyle:{ fontSize: 18, fontWeight: '700'},
            headerShown: true,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="creation_compte_client"
          component={InscriptionClientScreen}
          options={{
            title:'Creation du compte client',
            headerShadowVisible:false,
            headerTitleStyle:{ fontSize: 18, fontWeight: '700'},
            headerShown: true,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="identification_vendeur"
          component={IdentificationVendeurScreen}
          options={{
            title:'connexion societe ou auto-entrepreneur',
            headerShadowVisible:false,
            headerTitleStyle:{ fontSize: 18, fontWeight: '700'},
            headerShown: true,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="inscription_vendeur"
          component={InscriptionVendeurScreen}
          options={{
            title:'creation du compte societe ou auto-entrepreneur',
            headerShadowVisible:false,
            headerTitleStyle:{ fontSize: 18, fontWeight: '700'},
            headerShown: true,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="inscription_vendeur_2"
          component={InscriptionVendeurScreen2}
          options={{
            title:'creation du compte  soc...',
            headerShadowVisible:false,
            headerTitleStyle:{ fontSize: 18, fontWeight: '700'},
            headerShown: true,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="inscription_vendeur_3"
          component={InscriptionVendeurScreen3}
          options={{
            title:'creation du compte  soc...',
            headerShadowVisible:false,
            headerTitleStyle:{ fontSize: 18, fontWeight: '700'},
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="main"
          component={Main}
          options={{
            headerShadowVisible:true,
            headerTitleStyle:{ fontSize: 18, fontWeight: '700'},
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="compte"
          component={Compte}
          options={{
            title:'Mon compte',
            headerShadowVisible:false,
            headerTitleStyle:{ fontSize: 18, fontWeight: '700'},
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="rdv"
          component={Rdv}
          options={{
            title:'Mon rdv',
            headerShadowVisible:false,
            headerTitleStyle:{ fontSize: 18, fontWeight: '700'},
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="map"
          component={Map}
          options={{
            title:'La carte',
            headerShadowVisible:false,
            headerTitleStyle:{ fontSize: 18, fontWeight: '700'},
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



