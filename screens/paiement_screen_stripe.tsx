import { View } from 'react-native';
import {WebView} from 'react-native-webview';
import ApiService from '../components/api/service';

export default function PaiementScreen() {

  return (
    <View style={{flex: 1}}>
      <WebView 
        source={{uri: ApiService.API_URL_STRIPE_PAIEMENT_PORTAIL}} 
        javaScriptEnabled={true}
        style={{flex: 1}} 
        timeout={20000}
        domStorageEnabled={true}
        androidDebuggingEnabled={true}
        onLoadEnd={ () => null }
        onMessage={ (event) => null }
        onError={ (error) => null } 
      />
    </View>
  );
}
