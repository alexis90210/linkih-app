import {
    Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid
} from 'react-native';
import {CustomFont, couleurs} from '../components/color';
import MapboxGL from '@rnmapbox/maps';
import defaultStyle from '../components/api/defaultMpaStyle';
import {useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import ArrowLeftIcon from '../components/ArrowLeft';
import ApiService from '../components/api/service';
import translations from '../translations/translations';
import storage from '../components/api/localstorage';

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission de localiser votre position',
        message: 'Pouvons-nous accéder à votre emplacement?',
        buttonNeutral: 'Demande moi plus tard',
        buttonNegative: 'Annuler',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default function EditAdresse({navigation, route}: {navigation: any, route:any}) {

  console.log(route.params);

    /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////////
    const [preferredLangage , setPreferredLangage] = useState('fr');

    const t = (key:any , langage:any) => {
      return translations[langage][key] || key
    }
  
    storage.load({
      key: 'defaultlang', // Note: Do not use underscore("_") in key!
      id: 'defaultlang' // Note: Do not use underscore("_") in id!
    }).then( ( data:any) => {
      setPreferredLangage(data)
    })
  
    //////////////////////////////////////////////////////////////////////////////////////
  
  

  const [startCords, setstartCords] = useState([0, 0]);
  const [adresse, setAdresse] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  var client = {
    adresse: '',
    id:''
  };

  // GEOLOCALISATION

  useEffect(() =>{
    if (requestLocationPermission()) {
      Geolocation.getCurrentPosition(info => {
        let lon = Number(info.coords.longitude);
        let lat = Number(info.coords.latitude);
    
        if (!isLoaded) {
          setstartCords([lon, lat]);
          setLoaded(true);
        }
        
      });
    } else {
      navigation.goBack()
    }
  })

  // DRAG MARKER
  const _onDragGetAdresse = (lon: number, lat: number) => {
    axios({
      method: 'GET',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?limit&types=address%2Cpostcode&access_token=${ApiService.MAPBOX_GL_TOKEN}`,
    })
      .then(response => {
        client.adresse = response.data.features[1].place_name;
        setAdresse(response.data.features[1].place_name);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // SUBMIT
  const updateAdresse = () => {

    if (client.adresse.length < 4) {
      Alert.alert('', t('adresse_court', preferredLangage));
      return;
    }

    client.id = route.params.id

    axios({
      method: 'POST',
      url: ApiService.API_URL_EDIT_UTILISATEUR,
      data: JSON.stringify(client),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response: {data: any}) => {
        var api = response.data;
        console.log(api);

        if (api.code == 'success') {
          navigation.goBack()
        }
        if (api.code == 'error') {
          Alert.alert('', api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert(
          '',
          t('erreur_survenue', preferredLangage)         
        );
      });
  };

  return (
    <SafeAreaView>
      <View style={{flex: 1}}>
        <View
          style={{
            height: Dimensions.get('window').height,
          }}>
          <MapboxGL.MapView
            style={styles.map}
            styleJSON={JSON.stringify(defaultStyle)}
            zoomEnabled={true}
            pitchEnabled={true}
            onPress={e => null}
            onRegionIsChanging={e => null}
            surfaceView={true}
            rotateEnabled={true}
            scrollEnabled={true}>
            {/* <MapboxGL.UserLocation /> */}
            <MapboxGL.Camera
              zoomLevel={11}
              centerCoordinate={startCords}
              followUserLocation={true}
            />

            <MapboxGL.PointAnnotation
              id={'marker'}
              coordinate={startCords}
              draggable
              onDragEnd={(e: any) => {
                _onDragGetAdresse(
                  e.geometry.coordinates[0],
                  e.geometry.coordinates[1],
                );
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#eee',
                      borderRadius: 50,
                      width: 60,
                      height: 60,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignContent: 'center',
                      padding: 10,
                      borderWidth: 2,
                      borderColor: couleurs.primary,
                    }}>
                    <Image
                      source={require('../assets/images/salon-de-coiffure.png')}
                      style={{
                        width: 30,
                        height: 30,
                        marginLeft: 6,
                      }}></Image>
                  </View>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      alignSelf: 'center',
                      backgroundColor: '#eee',
                      borderRadius: 50,
                      borderWidth: 2,
                      padding: 4,
                      borderColor: couleurs.primary,
                    }}></View>
                </View>
              </View>
            </MapboxGL.PointAnnotation>
          </MapboxGL.MapView>
        </View>

        <View
          style={{
            borderRadius: 100,
            backgroundColor: couleurs.primary,
            padding: 10,
            margin: 4,
            position: 'absolute',
            top: 10,
            left: 10,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={'#fff'} />
          </Pressable>
        </View>

        <View
          style={{
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#eee',
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: 20,
          }}>
          <TextInput
            defaultValue={adresse}
            onChangeText={input => (client.adresse = input)}
            placeholder={t('entrez_votre_adresse', preferredLangage)}
            style={{
              backgroundColor: 'transparent',
              borderBottomWidth: 1,
              borderBottomColor: '#E2C6BB',
              color: couleurs.primary,
              width: '100%',
              padding: 0,
              marginTop: 10,
              fontFamily: CustomFont.Poppins,
            }}></TextInput>

          <View
            style={{
              alignItems: 'center',
              backgroundColor: couleurs.primary,
              borderRadius: 30,
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                width: '70%',
              }}
              onPress={() => updateAdresse()}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 10,
                  paddingHorizontal: 20,
                  fontSize: 13,
                  fontWeight: '500',
                  color: couleurs.white,
                  fontFamily: CustomFont.Poppins,
                }}>
                {t('confirmer_adresse', preferredLangage)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: couleurs.primary,
  },
  container: {
    height: '110%',
    width: '100%',
    backgroundColor: couleurs.primary,
  },
  map: {
    flex: 1,
  },
});
