import { View } from 'react-native';
import {WebView} from 'react-native-webview';

export default function PaiementScreen({navigation, route}:{navigation:any, route:any}) {

  return (
    <View style={{flex: 1}}>
      <WebView 
        source={{uri: route.params.route}} 
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
